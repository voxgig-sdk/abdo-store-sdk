# AbdoStore SDK utility: prepare_body
require_relative 'media'
module AbdoStoreUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return AbdoStoreUtilities.raw_body(ctx.reqdata) if AbdoStoreUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
