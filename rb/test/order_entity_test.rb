# Order entity test

require "minitest/autorun"
require "json"
require_relative "../AbdoStore_sdk"
require_relative "runner"

class OrderEntityTest < Minitest::Test
  def test_create_instance
    testsdk = AbdoStoreSDK.test(nil, nil)
    ent = testsdk.Order(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = order_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create", "load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "order." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set ABDOSTORE_TEST_ORDER_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # CREATE
    order_ref01_ent = client.Order(nil)
    order_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.order"), "order_ref01"))

    order_ref01_data_result = order_ref01_ent.create(order_ref01_data, nil)
    order_ref01_data = Helpers.to_map(order_ref01_data_result)
    assert !order_ref01_data.nil?

    # LOAD
    order_ref01_match_dt0 = {}
    order_ref01_data_dt0_loaded = order_ref01_ent.load(order_ref01_match_dt0, nil)
    assert !order_ref01_data_dt0_loaded.nil?

  end
end

def order_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "order", "OrderTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = AbdoStoreSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["order01", "order02", "order03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Detect ENTID env override before envOverride consumes it. When live
  # mode is on without a real override, the basic test runs against synthetic
  # IDs from the fixture and 4xx's. Surface this so the test can skip.
  entid_env_raw = ENV["ABDOSTORE_TEST_ORDER_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "ABDOSTORE_TEST_ORDER_ENTID" => idmap,
    "ABDOSTORE_TEST_LIVE" => "FALSE",
    "ABDOSTORE_TEST_EXPLAIN" => "FALSE",
    "ABDOSTORE_APIKEY" => "NONE",
  })

  idmap_resolved = Helpers.to_map(
    env["ABDOSTORE_TEST_ORDER_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["ABDOSTORE_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
        "apikey" => env["ABDOSTORE_APIKEY"],
      },
      extra || {},
    ])
    client = AbdoStoreSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["ABDOSTORE_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["ABDOSTORE_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
