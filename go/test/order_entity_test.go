package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/abdo-store-sdk/go"
	"github.com/voxgig-sdk/abdo-store-sdk/go/core"

	vs "github.com/voxgig-sdk/abdo-store-sdk/go/utility/struct"
)

// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const orderEntityLiveStrict = true


func TestOrderEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Order(nil)
		if ent == nil {
			t.Fatal("expected non-nil OrderEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.Order(nil).Load(map[string]any{"id": "x"}, nil)
		if sdkerr, ok := err.(*core.AbdoStoreError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := orderBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "order." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		client := setup.client
		_ = client

		// CREATE
		orderRef01Ent := client.Order(nil)
		orderRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "order"}), "order_ref01"))

		orderRef01DataResult, err := orderRef01Ent.Create(orderRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		orderRef01Data = core.ToMapAny(entityData(orderRef01DataResult))
		if orderRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if orderRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		// LOAD
		orderRef01MatchDt0 := map[string]any{
			"id": orderRef01Data["id"],
		}
		orderRef01DataDt0Loaded, err := orderRef01Ent.Load(orderRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		orderRef01DataDt0LoadResult := core.ToMapAny(entityData(orderRef01DataDt0Loaded))
		if orderRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if orderRef01DataDt0LoadResult["id"] != orderRef01Data["id"] {
			t.Fatal("expected load result id to match")
		}

	})
}

func orderBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "order", "OrderTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read order test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse order test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"order01", "order02", "order03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("ABDO_STORE_TEST_ORDER_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"ABDO_STORE_TEST_ORDER_ENTID": idmap,
		"ABDO_STORE_TEST_LIVE":      "FALSE",
		"ABDO_STORE_TEST_EXPLAIN":   "FALSE",
		"ABDO_STORE_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["ABDO_STORE_TEST_ORDER_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["ABDO_STORE_TEST_LIVE"] == "TRUE" {
		// An empty map, not a nil one: Merge returns nil when its last entry
		// is nil, and BasicSetup is normally called with no extras - so a
		// bare nil silently discarded the apikey and server values below.
		extraOpts := extra
		if extraOpts == nil {
			extraOpts = map[string]any{}
		}

		mergedOpts := vs.Merge([]any{
			// liveClientOptions() FIRST, so the generated fields below win:
			// sdk-test-control.json's test.client.options adds to the live
			// client, it does not redirect it.
			liveClientOptions(),
			map[string]any{
				"apikey": env["ABDO_STORE_APIKEY"],
			},
			extraOpts,
		})
		client = sdk.NewAbdoStoreSDK(core.ToMapAny(mergedOpts))
	}

	live := env["ABDO_STORE_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["ABDO_STORE_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
