# AbdoStore SDK utility: make_context
require_relative '../core/context'
module AbdoStoreUtilities
  MakeContext = ->(ctxmap, basectx) {
    AbdoStoreContext.new(ctxmap, basectx)
  }
end
