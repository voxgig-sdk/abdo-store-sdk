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
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
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
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.ABDO_STORE_TEST_LIVE;
        for (const op of ['create', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'order.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "format": "float", "name": "charge", "req": false, "short": "Order charge", "type": "`$NUMBER`", "index$": 0 }, { "active": true, "name": "comments", "req": false, "short": "Additional comments or instructions (optional)", "type": "`$STRING`", "index$": 1 }, { "active": true, "name": "id", "req": false, "type": "`$STRING`", "index$": 2 }, { "active": true, "name": "link", "op": { "create": { "req": true, "type": "`$STRING`" } }, "req": false, "short": "Target link", "type": "`$STRING`", "index$": 3 }, { "active": true, "name": "order_id", "req": false, "short": "Order ID", "type": "`$INTEGER`", "index$": 4 }, { "active": true, "name": "quantity", "op": { "create": { "req": true, "type": "`$INTEGER`" } }, "req": false, "short": "Order quantity", "type": "`$INTEGER`", "index$": 5 }, { "active": true, "name": "remains", "req": false, "short": "Remaining quantity", "type": "`$INTEGER`", "index$": 6 }, { "active": true, "name": "service_id", "op": { "create": { "req": true, "type": "`$INTEGER`" } }, "req": false, "short": "Service ID", "type": "`$INTEGER`", "index$": 7 }, { "active": true, "name": "start_count", "req": false, "short": "Start count", "type": "`$INTEGER`", "index$": 8 }, { "active": true, "name": "status", "req": false, "short": "Order status", "type": "`$STRING`", "index$": 9 }], "id": { "field": "id", "name": "id" }, "name": "order", "op": { "create": { "input": "data", "name": "create", "points": [{ "active": true, "args": {}, "contract": { "id": "POST /api/order", "json": "{\"operationId\":\"createOrder\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"comments\":{\"description\":\"Additional comments or instructions (optional)\",\"type\":\"string\"},\"link\":{\"description\":\"Link to the social media post or profile\",\"type\":\"string\"},\"quantity\":{\"description\":\"Quantity of the service to order\",\"type\":\"integer\"},\"service_id\":{\"description\":\"ID of the service to order\",\"type\":\"integer\"}},\"required\":[\"service_id\",\"link\",\"quantity\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"charge\":{\"description\":\"Amount charged for the order\",\"format\":\"float\",\"type\":\"number\"},\"order_id\":{\"description\":\"Unique order identifier\",\"type\":\"integer\"},\"status\":{\"example\":\"success\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Order successfully placed\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code for programmatic handling\",\"type\":\"string\"},\"message\":{\"description\":\"Error message describing what went wrong\",\"type\":\"string\"},\"status\":{\"example\":\"error\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Bad request - Invalid parameters\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code for programmatic handling\",\"type\":\"string\"},\"message\":{\"description\":\"Error message describing what went wrong\",\"type\":\"string\"},\"status\":{\"example\":\"error\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Unauthorized - Invalid or missing API key\"},\"402\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code for programmatic handling\",\"type\":\"string\"},\"message\":{\"description\":\"Error message describing what went wrong\",\"type\":\"string\"},\"status\":{\"example\":\"error\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Insufficient balance\"}},\"security\":[{\"ApiKeyAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"description\":\"API key for authentication. Contact support to obtain your API key.\",\"in\":\"header\",\"name\":\"X-API-Key\",\"type\":\"apiKey\"}},\"securitySource\":\"operation\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "POST", "orig": "/api/order", "segments": [{ "lit": "api" }, { "lit": "order" }], "select": {}, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" }, "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "params": [{ "active": true, "kind": "param", "name": "id", "orig": "order_id", "reqd": true, "type": "`$INTEGER`", "index$": 0 }] }, "contract": { "id": "GET /api/order/{order_id}", "json": "{\"operationId\":\"getOrderStatus\",\"parameters\":[{\"description\":\"The order ID to retrieve\",\"in\":\"path\",\"name\":\"order_id\",\"required\":true,\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"order\":{\"properties\":{\"charge\":{\"description\":\"Order charge\",\"format\":\"float\",\"type\":\"number\"},\"link\":{\"description\":\"Target link\",\"type\":\"string\"},\"order_id\":{\"description\":\"Order ID\",\"type\":\"integer\"},\"quantity\":{\"description\":\"Order quantity\",\"type\":\"integer\"},\"remains\":{\"description\":\"Remaining quantity\",\"type\":\"integer\"},\"service_id\":{\"description\":\"Service ID\",\"type\":\"integer\"},\"start_count\":{\"description\":\"Start count\",\"type\":\"integer\"},\"status\":{\"description\":\"Order status\",\"enum\":[\"Pending\",\"In progress\",\"Completed\",\"Canceled\",\"Partial\"],\"type\":\"string\"}},\"type\":\"object\"},\"status\":{\"example\":\"success\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful response with order details\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code for programmatic handling\",\"type\":\"string\"},\"message\":{\"description\":\"Error message describing what went wrong\",\"type\":\"string\"},\"status\":{\"example\":\"error\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Unauthorized - Invalid or missing API key\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code for programmatic handling\",\"type\":\"string\"},\"message\":{\"description\":\"Error message describing what went wrong\",\"type\":\"string\"},\"status\":{\"example\":\"error\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Order not found\"}},\"security\":[{\"ApiKeyAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"description\":\"API key for authentication. Contact support to obtain your API key.\",\"in\":\"header\",\"name\":\"X-API-Key\",\"type\":\"apiKey\"}},\"securitySource\":\"operation\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/api/order/{order_id}", "rename": { "param": { "order_id": "id" } }, "segments": [{ "lit": "api" }, { "lit": "order" }, { "var": "id" }], "select": { "exist": ["id"] }, "transform": { "req": "`reqdata`", "res": "`body.order`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "order", "name__orig": "order", "Name": "Order", "name_": "order", "name-": "order", "NAME": "ORDER", "index$": 1 }, { "active": true, "entity": "order", "key$": "BasicOrderFlow", "kind": "basic", "name": "BasicOrderFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "order_ref01" }, "match": {}, "op": "create", "spec": [], "valid": [], "index$": 0 }, { "active": true, "data": {}, "input": { "ref": "order_ref01", "srcdatavar": "order_ref01_data", "suffix": "_dt0" }, "match": { "id": "order01" }, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-order_ref01" } }], "index$": 1 }] }, 'Order');
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