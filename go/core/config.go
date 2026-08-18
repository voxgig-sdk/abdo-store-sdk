package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "AbdoStore",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
			},
		},
		"options": map[string]any{
			"base": "https://abdoastore.store",
			"auth": map[string]any{
				"prefix": "",
			},
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"account": map[string]any{},
				"order": map[string]any{},
				"service": map[string]any{},
			},
		},
		"entity": map[string]any{
			"account": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "balance",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "currency",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "status",
						"type": "`$STRING`",
					},
				},
				"name": "account",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/api/balance",
								"parts": []any{
									"api",
									"balance",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"order": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "charge",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "comments",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "link",
						"op": map[string]any{
							"create": map[string]any{
								"req": true,
								"type": "`$STRING`",
							},
						},
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "order_id",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "quantity",
						"op": map[string]any{
							"create": map[string]any{
								"req": true,
								"type": "`$INTEGER`",
							},
						},
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "remains",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "service_id",
						"op": map[string]any{
							"create": map[string]any{
								"req": true,
								"type": "`$INTEGER`",
							},
						},
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "start_count",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "status",
						"type": "`$STRING`",
					},
				},
				"name": "order",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/api/order",
								"parts": []any{
									"api",
									"order",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "order_id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/order/{order_id}",
								"parts": []any{
									"api",
									"order",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"order_id": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.order`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"service": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "category",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "description",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "max",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "min",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "price",
						"type": "`$NUMBER`",
					},
				},
				"name": "service",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/api/services",
								"parts": []any{
									"api",
									"services",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.services`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
