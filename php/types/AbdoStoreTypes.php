<?php
declare(strict_types=1);

// Typed models for the AbdoStore SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Account entity data model. */
class Account
{
    public ?float $balance = null;
    public ?string $currency = null;
    public ?string $status = null;
}

/** Request payload for Account#load. */
class AccountLoadMatch
{
    public ?float $balance = null;
    public ?string $currency = null;
    public ?string $status = null;
}

/** Order entity data model. */
class Order
{
    public ?float $charge = null;
    public ?string $comment = null;
    public string $link;
    public ?array $order = null;
    public ?int $order_id = null;
    public int $quantity;
    public int $service_id;
    public ?string $status = null;
}

/** Request payload for Order#load. */
class OrderLoadMatch
{
    public int $id;
}

/** Request payload for Order#create. */
class OrderCreateData
{
    public ?float $charge = null;
    public ?string $comment = null;
    public string $link;
    public ?array $order = null;
    public ?int $order_id = null;
    public int $quantity;
    public int $service_id;
    public ?string $status = null;
}

/** Service entity data model. */
class Service
{
    public ?string $category = null;
    public ?string $description = null;
    public ?int $id = null;
    public ?int $max = null;
    public ?int $min = null;
    public ?string $name = null;
    public ?float $price = null;
}

/** Request payload for Service#list. */
class ServiceListMatch
{
    public ?string $category = null;
    public ?string $description = null;
    public ?int $id = null;
    public ?int $max = null;
    public ?int $min = null;
    public ?string $name = null;
    public ?float $price = null;
}

