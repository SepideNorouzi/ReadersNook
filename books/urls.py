from django.urls import path

from .views import (
    BookCreateAPIView,
    BookDetailAPIView,
    BookListAPIView,
    BookUpdateAPIView,
    QuoteCreateAPIView,
    QuoteListAPIView,
    QuoteUpdateAPIView,
)

app_name = "books"

urlpatterns = [
    path("", BookListAPIView.as_view(), name="book-list"),
    path("create/", BookCreateAPIView.as_view(), name="book-create"),
    path("<int:pk>/", BookDetailAPIView.as_view(), name="book-detail"),
    path("<int:pk>/update/", BookUpdateAPIView.as_view(), name="book-update"),
    path("quotes/", QuoteListAPIView.as_view(), name="quote-list"),
    path("quotes/create/", QuoteCreateAPIView.as_view(), name="quote-create"),
    path("quotes/<int:pk>/update/", QuoteUpdateAPIView.as_view(), name="quote-update"),
]
