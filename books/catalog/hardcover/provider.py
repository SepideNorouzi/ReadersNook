from ..dto import BookCard
from ..ids import parse_hardcover_id
from .client import HardcoverClient
from .mapping import document_to_card

BOOK_QUERY = """
query GetBook($id: Int!) {
  books_by_pk(id: $id) {
    id
    title
    description
    rating
    pages
    cached_image
    cached_contributors
    cached_tags
  }
}
"""


class HardcoverProvider:
    def __init__(self, client=None):
        self.client = client or HardcoverClient()

    def fetch(self, external_id: str) -> BookCard | None:
        hardcover_id = parse_hardcover_id(external_id)
        if hardcover_id is None:
            return None

        data = self.client.execute(BOOK_QUERY, {"id": hardcover_id})
        doc = data.get("books_by_pk")
        if not isinstance(doc, dict):
            return None
        return document_to_card(doc.get("id") or hardcover_id, doc)
