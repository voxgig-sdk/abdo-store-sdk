# ProjectName SDK exists test

import pytest
from abdostore_sdk import AbdoStoreSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = AbdoStoreSDK.test(None, None)
        assert testsdk is not None
