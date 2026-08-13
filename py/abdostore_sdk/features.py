# AbdoStore SDK feature factory

from abdostore_sdk.feature.base_feature import AbdoStoreBaseFeature
from abdostore_sdk.feature.test_feature import AbdoStoreTestFeature


def _make_feature(name):
    features = {
        "base": lambda: AbdoStoreBaseFeature(),
        "test": lambda: AbdoStoreTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
