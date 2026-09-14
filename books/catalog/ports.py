from typing import Protocol

from .dto import BookCard, SearchPage


class CatalogSearchPort(Protocol):
    def search(self, query: str, page: int, per_page: int) -> SearchPage: ...


class CatalogProviderPort(Protocol):
    def fetch(self, external_id: str) -> BookCard | None: ...
