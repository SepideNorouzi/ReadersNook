from books.models import Collection, Library, UserBook


def user_library(user):
    """Return the user's library, creating it on first access."""
    return Library.for_user(user)


def library_books_qs(user):
    """The user's library items with book data, newest first."""
    return (
        UserBook.objects.filter(library=user_library(user))
        .select_related("book")
        .order_by("-added_at")
    )


def library_collections_qs(user):
    """The user's collections with their books prefetched."""
    return Collection.objects.filter(library=user_library(user)).prefetch_related(
        "books"
    )
