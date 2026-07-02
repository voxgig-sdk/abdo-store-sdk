<?php
declare(strict_types=1);

// Order entity test

require_once __DIR__ . '/../abdostore_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class OrderEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = AbdoStoreSDK::test(null, null);
        $ent = $testsdk->Order(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = order_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["create", "load"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "order." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set ABDOSTORE_TEST_ORDER_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // CREATE
        $order_ref01_ent = $client->Order(null);
        $order_ref01_data = Helpers::to_map(Vs::getprop(
            Vs::getpath($setup["data"], "new.order"), "order_ref01"));

        [$order_ref01_data_result, $err] = $order_ref01_ent->create($order_ref01_data, null);
        $this->assertNull($err);
        $order_ref01_data = Helpers::to_map($order_ref01_data_result);
        $this->assertNotNull($order_ref01_data);

        // LOAD
        $order_ref01_match_dt0 = [];
        [$order_ref01_data_dt0_loaded, $err] = $order_ref01_ent->load($order_ref01_match_dt0, null);
        $this->assertNull($err);
        $this->assertNotNull($order_ref01_data_dt0_loaded);

    }
}

function order_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/order/OrderTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = AbdoStoreSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["order01", "order02", "order03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("ABDOSTORE_TEST_ORDER_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "ABDOSTORE_TEST_ORDER_ENTID" => $idmap,
        "ABDOSTORE_TEST_LIVE" => "FALSE",
        "ABDOSTORE_TEST_EXPLAIN" => "FALSE",
        "ABDOSTORE_APIKEY" => "NONE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["ABDOSTORE_TEST_ORDER_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["ABDOSTORE_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
                "apikey" => $env["ABDOSTORE_APIKEY"],
            ],
            $extra ?? [],
        ]);
        $client = new AbdoStoreSDK(Helpers::to_map($merged_opts));
    }

    $live = $env["ABDOSTORE_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["ABDOSTORE_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
