// Typed models for the AbdoStore SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Account {
  balance?: number
  currency?: string
  status?: string
}

export interface AccountLoadMatch {
  balance?: number
  currency?: string
  status?: string
}

export interface Order {
  charge?: number
  comment?: string
  link: string
  order?: Record<string, any>
  order_id?: number
  quantity: number
  service_id: number
  status?: string
}

export interface OrderLoadMatch {
  id: number
}

export interface OrderCreateData {
  charge?: number
  comment?: string
  link: string
  order?: Record<string, any>
  order_id?: number
  quantity: number
  service_id: number
  status?: string
}

export interface Service {
  category?: string
  description?: string
  id?: number
  max?: number
  min?: number
  name?: string
  price?: number
}

export interface ServiceListMatch {
  category?: string
  description?: string
  id?: number
  max?: number
  min?: number
  name?: string
  price?: number
}

