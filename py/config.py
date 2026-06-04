# AbdoStore SDK configuration


def make_config():
    return {
        "main": {
            "name": "AbdoStore",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
      },
        },
        "options": {
            "base": "https://abdoastore.store",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "account": {},
                "order": {},
                "service": {},
            },
        },
        "entity": {
      "account": {
        "fields": [
          {
            "name": "balance",
            "req": False,
            "type": "`$NUMBER`",
            "active": True,
            "index$": 0,
          },
          {
            "name": "currency",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 1,
          },
          {
            "name": "status",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 2,
          },
        ],
        "name": "account",
        "op": {
          "load": {
            "name": "load",
            "points": [
              {
                "method": "GET",
                "orig": "/api/balance",
                "parts": [
                  "api",
                  "balance",
                ],
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "args": {},
                "select": {},
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "order": {
        "fields": [
          {
            "name": "charge",
            "req": False,
            "type": "`$NUMBER`",
            "active": True,
            "index$": 0,
          },
          {
            "name": "comment",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 1,
          },
          {
            "name": "link",
            "req": True,
            "type": "`$STRING`",
            "active": True,
            "index$": 2,
          },
          {
            "name": "order",
            "req": False,
            "type": "`$OBJECT`",
            "active": True,
            "index$": 3,
          },
          {
            "name": "order_id",
            "req": False,
            "type": "`$INTEGER`",
            "active": True,
            "index$": 4,
          },
          {
            "name": "quantity",
            "req": True,
            "type": "`$INTEGER`",
            "active": True,
            "index$": 5,
          },
          {
            "name": "service_id",
            "req": True,
            "type": "`$INTEGER`",
            "active": True,
            "index$": 6,
          },
          {
            "name": "status",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 7,
          },
        ],
        "name": "order",
        "op": {
          "create": {
            "name": "create",
            "points": [
              {
                "method": "POST",
                "orig": "/api/order",
                "parts": [
                  "api",
                  "order",
                ],
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "args": {},
                "select": {},
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "create",
          },
          "load": {
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "order_id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                      "active": True,
                    },
                  ],
                },
                "method": "GET",
                "orig": "/api/order/{order_id}",
                "parts": [
                  "api",
                  "order",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "order_id": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "service": {
        "fields": [
          {
            "name": "category",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 0,
          },
          {
            "name": "description",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 1,
          },
          {
            "name": "id",
            "req": False,
            "type": "`$INTEGER`",
            "active": True,
            "index$": 2,
          },
          {
            "name": "max",
            "req": False,
            "type": "`$INTEGER`",
            "active": True,
            "index$": 3,
          },
          {
            "name": "min",
            "req": False,
            "type": "`$INTEGER`",
            "active": True,
            "index$": 4,
          },
          {
            "name": "name",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 5,
          },
          {
            "name": "price",
            "req": False,
            "type": "`$NUMBER`",
            "active": True,
            "index$": 6,
          },
        ],
        "name": "service",
        "op": {
          "list": {
            "name": "list",
            "points": [
              {
                "method": "GET",
                "orig": "/api/services",
                "parts": [
                  "api",
                  "services",
                ],
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "args": {},
                "select": {},
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "list",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
