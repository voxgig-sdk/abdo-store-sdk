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
        "test" => {
          "options" => {
            "active" => false,
          },
          "transport" => "base",
        },
      },
      "options" => {
        "base" => "https://abdoastore.store",
        "auth" => {
          "prefix" => "",
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
              "format" => "float",
              "name" => "balance",
              "short" => "Current account balance",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "currency",
              "short" => "Currency code",
              "type" => "`$STRING`",
            },
            {
              "name" => "status",
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
                  "args" => {},
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
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "api",
                    "balance",
                  ],
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
              "format" => "float",
              "name" => "charge",
              "short" => "Order charge",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "comments",
              "short" => "Additional comments or instructions (optional)",
              "type" => "`$STRING`",
            },
            {
              "name" => "id",
              "type" => "`$STRING`",
            },
            {
              "name" => "link",
              "op" => {
                "create" => {
                  "req" => true,
                  "type" => "`$STRING`",
                },
              },
              "short" => "Target link",
              "type" => "`$STRING`",
            },
            {
              "name" => "order_id",
              "short" => "Order ID",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "quantity",
              "op" => {
                "create" => {
                  "req" => true,
                  "type" => "`$INTEGER`",
                },
              },
              "short" => "Order quantity",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "remains",
              "short" => "Remaining quantity",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "service_id",
              "op" => {
                "create" => {
                  "req" => true,
                  "type" => "`$INTEGER`",
                },
              },
              "short" => "Service ID",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "start_count",
              "short" => "Start count",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "status",
              "short" => "Order status",
              "type" => "`$STRING`",
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
                  "args" => {},
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
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "api",
                    "order",
                  ],
                },
              ],
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "order_id",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/order/{order_id}",
                  "rename" => {
                    "param" => {
                      "order_id" => "id",
                    },
                  },
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
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.order`",
                  },
                  "parts" => [
                    "api",
                    "order",
                    "{id}",
                  ],
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
              "short" => "Service category",
              "type" => "`$STRING`",
            },
            {
              "name" => "description",
              "short" => "Service description",
              "type" => "`$STRING`",
            },
            {
              "name" => "id",
              "short" => "Service ID",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "max",
              "short" => "Maximum order quantity",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "min",
              "short" => "Minimum order quantity",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "name",
              "short" => "Service name",
              "type" => "`$STRING`",
            },
            {
              "format" => "float",
              "name" => "price",
              "short" => "Service price",
              "type" => "`$NUMBER`",
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
                  "args" => {},
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
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.services`",
                  },
                  "parts" => [
                    "api",
                    "services",
                  ],
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
