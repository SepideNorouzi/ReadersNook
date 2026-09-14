from django.conf import settings

from .hardcover.provider import HardcoverProvider
from .hardcover.search import HardcoverSearch
from .local.provider import LocalCatalogProvider
from .local.search import LocalCatalogSearch


def get_search():
    """Search backend, chosen by SEARCH_BACKEND (hardcover or local)."""
    if settings.SEARCH_BACKEND == "local":
        return LocalCatalogSearch()
    return HardcoverSearch()


def get_provider():
    """Book provider, chosen by CATALOG_PROVIDER (hardcover or local)."""
    if settings.CATALOG_PROVIDER == "local":
        return LocalCatalogProvider()
    return HardcoverProvider()
