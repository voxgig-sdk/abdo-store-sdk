# AbdoStore SDK configuration

module AbdoStoreConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "AbdoStore",
        "slug" => "abdo-store",
        "version" => "0.0.1",
        "target" => "rb",
      },
      "feature" => {
        "ratelimit" => {
          "options" => {
            "active" => false,
            "burst" => 5,
            "rate" => 5,
          },
          "optspec" => {
            "now" => "`$FUNCTION`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "retry" => {
          "options" => {
            "active" => false,
            "factor" => 2,
            "maxDelay" => 2000,
            "minDelay" => 50,
            "retries" => 2,
            "statuses" => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          },
          "optspec" => {
            "jitter" => "`$BOOLEAN`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "test" => {
          "options" => {
            "active" => false,
          },
          "optspec" => {
            "entity" => "`$MAP`",
            "net" => "`$MAP`",
          },
          "strict" => false,
          "transport" => "base",
        },
        "timeout" => {
          "options" => {
            "active" => false,
            "ms" => 30000,
          },
          "optspec" => {
            "clearTimer" => "`$FUNCTION`",
            "now" => "`$FUNCTION`",
            "setTimer" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
      },
      "options" => {
        "base" => "https://abdoastore.store",
        "auth" => {
          "prefix" => "",
          "name" => "X-API-Key",
        },
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "account" => {},
          "order" => {},
          "service" => {},
        },
      },
      "entity" => {
        "account" => {
          "fields" => [
            {
              "name" => "balance",
              "title" => "Balance",
              "type" => "`$NUMBER`",
              "short" => "Current account balance",
              "format" => "float",
            },
            {
              "name" => "currency",
              "title" => "Currency",
              "type" => "`$STRING`",
              "short" => "Currency code",
            },
            {
              "name" => "status",
              "title" => "Status",
              "type" => "`$STRING`",
            },
          ],
          "name" => "account",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/balance",
                  "segments" => [
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "balance",
                    },
                  ],
                  "parts" => [
                    "api",
                    "balance",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {},
                  "select" => {},
                  "response" => {
                    "kind" => "json",
                    "media" => "application/json",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "order" => {
          "fields" => [
            {
              "name" => "charge",
              "title" => "Charge",
              "type" => "`$NUMBER`",
              "short" => "Order charge",
              "format" => "float",
            },
            {
              "name" => "comments",
              "title" => "Comments",
              "type" => "`$STRING`",
              "short" => "Additional comments or instructions (optional)",
            },
            {
              "name" => "id",
              "title" => "Id",
              "type" => "`$STRING`",
            },
            {
              "name" => "link",
              "title" => "Link",
              "type" => "`$STRING`",
              "op" => {
                "create" => {
                  "req" => true,
                  "type" => "`$STRING`",
                },
              },
              "short" => "Target link",
            },
            {
              "name" => "order_id",
              "title" => "Order Id",
              "type" => "`$INTEGER`",
              "short" => "Order ID",
            },
            {
              "name" => "quantity",
              "title" => "Quantity",
              "type" => "`$INTEGER`",
              "op" => {
                "create" => {
                  "req" => true,
                  "type" => "`$INTEGER`",
                },
              },
              "short" => "Order quantity",
            },
            {
              "name" => "remains",
              "title" => "Remains",
              "type" => "`$INTEGER`",
              "short" => "Remaining quantity",
            },
            {
              "name" => "service_id",
              "title" => "Service Id",
              "type" => "`$INTEGER`",
              "op" => {
                "create" => {
                  "req" => true,
                  "type" => "`$INTEGER`",
                },
              },
              "short" => "Service ID",
            },
            {
              "name" => "start_count",
              "title" => "Start Count",
              "type" => "`$INTEGER`",
              "short" => "Start count",
            },
            {
              "name" => "status",
              "title" => "Status",
              "type" => "`$STRING`",
              "short" => "Order status",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "order",
          "op" => {
            "create" => {
              "input" => "data",
              "name" => "create",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/api/order",
                  "segments" => [
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "order",
                    },
                  ],
                  "parts" => [
                    "api",
                    "order",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {},
                  "select" => {},
                  "response" => {
                    "kind" => "json",
                    "media" => "application/json",
                  },
                },
              ],
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/order/{order_id}",
                  "segments" => [
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "order",
                    },
                    {
                      "var" => "id",
                    },
                  ],
                  "parts" => [
                    "api",
                    "order",
                    "{id}",
                  ],
                  "rename" => {
                    "param" => {
                      "order_id" => "id",
                    },
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.order`",
                  },
                  "args" => {
                    "params" => [
                      {
                        "name" => "id",
                        "orig" => "order_id",
                        "type" => "`$INTEGER`",
                        "kind" => "param",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "response" => {
                    "kind" => "json",
                    "media" => "application/json",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "service" => {
          "fields" => [
            {
              "name" => "category",
              "title" => "Category",
              "type" => "`$STRING`",
              "short" => "Service category",
            },
            {
              "name" => "description",
              "title" => "Description",
              "type" => "`$STRING`",
              "short" => "Service description",
            },
            {
              "name" => "id",
              "title" => "Id",
              "type" => "`$INTEGER`",
              "short" => "Service ID",
            },
            {
              "name" => "max",
              "title" => "Max",
              "type" => "`$INTEGER`",
              "short" => "Maximum order quantity",
            },
            {
              "name" => "min",
              "title" => "Min",
              "type" => "`$INTEGER`",
              "short" => "Minimum order quantity",
            },
            {
              "name" => "name",
              "title" => "Name",
              "type" => "`$STRING`",
              "short" => "Service name",
            },
            {
              "name" => "price",
              "title" => "Price",
              "type" => "`$NUMBER`",
              "short" => "Service price",
              "format" => "float",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "service",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/services",
                  "segments" => [
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "services",
                    },
                  ],
                  "parts" => [
                    "api",
                    "services",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.services`",
                  },
                  "args" => {},
                  "select" => {},
                  "response" => {
                    "kind" => "json",
                    "media" => "application/json",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    AbdoStoreFeatures.make_feature(name)
  end
end
