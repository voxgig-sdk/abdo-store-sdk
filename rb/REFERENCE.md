# AbdoStore Ruby SDK Reference

Complete API reference for the AbdoStore Ruby SDK.


## AbdoStoreSDK

### Constructor

```ruby
require_relative 'AbdoStore_sdk'

client = AbdoStoreSDK.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `Hash` | SDK configuration options. |
| `options["apikey"]` | `String` | API key for authentication. |
| `options["base"]` | `String` | Base URL for API requests. |
| `options["prefix"]` | `String` | URL prefix appended after base. |
| `options["suffix"]` | `String` | URL suffix appended after path. |
| `options["headers"]` | `Hash` | Custom headers for all requests. |
| `options["feature"]` | `Hash` | Feature configuration. |
| `options["system"]` | `Hash` | System overrides (e.g. custom fetch). |


### Static Methods

#### `AbdoStoreSDK.test(testopts = nil, sdkopts = nil)`

Create a test client with mock features active. Both arguments may be `nil`.

```ruby
client = AbdoStoreSDK.test
```


### Instance Methods

#### `Account(data = nil)`

Create a new `Account` entity instance. Pass `nil` for no initial data.

#### `Order(data = nil)`

Create a new `Order` entity instance. Pass `nil` for no initial data.

#### `Service(data = nil)`

Create a new `Service` entity instance. Pass `nil` for no initial data.

#### `options_map -> Hash`

Return a deep copy of the current SDK options.

#### `get_utility -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs = {}) -> Hash`

Make a direct HTTP request to any API endpoint. Returns a result hash
(`{ "ok" => ..., "status" => ..., "data" => ..., "err" => ... }`); it
does not raise — inspect `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `String` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `String` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `Hash` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `Hash` | Query string parameters. |
| `fetchargs["headers"]` | `Hash` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (hashes are JSON-serialized). |
| `fetchargs["ctrl"]` | `Hash` | Control options (e.g. `{ "explain" => true }`). |

**Returns:** `Hash`

#### `prepare(fetchargs = {}) -> Hash`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`. Raises on error.

**Returns:** `Hash` (the fetch definition; raises on error)


---

## AccountEntity

```ruby
account = client.Account
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `balance` | `Float` | No |  |
| `currency` | `String` | No |  |
| `status` | `String` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Account.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AccountEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## OrderEntity

```ruby
order = client.Order
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `charge` | `Float` | No |  |
| `comments` | `String` | No |  |
| `link` | `String` | No |  |
| `order_id` | `Integer` | No |  |
| `quantity` | `Integer` | No |  |
| `remains` | `Integer` | No |  |
| `service_id` | `Integer` | No |  |
| `start_count` | `Integer` | No |  |
| `status` | `String` | No |  |

### Field Usage by Operation

| Field | load | create |
| --- | --- | --- |
| `charge` | - | - |
| `comments` | - | - |
| `link` | - | Yes |
| `order_id` | - | - |
| `quantity` | - | Yes |
| `remains` | - | - |
| `service_id` | - | Yes |
| `start_count` | - | - |
| `status` | - | - |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.Order.create({
})
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Order.load({ "id" => 1 })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `OrderEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ServiceEntity

```ruby
service = client.Service
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `category` | `String` | No |  |
| `description` | `String` | No |  |
| `id` | `Integer` | No |  |
| `max` | `Integer` | No |  |
| `min` | `Integer` | No |  |
| `name` | `String` | No |  |
| `price` | `Float` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Service.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ServiceEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ruby
client = AbdoStoreSDK.new({
  "feature" => {
    "test" => { "active" => true },
  },
})
```

