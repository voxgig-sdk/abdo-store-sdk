# frozen_string_literal: true

# Typed models for the AbdoStore SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Account entity data model.
#
# @!attribute [rw] balance
#   @return [Float, nil]
#
# @!attribute [rw] currency
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
Account = Struct.new(
  :balance,
  :currency,
  :status,
  keyword_init: true
)

# Match filter for Account#load (any subset of Account fields).
#
# @!attribute [rw] balance
#   @return [Float, nil]
#
# @!attribute [rw] currency
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
AccountLoadMatch = Struct.new(
  :balance,
  :currency,
  :status,
  keyword_init: true
)

# Order entity data model.
#
# @!attribute [rw] charge
#   @return [Float, nil]
#
# @!attribute [rw] comment
#   @return [String, nil]
#
# @!attribute [rw] link
#   @return [String]
#
# @!attribute [rw] order
#   @return [Hash, nil]
#
# @!attribute [rw] order_id
#   @return [Integer, nil]
#
# @!attribute [rw] quantity
#   @return [Integer]
#
# @!attribute [rw] service_id
#   @return [Integer]
#
# @!attribute [rw] status
#   @return [String, nil]
Order = Struct.new(
  :charge,
  :comment,
  :link,
  :order,
  :order_id,
  :quantity,
  :service_id,
  :status,
  keyword_init: true
)

# Request payload for Order#load.
#
# @!attribute [rw] id
#   @return [Integer]
OrderLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Match filter for Order#create (any subset of Order fields).
#
# @!attribute [rw] charge
#   @return [Float, nil]
#
# @!attribute [rw] comment
#   @return [String, nil]
#
# @!attribute [rw] link
#   @return [String, nil]
#
# @!attribute [rw] order
#   @return [Hash, nil]
#
# @!attribute [rw] order_id
#   @return [Integer, nil]
#
# @!attribute [rw] quantity
#   @return [Integer, nil]
#
# @!attribute [rw] service_id
#   @return [Integer, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
OrderCreateData = Struct.new(
  :charge,
  :comment,
  :link,
  :order,
  :order_id,
  :quantity,
  :service_id,
  :status,
  keyword_init: true
)

# Service entity data model.
#
# @!attribute [rw] category
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] max
#   @return [Integer, nil]
#
# @!attribute [rw] min
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] price
#   @return [Float, nil]
Service = Struct.new(
  :category,
  :description,
  :id,
  :max,
  :min,
  :name,
  :price,
  keyword_init: true
)

# Match filter for Service#list (any subset of Service fields).
#
# @!attribute [rw] category
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] max
#   @return [Integer, nil]
#
# @!attribute [rw] min
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] price
#   @return [Float, nil]
ServiceListMatch = Struct.new(
  :category,
  :description,
  :id,
  :max,
  :min,
  :name,
  :price,
  keyword_init: true
)

