<?php
declare(strict_types=1);

// AbdoStore SDK exists test

require_once __DIR__ . '/../abdostore_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = AbdoStoreSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
