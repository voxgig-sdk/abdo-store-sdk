"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('OrderEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when ABDO_STORE_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('ABDO_STORE_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.AbdoStoreSDK.test();
        const ent = testsdk.Order();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.AbdoStoreSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Order().load({ "id": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.ABDO_STORE_TEST_LIVE;
        for (const op of ['create', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'order.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "charge": { "a": true, "fo": "float", "h": "Charge", "n": "charge", "r": false, "sh": "Order charge", "t": "`$NUMBER`", "key$": "charge", "index$": 0 }, "comments": { "a": true, "h": "Comments", "n": "comments", "r": false, "sh": "Additional comments or instructions (optional)", "t": "`$STRING`", "key$": "comments", "index$": 1 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "t": "`$STRING`", "key$": "id", "index$": 2 }, "link": { "a": true, "h": "Link", "n": "link", "op": { "create": { "req": true, "type": "`$STRING`" } }, "r": false, "sh": "Target link", "t": "`$STRING`", "key$": "link", "index$": 3 }, "order_id": { "a": true, "h": "Order Id", "n": "order_id", "r": false, "sh": "Order ID", "t": "`$INTEGER`", "key$": "order_id", "index$": 4 }, "quantity": { "a": true, "h": "Quantity", "n": "quantity", "op": { "create": { "req": true, "type": "`$INTEGER`" } }, "r": false, "sh": "Order quantity", "t": "`$INTEGER`", "key$": "quantity", "index$": 5 }, "remains": { "a": true, "h": "Remains", "n": "remains", "r": false, "sh": "Remaining quantity", "t": "`$INTEGER`", "key$": "remains", "index$": 6 }, "service_id": { "a": true, "h": "Service Id", "n": "service_id", "op": { "create": { "req": true, "type": "`$INTEGER`" } }, "r": false, "sh": "Service ID", "t": "`$INTEGER`", "key$": "service_id", "index$": 7 }, "start_count": { "a": true, "h": "Start Count", "n": "start_count", "r": false, "sh": "Start count", "t": "`$INTEGER`", "key$": "start_count", "index$": 8 }, "status": { "a": true, "h": "Status", "n": "status", "r": false, "sh": "Order status", "t": "`$STRING`", "key$": "status", "index$": 9 } }, "id": { "field": "id", "name": "id" }, "name": "order", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": ["comments", "link", "quantity", "service_id"], "co": { "id": "POST /api/order", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/api/order", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "order" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /api/order/{order_id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "order_id", "r": true, "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/api/order/{order_id}", "q": { "exist": ["id"] }, "r": { "param": { "order_id": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "api" }, { "lit": "order" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body.order`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "order", "name__orig": "order", "Name": "Order", "name_": "order", "name-": "order", "NAME": "ORDER", "index$": 1 }, { "active": true, "entity": "order", "key$": "BasicOrderFlow", "kind": "basic", "name": "BasicOrderFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "order_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": { "ref": "order_ref01", "srcdatavar": "order_ref01_data", "suffix": "_dt0" }, "m": { "id": "order01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-order_ref01" } }], "index$": 1 }] }, 'Order', { "POST /api/order": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "required": ["service_id", "link", "quantity"], "properties": { "service_id": { "type": "integer", "description": "ID of the service to order", "key$": "service_id" }, "link": { "type": "string", "description": "Link to the social media post or profile", "key$": "link" }, "quantity": { "type": "integer", "description": "Quantity of the service to order", "key$": "quantity" }, "comments": { "type": "string", "description": "Additional comments or instructions (optional)", "key$": "comments" } }, "index$": 1 } } } }, "parameters": [] }, "GET /api/order/{order_id}": { "protocol": "http", "parameters": [{ "name": "order_id", "in": "path", "required": true, "description": "The order ID to retrieve", "schema": { "type": "integer" }, "index$": 0 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const order_ref01_ent = client.Order();
        let order_ref01_data = setup.data.new.order['order_ref01'];
        order_ref01_data = (await order_ref01_ent.create(order_ref01_data)).data();
        (0, node_assert_1.default)(null != order_ref01_data.id);
        // LOAD
        const order_ref01_match_dt0 = {};
        order_ref01_match_dt0.id = order_ref01_data.id;
        const order_ref01_data_dt0 = (await order_ref01_ent.load(order_ref01_match_dt0)).data();
        (0, node_assert_1.default)(order_ref01_data_dt0.id === order_ref01_data.id);
    });
});
// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true;
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/order/OrderTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.AbdoStoreSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['order01', 'order02', 'order03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'ABDO_STORE_TEST_ORDER_ENTID': idmap,
        'ABDO_STORE_TEST_LIVE': 'FALSE',
        'ABDO_STORE_TEST_EXPLAIN': 'FALSE',
        'ABDO_STORE_APIKEY': '',
    });
    idmap = env['ABDO_STORE_TEST_ORDER_ENTID'];
    const live = 'TRUE' === env.ABDO_STORE_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['ABDO_STORE_TEST_ORDER_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.AbdoStoreSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {
                apikey: env.ABDO_STORE_APIKEY,
            },
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.ABDO_STORE_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=OrderEntity.test.js.map