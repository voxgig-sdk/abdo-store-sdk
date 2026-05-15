package core

type AbdoStoreError struct {
	IsAbdoStoreError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewAbdoStoreError(code string, msg string, ctx *Context) *AbdoStoreError {
	return &AbdoStoreError{
		IsAbdoStoreError: true,
		Sdk:              "AbdoStore",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *AbdoStoreError) Error() string {
	return e.Msg
}
