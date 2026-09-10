from django.conf import settings

from .hardcover.provider import HardcoverProvider
from .hardcover.search import HardcoverSearch
from .local.provider import LocalCatalogProvider
from .local.search import LocalCatalogSearch


def get_search():
    if settings.SEARCH_BACKEND == "local":
        return LocalCatalogSearch()
    return HardcoverSearch()


def get_provider():
    if settings.CATALOG_PROVIDER == "local":
        return LocalCatalogProvider()
    return HardcoverProvider()
