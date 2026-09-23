from django.urls import path

from .views import (
    AchievementCreateAPIView,
    AestheticPhotoCreateAPIView,
    BookCreateAPIView,
    BookDetailAPIView,
    BookListAPIView,
    BookSearchAPIView,
    AddReadingGoalAPIView,
    CatalogBookDetailAPIView,
    CollectionAddRemoveBooksAPIView,
    CollectionCreateAPIView,
    CollectionDetailAPIView,
    CollectionListAPIView,
    CollectionUpdateDeleteAPIView,
    LibraryBookDeleteAPIView,
    LibraryBookUpdateAPIView,
    QuoteCreateAPIView,
    QuoteListAPIView,
    QuoteUpdateAPIView,
    QuoteDeleteAPIView
)

app_name = "books"

urlpatterns = [
    # Search
    path("search/books/", BookSearchAPIView.as_view(), name="book-search"),
    path(
        "books/external/<str:external_id>/",
        CatalogBookDetailAPIView.as_view(),
        name="catalog-book-detail",
    ),
    # Library
    path("library/", BookListAPIView.as_view(), name="book-list"),
    path("library/goal/" , AddReadingGoalAPIView.as_view() , name="reading-goal"),
    path("library/add/", BookCreateAPIView.as_view(), name="book-create"),
    path("books/<int:pk>/", BookDetailAPIView.as_view(), name="book-detail"),
    path(
        "books/<int:pk>/update/",
        LibraryBookUpdateAPIView.as_view(),
        name="library-book-update",
    ),
    path(
        "books/<int:pk>/delete/",
        LibraryBookDeleteAPIView.as_view(),
        name="library-book-delete",
    ),
    # Quotes
    path("books/<int:pk>/quotes/", QuoteListAPIView.as_view(), name="quote-list"),
    path(
        "books/<int:pk>/quotes/create/",
        QuoteCreateAPIView.as_view(),
        name="quote-create",
    ),
    path(
        "books/<int:pk>/quotes/<int:quote_pk>/update/",
        QuoteUpdateAPIView.as_view(),
        name="quote-update",
    ),
    path(
        "books/<int:pk>/quotes/<int:quote_pk>/delete" ,
        QuoteDeleteAPIView.as_view(),
        name="quote-delete",
         ),
    # Aesthetic photos
    path(
        "books/<int:pk>/aesthetic_photos/create/",
        AestheticPhotoCreateAPIView.as_view(),
        name="aesthetic-photo-create",
    ),
    # Collections
    path("collections/", CollectionListAPIView.as_view(), name="collection-list"),
    path(
        "collections/create/",
        CollectionCreateAPIView.as_view(),
        name="collection-create",
    ),
    path(
        "collections/<int:pk>/",
        CollectionDetailAPIView.as_view(),
        name="collection-detail",
    ),
    path(
        "collections/<int:pk>/update/",
        CollectionUpdateDeleteAPIView.as_view(),
        name="collection-update",
    ),
    path(
        "collections/<int:pk>/books/<int:book_pk>/",
        CollectionAddRemoveBooksAPIView.as_view(),
        name="collection-add-books",
    ),
    # Achievements
    path(
        "achievement/create/",
        AchievementCreateAPIView.as_view(),
        name="achievement-create",
    ),
]
