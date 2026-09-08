from books.models import Library, UserBook , Collection


# get the library for the given user, creating it if it doesn't exist
def _user_library(user):
    return Library.for_user(user)


# get the user's books in their library, with related book data
def _library_books_qs(user):
    return (
        UserBook.objects.filter(library=_user_library(user))
        .select_related("book")
        .order_by("-added_at")
    )

    
# get the user's collections in their library, with related book data
def _library_collections_qs(user):
    return (
        Collection.objects.filter(library=_user_library(user))
        .prefetch_related("books")
    )

