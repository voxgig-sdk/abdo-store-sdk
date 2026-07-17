-- AbdoStore SDK exists test

local sdk = require("abdo-store_sdk")

describe("AbdoStoreSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
