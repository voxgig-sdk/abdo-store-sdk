# AbdoStore SDK exists test

require "minitest/autorun"
require_relative "../AbdoStore_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = AbdoStoreSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
