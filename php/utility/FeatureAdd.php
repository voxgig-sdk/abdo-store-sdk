<?php
declare(strict_types=1);

// AbdoStore SDK utility: feature_add

class AbdoStoreFeatureAdd
{
    public static function call(AbdoStoreContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
