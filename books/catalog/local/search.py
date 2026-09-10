from django.db.models import Q

from ...models import Book
from ..dto import BookCard, SearchPage


class LocalCatalogSearch:
    def search(self, query: str, page: int, per_page: int) -> SearchPage:
        qs = Book.objects.filter(
            Q(title__icontains=query) | Q(author__icontains=query)
        )
        start = (page - 1) * per_page
        books = qs[start : start + per_page]
        return SearchPage(
            query=query,
            page=page,
            per_page=per_page,
            results=[
                BookCard(
                    external_id=book.external_id,
                    title=book.title,
                    author=book.author,
                    summary=book.summary,
                    cover_url=book.cover_url,
                    total_pages=book.total_pages,
                )
                for book in books
            ],
        )
