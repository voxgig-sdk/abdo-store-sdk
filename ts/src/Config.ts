
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


  main = {
    name: 'AbdoStore',
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
          "type": "`$NUMBER`"
        },
        {
          "name": "currency",
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
          "type": "`$NUMBER`"
        },
        {
          "name": "comments",
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
          "type": "`$STRING`"
        },
        {
          "name": "order_id",
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
          "type": "`$INTEGER`"
        },
        {
          "name": "remains",
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
          "type": "`$INTEGER`"
        },
        {
          "name": "start_count",
          "type": "`$INTEGER`"
        },
        {
          "name": "status",
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
          "type": "`$STRING`"
        },
        {
          "name": "description",
          "type": "`$STRING`"
        },
        {
          "name": "id",
          "type": "`$INTEGER`"
        },
        {
          "name": "max",
          "type": "`$INTEGER`"
        },
        {
          "name": "min",
          "type": "`$INTEGER`"
        },
        {
          "name": "name",
          "type": "`$STRING`"
        },
        {
          "name": "price",
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

