# AbdoStore SDK

Social media marketing tools for account management, balance top-ups, and order placement

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About Abdo Store API

Abdo Store API exposes a small set of operations for a social media marketing (SMM) panel run at [abdoastore.store](https://abdoastore.store). It is aimed at resellers and end users who want to manage an account, top up a balance, and place orders against the panel's catalogue of services.

What you typically interact with:

- Account operations — sign-in / profile state for the panel user.
- Balance operations — loading or checking the funds used to pay for orders.
- Service catalogue — the list of social media engagement services the panel offers.
- Order operations — submitting and tracking orders against those services.

The provider advertises 24/7 customer support. No authentication scheme, rate limits, or endpoint contracts are published in a machine-readable form, and the freepublicapis.com catalogue currently reports the upstream as unreachable, so callers should be prepared for downtime and verify behaviour against the live panel before integrating.

## Try it

**TypeScript**
```bash
npm install abdo-store
```

**Python**
```bash
pip install abdo-store-sdk
```

**PHP**
```bash
composer require voxgig/abdo-store-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/abdo-store-sdk/go
```

**Ruby**
```bash
gem install abdo-store-sdk
```

**Lua**
```bash
luarocks install abdo-store-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { AbdoStoreSDK } from 'abdo-store'

const client = new AbdoStoreSDK({})

```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o abdo-store-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "abdo-store": {
      "command": "/abs/path/to/abdo-store-mcp"
    }
  }
}
```

## Entities

The API exposes 3 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **Account** | Represents the panel user's account — profile, credentials, and session state used to authorise other calls. | `/api/balance` |
| **Order** | Represents an order placed against the panel for a given social media service, including its status and lifecycle. | `/api/order` |
| **Service** | Represents an item in the SMM service catalogue (the social media engagement products the panel sells) that orders are placed against. | `/api/services` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from abdostore_sdk import AbdoStoreSDK

client = AbdoStoreSDK({})


# Load a specific account
account, err = client.Account(None).load(
    {"id": "example_id"}, None
)
```

### PHP

```php
<?php
require_once 'abdostore_sdk.php';

$client = new AbdoStoreSDK([]);


// Load a specific account
[$account, $err] = $client->Account(null)->load(
    ["id" => "example_id"], null
);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/abdo-store-sdk/go"

client := sdk.NewAbdoStoreSDK(map[string]any{})

```

### Ruby

```ruby
require_relative "AbdoStore_sdk"

client = AbdoStoreSDK.new({})


# Load a specific account
account, err = client.Account(nil).load(
  { "id" => "example_id" }, nil
)
```

### Lua

```lua
local sdk = require("abdo-store_sdk")

local client = sdk.new({})


-- Load a specific account
local account, err = client:Account(nil):load(
  { id = "example_id" }, nil
)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = AbdoStoreSDK.test()
const result = await client.Account().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = AbdoStoreSDK.test(None, None)
result, err = client.Account(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = AbdoStoreSDK::test(null, null);
[$result, $err] = $client->Account(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Account(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = AbdoStoreSDK.test(nil, nil)
result, err = client.Account(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Account(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the Abdo Store API

- Upstream: [https://abdoastore.store](https://abdoastore.store)
- API docs: [https://freepublicapis.com/abdo-store-api](https://freepublicapis.com/abdo-store-api)

- No explicit licence is published by the API provider.
- Treat all data and endpoints as the property of Abdo Store; consult the provider before redistributing responses.
- The community catalogue page on freepublicapis.com currently lists this API as non-functional, so availability is not guaranteed.

---

Generated from the Abdo Store API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
