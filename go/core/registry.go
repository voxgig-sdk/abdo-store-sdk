package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewAccountEntityFunc func(client *AbdoStoreSDK, entopts map[string]any) AbdoStoreEntity

var NewOrderEntityFunc func(client *AbdoStoreSDK, entopts map[string]any) AbdoStoreEntity

var NewServiceEntityFunc func(client *AbdoStoreSDK, entopts map[string]any) AbdoStoreEntity

