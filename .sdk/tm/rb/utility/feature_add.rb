# AbdoStore SDK utility: feature_add
module AbdoStoreUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
