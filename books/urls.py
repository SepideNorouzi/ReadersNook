from django.urls import path

from .views import (
    AestheticPhotoCreateAPIView,
    BookCreateAPIView,
    BookDetailAPIView,
    BookListAPIView,
    BookUpdateAPIView,
    QuoteCreateAPIView,
    QuoteListAPIView,
    QuoteUpdateAPIView,
    CollectionListAPIView,
    CollectionCreateAPIView,
    CollectionUpdateDeleteAPIView,
    AchievementCreateAPIView,
)

app_name = "books"

urlpatterns = [
    path("books/", BookListAPIView.as_view(), name="book-list"),
    path("books/create/", BookCreateAPIView.as_view(), name="book-create"),
    path("books/<int:pk>/", BookDetailAPIView.as_view(), name="book-detail"),
    path("books/<int:pk>/update/", BookUpdateAPIView.as_view(), name="book-update"),
    path("books/<int:pk>/quotes/", QuoteListAPIView.as_view(), name="quote-list"),
    path("books/<int:pk>/quotes/create/", QuoteCreateAPIView.as_view(), name="quote-create"),
    path("books/<int:pk>/quotes/<int:quote_pk>/update/", QuoteUpdateAPIView.as_view(), name="quote-update"),
    path("books/<int:pk>/aesthetic_photos/create/", AestheticPhotoCreateAPIView.as_view(), name="aesthetic-photo-create"),
    path("collections/" , CollectionListAPIView.as_view() , name="collection-list"),
    path("collections/create/" , CollectionCreateAPIView.as_view() , name="collection-create"),
    path("collections/<int:pk>/update/" , CollectionUpdateDeleteAPIView.as_view() , name="collection-update"),
    path("achievement/create/" , AchievementCreateAPIView.as_view() , name="achievement-create"),


]
