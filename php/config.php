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
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
        ],
            ],
            "options" => [
                "base" => "https://abdoastore.store",
                "auth" => [
                    "prefix" => "",
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
              'type' => '`$NUMBER`',
            ],
            [
              'name' => 'currency',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'status',
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
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/balance',
                  'parts' => [
                    'api',
                    'balance',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
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
              'type' => '`$NUMBER`',
            ],
            [
              'name' => 'comments',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'link',
              'op' => [
                'create' => [
                  'req' => true,
                  'type' => '`$STRING`',
                ],
              ],
              'type' => '`$STRING`',
            ],
            [
              'name' => 'order_id',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'quantity',
              'op' => [
                'create' => [
                  'req' => true,
                  'type' => '`$INTEGER`',
                ],
              ],
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'remains',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'service_id',
              'op' => [
                'create' => [
                  'req' => true,
                  'type' => '`$INTEGER`',
                ],
              ],
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'start_count',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'status',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'order',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/api/order',
                  'parts' => [
                    'api',
                    'order',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'order_id',
                        'reqd' => true,
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/order/{order_id}',
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
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.order`',
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
              'type' => '`$STRING`',
            ],
            [
              'name' => 'description',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'id',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'max',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'min',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'name',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'price',
              'type' => '`$NUMBER`',
            ],
          ],
          'name' => 'service',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/services',
                  'parts' => [
                    'api',
                    'services',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.services`',
                  ],
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
