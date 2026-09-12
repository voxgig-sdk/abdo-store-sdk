"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const TestFeature_1 = require("./feature/test/TestFeature");
const FEATURE_CLASS = {
    test: TestFeature_1.TestFeature,
};
// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        // TODO: errors etc
        return fi;
    }
    // False for a feature added at runtime via options.extend (station's
    // adopt path) - the constructor uses this to skip makeFeature for names
    // no generated class backs.
    hasFeature(fn) {
        return null != FEATURE_CLASS[fn];
    }
    main = {
        name: 'AbdoStore',
        slug: "abdo-store",
        version: "0.0.1",
        target: "ts",
    };
    feature = {
        test: {
            "options": {
                "active": false
            },
            "transport": "base"
        },
    };
    options = {
        base: "https://abdoastore.store",
        auth: {
            prefix: '',
        },
        headers: {
            "content-type": "application/json"
        },
        entity: {
            account: {},
            order: {},
            service: {},
        }
    };
    entity = {
        "account": {
            "fields": [
                {
                    "format": "float",
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
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "balance"
                                }
                            ],
                            "select": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "api",
                                "balance"
                            ]
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
                    "format": "float",
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
                    "name": "id",
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
            "id": {
                "field": "id",
                "name": "id"
            },
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
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "order"
                                }
                            ],
                            "select": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "api",
                                "order"
                            ]
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
                            "rename": {
                                "param": {
                                    "order_id": "id"
                                }
                            },
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "order"
                                },
                                {
                                    "var": "id"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "id"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.order`"
                            },
                            "parts": [
                                "api",
                                "order",
                                "{id}"
                            ]
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
                    "format": "float",
                    "name": "price",
                    "short": "Service price",
                    "type": "`$NUMBER`"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
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
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "services"
                                }
                            ],
                            "select": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.services`"
                            },
                            "parts": [
                                "api",
                                "services"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        }
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map