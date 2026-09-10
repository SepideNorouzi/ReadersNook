from ...models import Book
from ..dto import BookCard


class LocalCatalogProvider:
    def fetch(self, external_id: str) -> BookCard | None:
        book = Book.objects.filter(external_id=external_id).first()
        if book is None:
            return None
        return BookCard(
            external_id=book.external_id,
            title=book.title,
            author=book.author,
            summary=book.summary,
            cover_url=book.cover_url,
            total_pages=book.total_pages,
        )
