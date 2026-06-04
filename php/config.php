<?php
declare(strict_types=1);

// AbdoStore SDK configuration

class AbdoStoreConfig
{
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
              'req' => false,
              'type' => '`$NUMBER`',
              'active' => true,
              'index$' => 0,
            ],
            [
              'name' => 'currency',
              'req' => false,
              'type' => '`$STRING`',
              'active' => true,
              'index$' => 1,
            ],
            [
              'name' => 'status',
              'req' => false,
              'type' => '`$STRING`',
              'active' => true,
              'index$' => 2,
            ],
          ],
          'name' => 'account',
          'op' => [
            'load' => [
              'name' => 'load',
              'points' => [
                [
                  'method' => 'GET',
                  'orig' => '/api/balance',
                  'parts' => [
                    'api',
                    'balance',
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'active' => true,
                  'args' => [],
                  'select' => [],
                  'index$' => 0,
                ],
              ],
              'input' => 'data',
              'key$' => 'load',
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
              'req' => false,
              'type' => '`$NUMBER`',
              'active' => true,
              'index$' => 0,
            ],
            [
              'name' => 'comment',
              'req' => false,
              'type' => '`$STRING`',
              'active' => true,
              'index$' => 1,
            ],
            [
              'name' => 'link',
              'req' => true,
              'type' => '`$STRING`',
              'active' => true,
              'index$' => 2,
            ],
            [
              'name' => 'order',
              'req' => false,
              'type' => '`$OBJECT`',
              'active' => true,
              'index$' => 3,
            ],
            [
              'name' => 'order_id',
              'req' => false,
              'type' => '`$INTEGER`',
              'active' => true,
              'index$' => 4,
            ],
            [
              'name' => 'quantity',
              'req' => true,
              'type' => '`$INTEGER`',
              'active' => true,
              'index$' => 5,
            ],
            [
              'name' => 'service_id',
              'req' => true,
              'type' => '`$INTEGER`',
              'active' => true,
              'index$' => 6,
            ],
            [
              'name' => 'status',
              'req' => false,
              'type' => '`$STRING`',
              'active' => true,
              'index$' => 7,
            ],
          ],
          'name' => 'order',
          'op' => [
            'create' => [
              'name' => 'create',
              'points' => [
                [
                  'method' => 'POST',
                  'orig' => '/api/order',
                  'parts' => [
                    'api',
                    'order',
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'active' => true,
                  'args' => [],
                  'select' => [],
                  'index$' => 0,
                ],
              ],
              'input' => 'data',
              'key$' => 'create',
            ],
            'load' => [
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
                        'active' => true,
                      ],
                    ],
                  ],
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
                    'res' => '`body`',
                  ],
                  'active' => true,
                  'index$' => 0,
                ],
              ],
              'input' => 'data',
              'key$' => 'load',
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
              'req' => false,
              'type' => '`$STRING`',
              'active' => true,
              'index$' => 0,
            ],
            [
              'name' => 'description',
              'req' => false,
              'type' => '`$STRING`',
              'active' => true,
              'index$' => 1,
            ],
            [
              'name' => 'id',
              'req' => false,
              'type' => '`$INTEGER`',
              'active' => true,
              'index$' => 2,
            ],
            [
              'name' => 'max',
              'req' => false,
              'type' => '`$INTEGER`',
              'active' => true,
              'index$' => 3,
            ],
            [
              'name' => 'min',
              'req' => false,
              'type' => '`$INTEGER`',
              'active' => true,
              'index$' => 4,
            ],
            [
              'name' => 'name',
              'req' => false,
              'type' => '`$STRING`',
              'active' => true,
              'index$' => 5,
            ],
            [
              'name' => 'price',
              'req' => false,
              'type' => '`$NUMBER`',
              'active' => true,
              'index$' => 6,
            ],
          ],
          'name' => 'service',
          'op' => [
            'list' => [
              'name' => 'list',
              'points' => [
                [
                  'method' => 'GET',
                  'orig' => '/api/services',
                  'parts' => [
                    'api',
                    'services',
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'active' => true,
                  'args' => [],
                  'select' => [],
                  'index$' => 0,
                ],
              ],
              'input' => 'data',
              'key$' => 'list',
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
