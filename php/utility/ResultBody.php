<?php
declare(strict_types=1);

// AbdoStore SDK utility: result_body

class AbdoStoreResultBody
{
    public static function call(AbdoStoreContext $ctx): ?AbdoStoreResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
