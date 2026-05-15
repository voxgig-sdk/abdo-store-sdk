# AbdoStore SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

AbdoStoreUtility.registrar = ->(u) {
  u.clean = AbdoStoreUtilities::Clean
  u.done = AbdoStoreUtilities::Done
  u.make_error = AbdoStoreUtilities::MakeError
  u.feature_add = AbdoStoreUtilities::FeatureAdd
  u.feature_hook = AbdoStoreUtilities::FeatureHook
  u.feature_init = AbdoStoreUtilities::FeatureInit
  u.fetcher = AbdoStoreUtilities::Fetcher
  u.make_fetch_def = AbdoStoreUtilities::MakeFetchDef
  u.make_context = AbdoStoreUtilities::MakeContext
  u.make_options = AbdoStoreUtilities::MakeOptions
  u.make_request = AbdoStoreUtilities::MakeRequest
  u.make_response = AbdoStoreUtilities::MakeResponse
  u.make_result = AbdoStoreUtilities::MakeResult
  u.make_point = AbdoStoreUtilities::MakePoint
  u.make_spec = AbdoStoreUtilities::MakeSpec
  u.make_url = AbdoStoreUtilities::MakeUrl
  u.param = AbdoStoreUtilities::Param
  u.prepare_auth = AbdoStoreUtilities::PrepareAuth
  u.prepare_body = AbdoStoreUtilities::PrepareBody
  u.prepare_headers = AbdoStoreUtilities::PrepareHeaders
  u.prepare_method = AbdoStoreUtilities::PrepareMethod
  u.prepare_params = AbdoStoreUtilities::PrepareParams
  u.prepare_path = AbdoStoreUtilities::PreparePath
  u.prepare_query = AbdoStoreUtilities::PrepareQuery
  u.result_basic = AbdoStoreUtilities::ResultBasic
  u.result_body = AbdoStoreUtilities::ResultBody
  u.result_headers = AbdoStoreUtilities::ResultHeaders
  u.transform_request = AbdoStoreUtilities::TransformRequest
  u.transform_response = AbdoStoreUtilities::TransformResponse
}
