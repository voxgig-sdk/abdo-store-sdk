// Typed models for the AbdoStore SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// Account is the typed data model for the account entity.
type Account struct {
	Balance *float64 `json:"balance,omitempty"`
	Currency *string `json:"currency,omitempty"`
	Status *string `json:"status,omitempty"`
}

// AccountLoadMatch mirrors the account fields as an all-optional match
// filter (Go analog of Partial<Account>).
type AccountLoadMatch struct {
	Balance *float64 `json:"balance,omitempty"`
	Currency *string `json:"currency,omitempty"`
	Status *string `json:"status,omitempty"`
}

// Order is the typed data model for the order entity.
type Order struct {
	Charge *float64 `json:"charge,omitempty"`
	Comment *string `json:"comment,omitempty"`
	Link string `json:"link"`
	Order *map[string]any `json:"order,omitempty"`
	OrderId *int `json:"order_id,omitempty"`
	Quantity int `json:"quantity"`
	ServiceId int `json:"service_id"`
	Status *string `json:"status,omitempty"`
}

// OrderLoadMatch is the typed request payload for Order.LoadTyped.
type OrderLoadMatch struct {
	Id int `json:"id"`
}

// OrderCreateData mirrors the order fields as an all-optional match
// filter (Go analog of Partial<Order>).
type OrderCreateData struct {
	Charge *float64 `json:"charge,omitempty"`
	Comment *string `json:"comment,omitempty"`
	Link *string `json:"link,omitempty"`
	Order *map[string]any `json:"order,omitempty"`
	OrderId *int `json:"order_id,omitempty"`
	Quantity *int `json:"quantity,omitempty"`
	ServiceId *int `json:"service_id,omitempty"`
	Status *string `json:"status,omitempty"`
}

// Service is the typed data model for the service entity.
type Service struct {
	Category *string `json:"category,omitempty"`
	Description *string `json:"description,omitempty"`
	Id *int `json:"id,omitempty"`
	Max *int `json:"max,omitempty"`
	Min *int `json:"min,omitempty"`
	Name *string `json:"name,omitempty"`
	Price *float64 `json:"price,omitempty"`
}

// ServiceListMatch mirrors the service fields as an all-optional match
// filter (Go analog of Partial<Service>).
type ServiceListMatch struct {
	Category *string `json:"category,omitempty"`
	Description *string `json:"description,omitempty"`
	Id *int `json:"id,omitempty"`
	Max *int `json:"max,omitempty"`
	Min *int `json:"min,omitempty"`
	Name *string `json:"name,omitempty"`
	Price *float64 `json:"price,omitempty"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
