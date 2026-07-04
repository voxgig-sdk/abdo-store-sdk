# Typed models for the AbdoStore SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class Account(TypedDict, total=False):
    balance: float
    currency: str
    status: str


class AccountLoadMatch(TypedDict, total=False):
    balance: float
    currency: str
    status: str


class OrderRequired(TypedDict):
    link: str
    quantity: int
    service_id: int


class Order(OrderRequired, total=False):
    charge: float
    comment: str
    order: dict
    order_id: int
    status: str


class OrderLoadMatch(TypedDict):
    id: int


class OrderCreateData(TypedDict, total=False):
    charge: float
    comment: str
    link: str
    order: dict
    order_id: int
    quantity: int
    service_id: int
    status: str


class Service(TypedDict, total=False):
    category: str
    description: str
    id: int
    max: int
    min: int
    name: str
    price: float


class ServiceListMatch(TypedDict, total=False):
    category: str
    description: str
    id: int
    max: int
    min: int
    name: str
    price: float
