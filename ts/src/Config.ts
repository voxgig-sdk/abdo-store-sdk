
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'AbdoStore',
        slug: "abdo-store",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
    },

  }


  options = {
    base: "https://abdoastore.store",

    auth: {
      prefix: '',
    },

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      account: {
      },

      order: {
      },

      service: {
      },

    }
  }


  entity = {
    "account": {
      "fields": [
        {
          "name": "balance",
          "short": "Current account balance",
          "type": "`$NUMBER`"
        },
        {
          "name": "currency",
          "short": "Currency code",
          "type": "`$STRING`"
        },
        {
          "name": "status",
          "type": "`$STRING`"
        }
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
                "balance"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "order": {
      "fields": [
        {
          "name": "charge",
          "short": "Order charge",
          "type": "`$NUMBER`"
        },
        {
          "name": "comments",
          "short": "Additional comments or instructions (optional)",
          "type": "`$STRING`"
        },
        {
          "name": "link",
          "op": {
            "create": {
              "req": true,
              "type": "`$STRING`"
            }
          },
          "short": "Target link",
          "type": "`$STRING`"
        },
        {
          "name": "order_id",
          "short": "Order ID",
          "type": "`$INTEGER`"
        },
        {
          "name": "quantity",
          "op": {
            "create": {
              "req": true,
              "type": "`$INTEGER`"
            }
          },
          "short": "Order quantity",
          "type": "`$INTEGER`"
        },
        {
          "name": "remains",
          "short": "Remaining quantity",
          "type": "`$INTEGER`"
        },
        {
          "name": "service_id",
          "op": {
            "create": {
              "req": true,
              "type": "`$INTEGER`"
            }
          },
          "short": "Service ID",
          "type": "`$INTEGER`"
        },
        {
          "name": "start_count",
          "short": "Start count",
          "type": "`$INTEGER`"
        },
        {
          "name": "status",
          "short": "Order status",
          "type": "`$STRING`"
        }
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
                "order"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
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
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/api/order/{order_id}",
              "parts": [
                "api",
                "order",
                "{id}"
              ],
              "rename": {
                "param": {
                  "order_id": "id"
                }
              },
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.order`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "service": {
      "fields": [
        {
          "name": "category",
          "short": "Service category",
          "type": "`$STRING`"
        },
        {
          "name": "description",
          "short": "Service description",
          "type": "`$STRING`"
        },
        {
          "name": "id",
          "short": "Service ID",
          "type": "`$INTEGER`"
        },
        {
          "name": "max",
          "short": "Maximum order quantity",
          "type": "`$INTEGER`"
        },
        {
          "name": "min",
          "short": "Minimum order quantity",
          "type": "`$INTEGER`"
        },
        {
          "name": "name",
          "short": "Service name",
          "type": "`$STRING`"
        },
        {
          "name": "price",
          "short": "Service price",
          "type": "`$NUMBER`"
        }
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
                "services"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.services`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config
}

