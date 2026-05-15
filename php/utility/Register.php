<?php
declare(strict_types=1);

// AbdoStore SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

AbdoStoreUtility::setRegistrar(function (AbdoStoreUtility $u): void {
    $u->clean = [AbdoStoreClean::class, 'call'];
    $u->done = [AbdoStoreDone::class, 'call'];
    $u->make_error = [AbdoStoreMakeError::class, 'call'];
    $u->feature_add = [AbdoStoreFeatureAdd::class, 'call'];
    $u->feature_hook = [AbdoStoreFeatureHook::class, 'call'];
    $u->feature_init = [AbdoStoreFeatureInit::class, 'call'];
    $u->fetcher = [AbdoStoreFetcher::class, 'call'];
    $u->make_fetch_def = [AbdoStoreMakeFetchDef::class, 'call'];
    $u->make_context = [AbdoStoreMakeContext::class, 'call'];
    $u->make_options = [AbdoStoreMakeOptions::class, 'call'];
    $u->make_request = [AbdoStoreMakeRequest::class, 'call'];
    $u->make_response = [AbdoStoreMakeResponse::class, 'call'];
    $u->make_result = [AbdoStoreMakeResult::class, 'call'];
    $u->make_point = [AbdoStoreMakePoint::class, 'call'];
    $u->make_spec = [AbdoStoreMakeSpec::class, 'call'];
    $u->make_url = [AbdoStoreMakeUrl::class, 'call'];
    $u->param = [AbdoStoreParam::class, 'call'];
    $u->prepare_auth = [AbdoStorePrepareAuth::class, 'call'];
    $u->prepare_body = [AbdoStorePrepareBody::class, 'call'];
    $u->prepare_headers = [AbdoStorePrepareHeaders::class, 'call'];
    $u->prepare_method = [AbdoStorePrepareMethod::class, 'call'];
    $u->prepare_params = [AbdoStorePrepareParams::class, 'call'];
    $u->prepare_path = [AbdoStorePreparePath::class, 'call'];
    $u->prepare_query = [AbdoStorePrepareQuery::class, 'call'];
    $u->result_basic = [AbdoStoreResultBasic::class, 'call'];
    $u->result_body = [AbdoStoreResultBody::class, 'call'];
    $u->result_headers = [AbdoStoreResultHeaders::class, 'call'];
    $u->transform_request = [AbdoStoreTransformRequest::class, 'call'];
    $u->transform_response = [AbdoStoreTransformResponse::class, 'call'];
});
