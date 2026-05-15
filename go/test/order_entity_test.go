package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/abdo-store-sdk"
	"github.com/voxgig-sdk/abdo-store-sdk/core"

	vs "github.com/voxgig/struct"
)

func TestOrderEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Order(nil)
		if ent == nil {
			t.Fatal("expected non-nil OrderEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
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
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set ABDOSTORE_TEST_ORDER_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		orderRef01Ent := client.Order(nil)
		orderRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath([]any{"new", "order"}, setup.data), "order_ref01"))

		orderRef01DataResult, err := orderRef01Ent.Create(orderRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		orderRef01Data = core.ToMapAny(orderRef01DataResult)
		if orderRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}

		// LOAD
		orderRef01MatchDt0 := map[string]any{}
		orderRef01DataDt0Loaded, err := orderRef01Ent.Load(orderRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		if orderRef01DataDt0Loaded == nil {
			t.Fatal("expected load result to be non-nil")
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
	idmap := vs.Transform(
		[]any{"order01", "order02", "order03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("ABDOSTORE_TEST_ORDER_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"ABDOSTORE_TEST_ORDER_ENTID": idmap,
		"ABDOSTORE_TEST_LIVE":      "FALSE",
		"ABDOSTORE_TEST_EXPLAIN":   "FALSE",
		"ABDOSTORE_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["ABDOSTORE_TEST_ORDER_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["ABDOSTORE_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["ABDOSTORE_APIKEY"],
			},
			extra,
		})
		client = sdk.NewAbdoStoreSDK(core.ToMapAny(mergedOpts))
	}

	live := env["ABDOSTORE_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["ABDOSTORE_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
