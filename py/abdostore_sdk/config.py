# AbdoStore SDK configuration


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "AbdoStore",
            "slug": "abdo-store",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
        "transport": "base",
      },
        },
        "options": {
            "base": "https://abdoastore.store",
            "auth": {
                "prefix": "",
            },
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
            "short": "Current account balance",
            "type": "`$NUMBER`",
          },
          {
            "name": "currency",
            "short": "Currency code",
            "type": "`$STRING`",
          },
          {
            "name": "status",
            "type": "`$STRING`",
          },
        ],
        "name": "account",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/api/balance",
                "parts": [
                  "api",
                  "balance",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
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
            "short": "Order charge",
            "type": "`$NUMBER`",
          },
          {
            "name": "comments",
            "short": "Additional comments or instructions (optional)",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "type": "`$STRING`",
          },
          {
            "name": "link",
            "op": {
              "create": {
                "req": True,
                "type": "`$STRING`",
              },
            },
            "short": "Target link",
            "type": "`$STRING`",
          },
          {
            "name": "order_id",
            "short": "Order ID",
            "type": "`$INTEGER`",
          },
          {
            "name": "quantity",
            "op": {
              "create": {
                "req": True,
                "type": "`$INTEGER`",
              },
            },
            "short": "Order quantity",
            "type": "`$INTEGER`",
          },
          {
            "name": "remains",
            "short": "Remaining quantity",
            "type": "`$INTEGER`",
          },
          {
            "name": "service_id",
            "op": {
              "create": {
                "req": True,
                "type": "`$INTEGER`",
              },
            },
            "short": "Service ID",
            "type": "`$INTEGER`",
          },
          {
            "name": "start_count",
            "short": "Start count",
            "type": "`$INTEGER`",
          },
          {
            "name": "status",
            "short": "Order status",
            "type": "`$STRING`",
          },
        ],
        "name": "order",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "POST",
                "orig": "/api/order",
                "parts": [
                  "api",
                  "order",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
          "load": {
            "input": "data",
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
                    },
                  ],
                },
                "kind": "http",
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
                  "res": "`body.order`",
                },
              },
            ],
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
            "short": "Service category",
            "type": "`$STRING`",
          },
          {
            "name": "description",
            "short": "Service description",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "short": "Service ID",
            "type": "`$INTEGER`",
          },
          {
            "name": "max",
            "short": "Maximum order quantity",
            "type": "`$INTEGER`",
          },
          {
            "name": "min",
            "short": "Minimum order quantity",
            "type": "`$INTEGER`",
          },
          {
            "name": "name",
            "short": "Service name",
            "type": "`$STRING`",
          },
          {
            "name": "price",
            "short": "Service price",
            "type": "`$NUMBER`",
          },
        ],
        "name": "service",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/api/services",
                "parts": [
                  "api",
                  "services",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.services`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
