# AbdoStore SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module AbdoStoreFeatures
  def self.make_feature(name)
    case name
    when "base"
      AbdoStoreBaseFeature.new
    when "ratelimit"
      AbdoStoreRatelimitFeature.new
    when "retry"
      AbdoStoreRetryFeature.new
    when "test"
      AbdoStoreTestFeature.new
    when "timeout"
      AbdoStoreTimeoutFeature.new
    else
      AbdoStoreBaseFeature.new
    end
  end
end
