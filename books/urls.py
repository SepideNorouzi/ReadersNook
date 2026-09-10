from django.urls import path

from .views import (
    AestheticPhotoCreateAPIView,
    BookCreateAPIView,
    BookDetailAPIView,
    BookListAPIView,
    BookUpdateAPIView,
    LibraryBookDetailAPIView,
    LibraryBookDeleteAPIView,
    CollectionDetailAPIView,
    QuoteCreateAPIView,
    QuoteListAPIView,
    QuoteUpdateAPIView,
    CollectionListAPIView,
    CollectionCreateAPIView,
    CollectionUpdateDeleteAPIView,
    CollectionAddRemoveBooksAPIView,
    AchievementCreateAPIView,
    BookSearchAPIView,
    CatalogBookDetailAPIView,
)

app_name = "books"

urlpatterns = [
    path("search/books/", BookSearchAPIView.as_view(), name="book-search"),
    path(
        "books/external/<str:external_id>/",
        CatalogBookDetailAPIView.as_view(),
        name="catalog-book-detail",
    ),
    path("library/", BookListAPIView.as_view(), name="book-list"),
    path("library/add/", BookCreateAPIView.as_view(), name="book-create"),
    path("library/books/<int:book_pk>/", LibraryBookDetailAPIView.as_view(), name="library-book-detail"),
    path("library/books/<int:book_pk>/delete/", LibraryBookDeleteAPIView.as_view(), name="library-book-delete"),
    path("books/<int:pk>/", BookDetailAPIView.as_view(), name="book-detail"),
    path("books/<int:pk>/update/", BookUpdateAPIView.as_view(), name="book-update"),
    path("books/<int:pk>/quotes/", QuoteListAPIView.as_view(), name="quote-list"),
    path("books/<int:pk>/quotes/create/", QuoteCreateAPIView.as_view(), name="quote-create"),
    path("books/<int:pk>/quotes/<int:quote_pk>/update/", QuoteUpdateAPIView.as_view(), name="quote-update"),
    path("books/<int:pk>/aesthetic_photos/create/", AestheticPhotoCreateAPIView.as_view(), name="aesthetic-photo-create"),
    path("collections/" , CollectionListAPIView.as_view() , name="collection-list"),
    path("collections/create/" , CollectionCreateAPIView.as_view() , name="collection-create"),
    path("collections/<int:pk>/" , CollectionDetailAPIView.as_view() , name="collection-detail"),
    path("collections/<int:pk>/update/" , CollectionUpdateDeleteAPIView.as_view() , name="collection-update"),
    path("collections/<int:pk>/books/<int:book_pk>/" , CollectionAddRemoveBooksAPIView.as_view() , name="collection-add-books"),
    path("achievement/create/" , AchievementCreateAPIView.as_view() , name="achievement-create"),
]
