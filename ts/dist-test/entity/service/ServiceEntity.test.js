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
(0, node_test_1.describe)('ServiceEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when ABDO_STORE_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('ABDO_STORE_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.AbdoStoreSDK.test();
        const ent = testsdk.Service();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.ABDO_STORE_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'service.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "category": { "a": true, "h": "Category", "n": "category", "r": false, "sh": "Service category", "t": "`$STRING`", "key$": "category", "index$": 0 }, "description": { "a": true, "h": "Description", "n": "description", "r": false, "sh": "Service description", "t": "`$STRING`", "key$": "description", "index$": 1 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "sh": "Service ID", "t": "`$INTEGER`", "key$": "id", "index$": 2 }, "max": { "a": true, "h": "Max", "n": "max", "r": false, "sh": "Maximum order quantity", "t": "`$INTEGER`", "key$": "max", "index$": 3 }, "min": { "a": true, "h": "Min", "n": "min", "r": false, "sh": "Minimum order quantity", "t": "`$INTEGER`", "key$": "min", "index$": 4 }, "name": { "a": true, "h": "Name", "n": "name", "r": false, "sh": "Service name", "t": "`$STRING`", "key$": "name", "index$": 5 }, "price": { "a": true, "fo": "float", "h": "Price", "n": "price", "r": false, "sh": "Service price", "t": "`$NUMBER`", "key$": "price", "index$": 6 } }, "id": { "field": "id", "name": "id" }, "name": "service", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /api/services", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "GET", "o": "/api/services", "q": {}, "r": {}, "s": [{ "lit": "api" }, { "lit": "services" }], "t": { "req": "`reqdata`", "res": "`body.services`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "service", "name__orig": "service", "Name": "Service", "name_": "service", "name-": "service", "NAME": "SERVICE", "index$": 2 }, { "active": true, "entity": "service", "key$": "BasicServiceFlow", "kind": "basic", "name": "BasicServiceFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "service_ref01" } }], "index$": 0 }] }, 'Service', { "GET /api/services": { "protocol": "http", "operationId": "getServices", "responses": { "200": { "description": "Successful response with list of services", "content": { "application/json": { "schema": { "type": "object", "properties": { "status": { "example": "success", "key$": "status", "type": "string" }, "services": { "items": { "properties": { "category": { "description": "Service category", "type": "string", "key$": "category" }, "description": { "description": "Service description", "type": "string", "key$": "description" }, "id": { "description": "Service ID", "type": "integer", "key$": "id" }, "max": { "description": "Maximum order quantity", "type": "integer", "key$": "max" }, "min": { "description": "Minimum order quantity", "type": "integer", "key$": "min" }, "name": { "description": "Service name", "type": "string", "key$": "name" }, "price": { "description": "Service price", "format": "float", "type": "number", "key$": "price" } }, "type": "object", "index$": 0 }, "key$": "services", "type": "array" } } } } } }, "401": { "description": "Unauthorized - Invalid or missing API key", "content": { "application/json": { "schema": { "type": "object", "properties": { "status": { "type": "string", "example": "error" }, "message": { "type": "string", "description": "Error message describing what went wrong" }, "code": { "type": "string", "description": "Error code for programmatic handling" } }, "x-ref": "#/components/schemas/Error" } } } }, "500": { "description": "Internal server error", "content": { "application/json": { "schema": { "type": "object", "properties": { "status": { "type": "string", "example": "error" }, "message": { "type": "string", "description": "Error message describing what went wrong" }, "code": { "type": "string", "description": "Error code for programmatic handling" } }, "x-ref": "#/components/schemas/Error" } } } } }, "parameters": [], "security": [{ "ApiKeyAuth": [] }], "securitySource": "operation", "securitySchemes": { "ApiKeyAuth": { "type": "apiKey", "in": "header", "name": "X-API-Key", "description": "API key for authentication. Contact support to obtain your API key." } } } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let service_ref01_data = Object.values(setup.data.existing.service)[0];
        // LIST
        const service_ref01_ent = client.Service();
        const service_ref01_match = {};
        const service_ref01_list = (await service_ref01_ent.list(service_ref01_match)).map((e) => e.data());
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/service/ServiceTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.AbdoStoreSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['service01', 'service02', 'service03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'ABDO_STORE_TEST_SERVICE_ENTID': idmap,
        'ABDO_STORE_TEST_LIVE': 'FALSE',
        'ABDO_STORE_TEST_EXPLAIN': 'FALSE',
        'ABDO_STORE_APIKEY': '',
    });
    idmap = env['ABDO_STORE_TEST_SERVICE_ENTID'];
    const live = 'TRUE' === env.ABDO_STORE_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['ABDO_STORE_TEST_SERVICE_ENTID'];
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
//# sourceMappingURL=ServiceEntity.test.js.map