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
(0, node_test_1.describe)('AccountEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when ABDO_STORE_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('ABDO_STORE_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.AbdoStoreSDK.test();
        const ent = testsdk.Account();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.ABDO_STORE_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'account.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "balance": { "a": true, "fo": "float", "h": "Balance", "n": "balance", "r": false, "sh": "Current account balance", "t": "`$NUMBER`", "key$": "balance", "index$": 0 }, "currency": { "a": true, "h": "Currency", "n": "currency", "r": false, "sh": "Currency code", "t": "`$STRING`", "key$": "currency", "index$": 1 }, "status": { "a": true, "h": "Status", "n": "status", "r": false, "t": "`$STRING`", "key$": "status", "index$": 2 } }, "name": "account", "op": { "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /api/balance", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "GET", "o": "/api/balance", "q": {}, "r": {}, "s": [{ "lit": "api" }, { "lit": "balance" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "account", "name__orig": "account", "Name": "Account", "name_": "account", "name-": "account", "NAME": "ACCOUNT", "index$": 0 }, { "active": true, "entity": "account", "key$": "BasicAccountFlow", "kind": "basic", "name": "BasicAccountFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "account_ref01", "srcdatavar": "account_ref01_data", "suffix": "_dt0" }, "m": {}, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-account_ref01" } }], "index$": 0 }] }, 'Account', { "GET /api/balance": { "protocol": "http", "operationId": "getBalance", "responses": { "200": { "description": "Successful response with balance information", "content": { "application/json": { "schema": { "type": "object", "properties": { "status": { "example": "success", "key$": "status", "type": "string" }, "balance": { "description": "Current account balance", "format": "float", "key$": "balance", "type": "number" }, "currency": { "description": "Currency code", "example": "USD", "key$": "currency", "type": "string" } }, "index$": 0 } } } }, "401": { "description": "Unauthorized - Invalid or missing API key", "content": { "application/json": { "schema": { "type": "object", "properties": { "status": { "type": "string", "example": "error" }, "message": { "type": "string", "description": "Error message describing what went wrong" }, "code": { "type": "string", "description": "Error code for programmatic handling" } }, "x-ref": "#/components/schemas/Error" } } } } }, "parameters": [], "security": [{ "ApiKeyAuth": [] }], "securitySource": "operation", "securitySchemes": { "ApiKeyAuth": { "type": "apiKey", "in": "header", "name": "X-API-Key", "description": "API key for authentication. Contact support to obtain your API key." } } } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let account_ref01_data = Object.values(setup.data.existing.account)[0];
        // LOAD
        const account_ref01_ent = client.Account();
        const account_ref01_match_dt0 = {};
        const account_ref01_data_dt0 = (await account_ref01_ent.load(account_ref01_match_dt0)).data();
        (0, node_assert_1.default)(null != account_ref01_data_dt0);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/account/AccountTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.AbdoStoreSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['account01', 'account02', 'account03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'ABDO_STORE_TEST_ACCOUNT_ENTID': idmap,
        'ABDO_STORE_TEST_LIVE': 'FALSE',
        'ABDO_STORE_TEST_EXPLAIN': 'FALSE',
        'ABDO_STORE_APIKEY': '',
    });
    idmap = env['ABDO_STORE_TEST_ACCOUNT_ENTID'];
    const live = 'TRUE' === env.ABDO_STORE_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['ABDO_STORE_TEST_ACCOUNT_ENTID'];
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
//# sourceMappingURL=AccountEntity.test.js.map