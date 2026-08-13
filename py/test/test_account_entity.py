# Account entity test

import json
import os
import time

import pytest

from abdostore_sdk.utility.voxgig_struct import voxgig_struct as vs
from abdostore_sdk import AbdoStoreSDK
from abdostore_sdk.core import helpers

_TEST_DIR = os.path.dirname(os.path.abspath(__file__))
from test import runner


class TestAccountEntity:

    def test_should_create_instance(self):
        testsdk = AbdoStoreSDK.test(None, None)
        ent = testsdk.Account(None)
        assert ent is not None

    def test_should_run_basic_flow(self):
        setup = _account_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["load"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "account." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        # The basic flow consumes synthetic IDs from the fixture. In live mode
        # without an *_ENTID env override, those IDs hit the live API and 4xx.
        if setup.get("synthetic_only"):
            pytest.skip("live entity test uses synthetic IDs from fixture — "
                        "set ABDO_STORE_TEST_ACCOUNT_ENTID JSON to run live")
        client = setup["client"]

        # Bootstrap entity data from existing test data.
        account_ref01_data_raw = vs.items(helpers.to_map(
            vs.getpath(setup["data"], "existing.account")))
        account_ref01_data = None
        if len(account_ref01_data_raw) > 0:
            account_ref01_data = helpers.to_map(account_ref01_data_raw[0][1])

        # LOAD
        account_ref01_ent = client.Account(None)
        account_ref01_match_dt0 = {}
        account_ref01_data_dt0_loaded = account_ref01_ent.load(account_ref01_match_dt0, None)
        assert account_ref01_data_dt0_loaded is not None



def _account_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/account/AccountTestData.json")
    with open(entity_data_file, "r") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = AbdoStoreSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["account01", "account02", "account03"],
        {
            "`$PACK`": ["", {
                "`$KEY`": "`$COPY`",
                "`$VAL`": ["`$FORMAT`", "upper", "`$COPY`"],
            }],
        }
    )

    # Detect ENTID env override before envOverride consumes it. When live
    # mode is on without a real override, the basic test runs against synthetic
    # IDs from the fixture and 4xx's. We surface this so the test can skip.
    _entid_env_raw = os.environ.get(
        "ABDO_STORE_TEST_ACCOUNT_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "ABDO_STORE_TEST_ACCOUNT_ENTID": idmap,
        "ABDO_STORE_TEST_LIVE": "FALSE",
        "ABDO_STORE_TEST_EXPLAIN": "FALSE",
        "ABDO_STORE_APIKEY": "NONE",
    })

    idmap_resolved = helpers.to_map(
        env.get("ABDO_STORE_TEST_ACCOUNT_ENTID"))
    if idmap_resolved is None:
        idmap_resolved = helpers.to_map(idmap)

    if env.get("ABDO_STORE_TEST_LIVE") == "TRUE":
        merged_opts = vs.merge([
            {
                "apikey": env.get("ABDO_STORE_APIKEY"),
            },
            extra or {},
        ])
        client = AbdoStoreSDK(helpers.to_map(merged_opts))

    _live = env.get("ABDO_STORE_TEST_LIVE") == "TRUE"
    return {
        "client": client,
        "data": entity_data,
        "idmap": idmap_resolved,
        "env": env,
        "explain": env.get("ABDO_STORE_TEST_EXPLAIN") == "TRUE",
        "live": _live,
        "synthetic_only": _live and not _idmap_overridden,
        "now": int(time.time() * 1000),
    }
