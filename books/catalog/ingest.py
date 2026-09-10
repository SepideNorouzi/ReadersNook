from ..models import Book
from .dto import BookCard
from .exceptions import CatalogNotFoundError
from .factory import get_provider


def book_to_card(book: Book) -> BookCard:
    return BookCard(
        external_id=book.external_id,
        title=book.title,
        author=book.author,
        summary=book.summary,
        cover_url=book.cover_url,
        total_pages=book.total_pages,
    )


def get_book_card(external_id: str) -> tuple[Book | None, BookCard]:
    """Local catalog first; Hardcover only if we have never ingested this book."""
    book = Book.objects.filter(external_id=external_id).first()
    if book is not None:
        return book, book_to_card(book)

    card = get_provider().fetch(external_id)
    if card is None:
        raise CatalogNotFoundError()
    return None, card


def _create_book(card: BookCard) -> Book:
    book, _ = Book.objects.get_or_create(
        external_id=card.external_id,
        defaults={
            "title": card.title,
            "author": card.author,
            "summary": card.summary,
            "cover_url": card.cover_url,
            "total_pages": card.total_pages,
        },
    )
    return book


def resolve_book(data: dict) -> Book:
    """Return a catalog Book, creating it from payload or the provider if needed."""
    external_id = data["external_id"]
    existing = Book.objects.filter(external_id=external_id).first()
    if existing is not None:
        return existing

    if data.get("title") and data.get("author"):
        return _create_book(
            BookCard(
                external_id=external_id,
                title=data["title"],
                author=data["author"],
                summary=data.get("summary") or "",
                cover_url=data.get("cover_url") or "",
                total_pages=data.get("total_pages") or 0,
            )
        )

    card = get_provider().fetch(external_id)
    if card is None:
        raise CatalogNotFoundError()
    return _create_book(card)
