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
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
		},
		"options": map[string]any{
			"base": "https://abdoastore.store",
			"auth": map[string]any{
				"prefix": "",
				"name": "X-API-Key",
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
						"title": "Balance",
						"type": "`$NUMBER`",
						"short": "Current account balance",
						"format": "float",
					},
					map[string]any{
						"name": "currency",
						"title": "Currency",
						"type": "`$STRING`",
						"short": "Currency code",
					},
					map[string]any{
						"name": "status",
						"title": "Status",
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
								"kind": "http",
								"method": "GET",
								"orig": "/api/balance",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "balance",
									},
								},
								"parts": []any{
									"api",
									"balance",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
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
						"title": "Charge",
						"type": "`$NUMBER`",
						"short": "Order charge",
						"format": "float",
					},
					map[string]any{
						"name": "comments",
						"title": "Comments",
						"type": "`$STRING`",
						"short": "Additional comments or instructions (optional)",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "link",
						"title": "Link",
						"type": "`$STRING`",
						"op": map[string]any{
							"create": map[string]any{
								"req": true,
								"type": "`$STRING`",
							},
						},
						"short": "Target link",
					},
					map[string]any{
						"name": "order_id",
						"title": "Order Id",
						"type": "`$INTEGER`",
						"short": "Order ID",
					},
					map[string]any{
						"name": "quantity",
						"title": "Quantity",
						"type": "`$INTEGER`",
						"op": map[string]any{
							"create": map[string]any{
								"req": true,
								"type": "`$INTEGER`",
							},
						},
						"short": "Order quantity",
					},
					map[string]any{
						"name": "remains",
						"title": "Remains",
						"type": "`$INTEGER`",
						"short": "Remaining quantity",
					},
					map[string]any{
						"name": "service_id",
						"title": "Service Id",
						"type": "`$INTEGER`",
						"op": map[string]any{
							"create": map[string]any{
								"req": true,
								"type": "`$INTEGER`",
							},
						},
						"short": "Service ID",
					},
					map[string]any{
						"name": "start_count",
						"title": "Start Count",
						"type": "`$INTEGER`",
						"short": "Start count",
					},
					map[string]any{
						"name": "status",
						"title": "Status",
						"type": "`$STRING`",
						"short": "Order status",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "order",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/api/order",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "order",
									},
								},
								"parts": []any{
									"api",
									"order",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/order/{order_id}",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "order",
									},
									map[string]any{
										"var": "id",
									},
								},
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
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.order`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "order_id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
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
						"title": "Category",
						"type": "`$STRING`",
						"short": "Service category",
					},
					map[string]any{
						"name": "description",
						"title": "Description",
						"type": "`$STRING`",
						"short": "Service description",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$INTEGER`",
						"short": "Service ID",
					},
					map[string]any{
						"name": "max",
						"title": "Max",
						"type": "`$INTEGER`",
						"short": "Maximum order quantity",
					},
					map[string]any{
						"name": "min",
						"title": "Min",
						"type": "`$INTEGER`",
						"short": "Minimum order quantity",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"short": "Service name",
					},
					map[string]any{
						"name": "price",
						"title": "Price",
						"type": "`$NUMBER`",
						"short": "Service price",
						"format": "float",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "service",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api/services",
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "services",
									},
								},
								"parts": []any{
									"api",
									"services",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.services`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
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

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
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
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
