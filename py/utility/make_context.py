# AbdoStore SDK utility: make_context

from core.context import AbdoStoreContext


def make_context_util(ctxmap, basectx):
    return AbdoStoreContext(ctxmap, basectx)
