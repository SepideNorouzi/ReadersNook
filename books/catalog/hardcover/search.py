from ..dto import SearchPage
from .client import HardcoverClient
from .mapping import parse_search_hits

SEARCH_QUERY = """
query SearchBooks($query: String!, $page: Int!, $perPage: Int!) {
  search(
    query: $query,
    query_type: "Book",
    page: $page,
    per_page: $perPage
  ) {
    ids
    results
    page
    per_page
  }
}
"""


class HardcoverSearch:
    def __init__(self, client=None):
        self.client = client or HardcoverClient()

    def search(self, query: str, page: int, per_page: int) -> SearchPage:
        data = self.client.execute(
            SEARCH_QUERY,
            {"query": query, "page": page, "perPage": per_page},
        )
        payload = data.get("search") or {}
        cards = parse_search_hits(payload.get("results"), payload.get("ids"))
        return SearchPage(
            query=query,
            page=payload.get("page") or page,
            per_page=payload.get("per_page") or per_page,
            results=cards,
        )
