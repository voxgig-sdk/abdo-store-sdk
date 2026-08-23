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
			"slug": "abdo-store",
			"version": "0.0.1",
			"target": "go",
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
						"short": "Current account balance",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "currency",
						"short": "Currency code",
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
						"short": "Order charge",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "comments",
						"short": "Additional comments or instructions (optional)",
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
						"short": "Target link",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "order_id",
						"short": "Order ID",
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
						"short": "Order quantity",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "remains",
						"short": "Remaining quantity",
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
						"short": "Service ID",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "start_count",
						"short": "Start count",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "status",
						"short": "Order status",
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
						"short": "Service category",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "description",
						"short": "Service description",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"short": "Service ID",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "max",
						"short": "Maximum order quantity",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "min",
						"short": "Minimum order quantity",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "name",
						"short": "Service name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "price",
						"short": "Service price",
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
