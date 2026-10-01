"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const __1 = require("..");
const definition_runner_1 = require("./definition-runner");
const utility_1 = require("./utility");
// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN = [
    {
        "entity": "account",
        "accessor": "Account",
        "op": "load",
        "method": "GET",
        "path": "/api/balance",
        "args": [],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-api-key"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "status": "success",
            "balance": 1,
            "currency": "USD"
        },
        "idField": "id"
    },
    {
        "entity": "order",
        "accessor": "Order",
        "op": "create",
        "method": "POST",
        "path": "/api/order",
        "args": [],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-api-key"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "status": "success",
            "order_id": 1,
            "charge": 1
        },
        "idField": "id"
    },
    {
        "entity": "order",
        "accessor": "Order",
        "op": "load",
        "method": "GET",
        "path": "/api/order/{order_id}",
        "args": [
            {
                "name": "id",
                "wire": "order_id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-api-key"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "status": "success",
            "order": {
                "order_id": 1,
                "service_id": 1,
                "link": "x",
                "quantity": 1,
                "start_count": 1,
                "remains": 1,
                "status": "Pending",
                "charge": 1
            }
        },
        "idField": "id"
    },
    {
        "entity": "service",
        "accessor": "Service",
        "op": "list",
        "method": "GET",
        "path": "/api/services",
        "args": [],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "x-api-key"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "status": "success",
            "services": [
                {
                    "category": "x",
                    "description": "x",
                    "id": 1,
                    "max": 1,
                    "min": 1,
                    "name": "x",
                    "price": 1
                }
            ]
        },
        "idField": "id"
    }
];
(0, node_test_1.describe)('definition', () => {
    for (const point of PLAN) {
        (0, node_test_1.test)(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
            const control = (0, utility_1.isControlSkipped)('entityOp', point.entity + '.' + point.op, 'definition');
            if (control.skip) {
                t.skip(control.reason || 'skipped via sdk-test-control.json');
                return;
            }
            await (0, definition_runner_1.runDefinitionPoint)(__1.SDK, point);
        });
    }
});
//# sourceMappingURL=definition.test.js.map