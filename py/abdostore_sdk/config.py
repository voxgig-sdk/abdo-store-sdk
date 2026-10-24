# AbdoStore SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


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
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
          "factor": 2,
          "maxDelay": 2000,
          "minDelay": 50,
          "retries": 2,
          "statuses": [
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "now": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
        },
        "options": {
            "base": "https://abdoastore.store",
            "auth": {
                "prefix": "",
                "name": "X-API-Key",
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
            "title": "Balance",
            "type": "`$NUMBER`",
            "short": "Current account balance",
            "format": "float",
          },
          {
            "name": "currency",
            "title": "Currency",
            "type": "`$STRING`",
            "short": "Currency code",
          },
          {
            "name": "status",
            "title": "Status",
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
                "kind": "http",
                "method": "GET",
                "orig": "/api/balance",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "balance",
                  },
                ],
                "parts": [
                  "api",
                  "balance",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
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
            "title": "Charge",
            "type": "`$NUMBER`",
            "short": "Order charge",
            "format": "float",
          },
          {
            "name": "comments",
            "title": "Comments",
            "type": "`$STRING`",
            "short": "Additional comments or instructions (optional)",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
          },
          {
            "name": "link",
            "title": "Link",
            "type": "`$STRING`",
            "op": {
              "create": {
                "req": True,
                "type": "`$STRING`",
              },
            },
            "short": "Target link",
          },
          {
            "name": "order_id",
            "title": "Order Id",
            "type": "`$INTEGER`",
            "short": "Order ID",
          },
          {
            "name": "quantity",
            "title": "Quantity",
            "type": "`$INTEGER`",
            "op": {
              "create": {
                "req": True,
                "type": "`$INTEGER`",
              },
            },
            "short": "Order quantity",
          },
          {
            "name": "remains",
            "title": "Remains",
            "type": "`$INTEGER`",
            "short": "Remaining quantity",
          },
          {
            "name": "service_id",
            "title": "Service Id",
            "type": "`$INTEGER`",
            "op": {
              "create": {
                "req": True,
                "type": "`$INTEGER`",
              },
            },
            "short": "Service ID",
          },
          {
            "name": "start_count",
            "title": "Start Count",
            "type": "`$INTEGER`",
            "short": "Start count",
          },
          {
            "name": "status",
            "title": "Status",
            "type": "`$STRING`",
            "short": "Order status",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "order",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "kind": "http",
                "method": "POST",
                "orig": "/api/order",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "order",
                  },
                ],
                "parts": [
                  "api",
                  "order",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/api/order/{order_id}",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "order",
                  },
                  {
                    "var": "id",
                  },
                ],
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
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.order`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "order_id",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "response": {
                  "kind": "json",
                  "media": "application/json",
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
            "title": "Category",
            "type": "`$STRING`",
            "short": "Service category",
          },
          {
            "name": "description",
            "title": "Description",
            "type": "`$STRING`",
            "short": "Service description",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$INTEGER`",
            "short": "Service ID",
          },
          {
            "name": "max",
            "title": "Max",
            "type": "`$INTEGER`",
            "short": "Maximum order quantity",
          },
          {
            "name": "min",
            "title": "Min",
            "type": "`$INTEGER`",
            "short": "Minimum order quantity",
          },
          {
            "name": "name",
            "title": "Name",
            "type": "`$STRING`",
            "short": "Service name",
          },
          {
            "name": "price",
            "title": "Price",
            "type": "`$NUMBER`",
            "short": "Service price",
            "format": "float",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "service",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/api/services",
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "services",
                  },
                ],
                "parts": [
                  "api",
                  "services",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.services`",
                },
                "args": {},
                "select": {},
                "response": {
                  "kind": "json",
                  "media": "application/json",
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
