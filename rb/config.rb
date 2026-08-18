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
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
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
              "name" => "balance",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "currency",
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
                  "parts" => [
                    "api",
                    "balance",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
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
              "type" => "`$NUMBER`",
            },
            {
              "name" => "comments",
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
              "type" => "`$STRING`",
            },
            {
              "name" => "order_id",
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
              "type" => "`$INTEGER`",
            },
            {
              "name" => "remains",
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
              "type" => "`$INTEGER`",
            },
            {
              "name" => "start_count",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "status",
              "type" => "`$STRING`",
            },
          ],
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
                  "parts" => [
                    "api",
                    "order",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
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
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.order`",
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
              "type" => "`$STRING`",
            },
            {
              "name" => "description",
              "type" => "`$STRING`",
            },
            {
              "name" => "id",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "max",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "min",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "name",
              "type" => "`$STRING`",
            },
            {
              "name" => "price",
              "type" => "`$NUMBER`",
            },
          ],
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
                  "parts" => [
                    "api",
                    "services",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.services`",
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
