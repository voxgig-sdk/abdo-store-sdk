package = "voxgig-sdk-abdo-store"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/abdo-store-sdk.git"
}
description = {
  summary = "AbdoStore SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["abdo-store_sdk"] = "abdo-store_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
