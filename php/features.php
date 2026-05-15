<?php
declare(strict_types=1);

// AbdoStore SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class AbdoStoreFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new AbdoStoreBaseFeature();
            case "test":
                return new AbdoStoreTestFeature();
            default:
                return new AbdoStoreBaseFeature();
        }
    }
}
