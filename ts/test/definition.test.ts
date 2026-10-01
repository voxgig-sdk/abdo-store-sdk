import { describe, test } from 'node:test'
import { SDK } from '..'
import { runDefinitionPoint } from './definition-runner'
import { isControlSkipped } from './utility'


// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN: any[] = [
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
]


describe('definition', () => {
  for (const point of PLAN) {
    test(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
      const control = isControlSkipped('entityOp', point.entity + '.' + point.op, 'definition')
      if (control.skip) {
        t.skip(control.reason || 'skipped via sdk-test-control.json')
        return
      }
      await runDefinitionPoint(SDK, point)
    })
  }
})
