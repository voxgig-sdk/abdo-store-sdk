<?php
declare(strict_types=1);

// AbdoStore SDK utility: result_headers

class AbdoStoreResultHeaders
{
    public static function call(AbdoStoreContext $ctx): ?AbdoStoreResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
