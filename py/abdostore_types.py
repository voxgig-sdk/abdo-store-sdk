# Typed models for the AbdoStore SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class Account:
    balance: Optional[float] = None
    currency: Optional[str] = None
    status: Optional[str] = None


@dataclass
class AccountLoadMatch:
    balance: Optional[float] = None
    currency: Optional[str] = None
    status: Optional[str] = None


@dataclass
class Order:
    link: str
    quantity: int
    service_id: int
    charge: Optional[float] = None
    comment: Optional[str] = None
    order: Optional[dict] = None
    order_id: Optional[int] = None
    status: Optional[str] = None


@dataclass
class OrderLoadMatch:
    id: int


@dataclass
class OrderCreateData:
    charge: Optional[float] = None
    comment: Optional[str] = None
    link: Optional[str] = None
    order: Optional[dict] = None
    order_id: Optional[int] = None
    quantity: Optional[int] = None
    service_id: Optional[int] = None
    status: Optional[str] = None


@dataclass
class Service:
    category: Optional[str] = None
    description: Optional[str] = None
    id: Optional[int] = None
    max: Optional[int] = None
    min: Optional[int] = None
    name: Optional[str] = None
    price: Optional[float] = None


@dataclass
class ServiceListMatch:
    category: Optional[str] = None
    description: Optional[str] = None
    id: Optional[int] = None
    max: Optional[int] = None
    min: Optional[int] = None
    name: Optional[str] = None
    price: Optional[float] = None

