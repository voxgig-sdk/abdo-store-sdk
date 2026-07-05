-- Typed models for the AbdoStore SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Account
---@field balance? number
---@field currency? string
---@field status? string

---@class AccountLoadMatch
---@field balance? number
---@field currency? string
---@field status? string

---@class Order
---@field charge? number
---@field comment? string
---@field link string
---@field order? table
---@field order_id? number
---@field quantity number
---@field service_id number
---@field status? string

---@class OrderLoadMatch
---@field id number

---@class OrderCreateData
---@field charge? number
---@field comment? string
---@field link string
---@field order? table
---@field order_id? number
---@field quantity number
---@field service_id number
---@field status? string

---@class Service
---@field category? string
---@field description? string
---@field id? number
---@field max? number
---@field min? number
---@field name? string
---@field price? number

---@class ServiceListMatch
---@field category? string
---@field description? string
---@field id? number
---@field max? number
---@field min? number
---@field name? string
---@field price? number

local M = {}

return M
