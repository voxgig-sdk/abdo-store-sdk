package voxgigabdostoresdk

import (
	"github.com/voxgig-sdk/abdo-store-sdk/core"
	"github.com/voxgig-sdk/abdo-store-sdk/entity"
	"github.com/voxgig-sdk/abdo-store-sdk/feature"
	_ "github.com/voxgig-sdk/abdo-store-sdk/utility"
)

// Type aliases preserve external API.
type AbdoStoreSDK = core.AbdoStoreSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type AbdoStoreEntity = core.AbdoStoreEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type AbdoStoreError = core.AbdoStoreError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewAccountEntityFunc = func(client *core.AbdoStoreSDK, entopts map[string]any) core.AbdoStoreEntity {
		return entity.NewAccountEntity(client, entopts)
	}
	core.NewOrderEntityFunc = func(client *core.AbdoStoreSDK, entopts map[string]any) core.AbdoStoreEntity {
		return entity.NewOrderEntity(client, entopts)
	}
	core.NewServiceEntityFunc = func(client *core.AbdoStoreSDK, entopts map[string]any) core.AbdoStoreEntity {
		return entity.NewServiceEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewAbdoStoreSDK = core.NewAbdoStoreSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
