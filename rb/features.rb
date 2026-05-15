# AbdoStore SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module AbdoStoreFeatures
  def self.make_feature(name)
    case name
    when "base"
      AbdoStoreBaseFeature.new
    when "test"
      AbdoStoreTestFeature.new
    else
      AbdoStoreBaseFeature.new
    end
  end
end
