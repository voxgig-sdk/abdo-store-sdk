<?php
declare(strict_types=1);

// AbdoStore SDK utility: prepare_body

class AbdoStorePrepareBody
{
    public static function call(AbdoStoreContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
