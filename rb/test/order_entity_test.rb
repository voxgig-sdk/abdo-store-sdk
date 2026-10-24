# Order entity test

require "minitest/autorun"
require "json"
require_relative "../AbdoStore_sdk"
require_relative "runner"

class OrderEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = AbdoStoreSDK.test(nil, nil)
    ent = testsdk.Order(nil)
    assert !ent.nil?
  end

  def test_validate
    cfg = AbdoStoreConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = AbdoStoreSDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.Order(nil).load({ "id" => "x" }, nil)
    end
    assert_equal "validate_failed", err.code
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
    client = setup[:client]

    # CREATE
    order_ref01_ent = client.Order(nil)
    order_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.order"), "order_ref01"))

    order_ref01_data_result = order_ref01_ent.create(order_ref01_data, nil)
    order_ref01_data = Helpers.to_map(order_ref01_data_result.respond_to?(:data_get) ? order_ref01_data_result.data_get : order_ref01_data_result)
    assert !order_ref01_data.nil?
    assert !order_ref01_data["id"].nil?

    # LOAD
    order_ref01_match_dt0 = {
      "id" => order_ref01_data["id"],
    }
    order_ref01_data_dt0_loaded = order_ref01_ent.load(order_ref01_match_dt0, nil)
    order_ref01_data_dt0_load_result = Helpers.to_map(order_ref01_data_dt0_loaded.respond_to?(:data_get) ? order_ref01_data_dt0_loaded.data_get : order_ref01_data_dt0_loaded)
    assert !order_ref01_data_dt0_load_result.nil?
    assert_equal order_ref01_data_dt0_load_result["id"], order_ref01_data["id"]

  end
end

def order_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "order", "OrderTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
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

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["ABDO_STORE_TEST_ORDER_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "ABDO_STORE_TEST_ORDER_ENTID" => idmap,
    "ABDO_STORE_TEST_LIVE" => "FALSE",
    "ABDO_STORE_TEST_EXPLAIN" => "FALSE",
    "ABDO_STORE_APIKEY" => "",
  })

  idmap_resolved = Helpers.to_map(
    env["ABDO_STORE_TEST_ORDER_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["ABDO_STORE_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      # FIRST, so the generated fields below win: sdk-test-control.json's
      # test.client.options adds to the live client, it does not redirect it.
      Runner.live_client_options,
      {
        "apikey" => env["ABDO_STORE_APIKEY"],
      },
      extra || {},
    ])
    client = AbdoStoreSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["ABDO_STORE_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["ABDO_STORE_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
