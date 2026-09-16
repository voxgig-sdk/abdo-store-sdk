# AbdoStore SDK feature factory

from abdostore_sdk.feature.base_feature import AbdoStoreBaseFeature
from abdostore_sdk.feature.ratelimit_feature import AbdoStoreRatelimitFeature
from abdostore_sdk.feature.retry_feature import AbdoStoreRetryFeature
from abdostore_sdk.feature.test_feature import AbdoStoreTestFeature
from abdostore_sdk.feature.timeout_feature import AbdoStoreTimeoutFeature


_FEATURES = {
    "base": lambda: AbdoStoreBaseFeature(),
    "ratelimit": lambda: AbdoStoreRatelimitFeature(),
    "retry": lambda: AbdoStoreRetryFeature(),
    "test": lambda: AbdoStoreTestFeature(),
    "timeout": lambda: AbdoStoreTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
