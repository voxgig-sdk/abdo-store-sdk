<?php
declare(strict_types=1);

// AbdoStore SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class AbdoStoreMakeContext
{
    public static function call(array $ctxmap, ?AbdoStoreContext $basectx): AbdoStoreContext
    {
        return new AbdoStoreContext($ctxmap, $basectx);
    }
}
