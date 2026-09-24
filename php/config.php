<?php
declare(strict_types=1);

// AbdoStore SDK configuration

class AbdoStoreConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "AbdoStore",
                "slug" => "abdo-store",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "ratelimit" => [
          'options' => [
            'active' => false,
            'burst' => 5,
            'rate' => 5,
          ],
          'optspec' => [
            'now' => '`$FUNCTION`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "retry" => [
          'options' => [
            'active' => false,
            'factor' => 2,
            'maxDelay' => 2000,
            'minDelay' => 50,
            'retries' => 2,
            'statuses' => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          ],
          'optspec' => [
            'jitter' => '`$BOOLEAN`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "test" => [
          'options' => [
            'active' => false,
          ],
          'optspec' => [
            'entity' => '`$MAP`',
            'net' => '`$MAP`',
          ],
          'strict' => false,
          'transport' => 'base',
        ],
                "timeout" => [
          'options' => [
            'active' => false,
            'ms' => 30000,
          ],
          'optspec' => [
            'clearTimer' => '`$FUNCTION`',
            'setTimer' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
            ],
            "options" => [
                "base" => "https://abdoastore.store",
                "auth" => [
                    "prefix" => "",
                    "name" => "X-API-Key",
                ],
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "account" => [],
                    "order" => [],
                    "service" => [],
                ],
            ],
            "entity" => [
        'account' => [
          'fields' => [
            [
              'name' => 'balance',
              'title' => 'Balance',
              'type' => '`$NUMBER`',
              'short' => 'Current account balance',
              'format' => 'float',
            ],
            [
              'name' => 'currency',
              'title' => 'Currency',
              'type' => '`$STRING`',
              'short' => 'Currency code',
            ],
            [
              'name' => 'status',
              'title' => 'Status',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'account',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/balance',
                  'segments' => [
                    [
                      'lit' => 'api',
                    ],
                    [
                      'lit' => 'balance',
                    ],
                  ],
                  'parts' => [
                    'api',
                    'balance',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [],
                  'select' => [],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'order' => [
          'fields' => [
            [
              'name' => 'charge',
              'title' => 'Charge',
              'type' => '`$NUMBER`',
              'short' => 'Order charge',
              'format' => 'float',
            ],
            [
              'name' => 'comments',
              'title' => 'Comments',
              'type' => '`$STRING`',
              'short' => 'Additional comments or instructions (optional)',
            ],
            [
              'name' => 'id',
              'title' => 'Id',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'link',
              'title' => 'Link',
              'type' => '`$STRING`',
              'op' => [
                'create' => [
                  'req' => true,
                  'type' => '`$STRING`',
                ],
              ],
              'short' => 'Target link',
            ],
            [
              'name' => 'order_id',
              'title' => 'Order Id',
              'type' => '`$INTEGER`',
              'short' => 'Order ID',
            ],
            [
              'name' => 'quantity',
              'title' => 'Quantity',
              'type' => '`$INTEGER`',
              'op' => [
                'create' => [
                  'req' => true,
                  'type' => '`$INTEGER`',
                ],
              ],
              'short' => 'Order quantity',
            ],
            [
              'name' => 'remains',
              'title' => 'Remains',
              'type' => '`$INTEGER`',
              'short' => 'Remaining quantity',
            ],
            [
              'name' => 'service_id',
              'title' => 'Service Id',
              'type' => '`$INTEGER`',
              'op' => [
                'create' => [
                  'req' => true,
                  'type' => '`$INTEGER`',
                ],
              ],
              'short' => 'Service ID',
            ],
            [
              'name' => 'start_count',
              'title' => 'Start Count',
              'type' => '`$INTEGER`',
              'short' => 'Start count',
            ],
            [
              'name' => 'status',
              'title' => 'Status',
              'type' => '`$STRING`',
              'short' => 'Order status',
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
          ],
          'name' => 'order',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/api/order',
                  'segments' => [
                    [
                      'lit' => 'api',
                    ],
                    [
                      'lit' => 'order',
                    ],
                  ],
                  'parts' => [
                    'api',
                    'order',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [],
                  'select' => [],
                ],
              ],
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/order/{order_id}',
                  'segments' => [
                    [
                      'lit' => 'api',
                    ],
                    [
                      'lit' => 'order',
                    ],
                    [
                      'var' => 'id',
                    ],
                  ],
                  'parts' => [
                    'api',
                    'order',
                    '{id}',
                  ],
                  'rename' => [
                    'param' => [
                      'order_id' => 'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.order`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'id',
                        'orig' => 'order_id',
                        'type' => '`$INTEGER`',
                        'kind' => 'param',
                        'reqd' => true,
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'service' => [
          'fields' => [
            [
              'name' => 'category',
              'title' => 'Category',
              'type' => '`$STRING`',
              'short' => 'Service category',
            ],
            [
              'name' => 'description',
              'title' => 'Description',
              'type' => '`$STRING`',
              'short' => 'Service description',
            ],
            [
              'name' => 'id',
              'title' => 'Id',
              'type' => '`$INTEGER`',
              'short' => 'Service ID',
            ],
            [
              'name' => 'max',
              'title' => 'Max',
              'type' => '`$INTEGER`',
              'short' => 'Maximum order quantity',
            ],
            [
              'name' => 'min',
              'title' => 'Min',
              'type' => '`$INTEGER`',
              'short' => 'Minimum order quantity',
            ],
            [
              'name' => 'name',
              'title' => 'Name',
              'type' => '`$STRING`',
              'short' => 'Service name',
            ],
            [
              'name' => 'price',
              'title' => 'Price',
              'type' => '`$NUMBER`',
              'short' => 'Service price',
              'format' => 'float',
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
          ],
          'name' => 'service',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/services',
                  'segments' => [
                    [
                      'lit' => 'api',
                    ],
                    [
                      'lit' => 'services',
                    ],
                  ],
                  'parts' => [
                    'api',
                    'services',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.services`',
                  ],
                  'args' => [],
                  'select' => [],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return AbdoStoreFeatures::make_feature($name);
    }
}
