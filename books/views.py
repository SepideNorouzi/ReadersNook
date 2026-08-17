from drf_spectacular.utils import extend_schema, extend_schema_view
from rest_framework import generics
from rest_framework.permissions import IsAdminUser, IsAuthenticatedOrReadOnly , IsAuthenticated

from .models import Book , Quote
from .serializers import BookCreateSerializer, BookSerializer , QuoteSerializer , QuoteCreateSerializer


@extend_schema_view(
    post=extend_schema(
        tags=["Books"],
        summary="Create a book",
    )
)
class BookCreateAPIView(generics.CreateAPIView):
    queryset = Book.objects.all()
    serializer_class = BookCreateSerializer
    permission_classes = [IsAdminUser]


@extend_schema_view(
    get=extend_schema(
        tags=["Books"],
        summary="List books",
    )
)
class BookListAPIView(generics.ListAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


@extend_schema_view(
    get=extend_schema(
        tags=["Books"],
        summary="Retrieve a book",
    )
)
class BookDetailAPIView(generics.RetrieveAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


@extend_schema_view(
    put=extend_schema(
        tags=["Books"],
        summary="Replace a book",
        description="Full update: every writable field must be supplied.",
    ),
    patch=extend_schema(
        tags=["Books"],
        summary="Partially update a book",
        description="Partial update: only the supplied fields are changed.",
    ),
)
class BookUpdateAPIView(generics.UpdateAPIView):
    """Handle PUT (full update) and PATCH (partial update) for a book."""

    queryset = Book.objects.all()
    serializer_class = BookSerializer
    permission_classes = [IsAdminUser]


@extend_schema_view(
    post=extend_schema(
        tags=["Quotes"],
        summary="Create a quote",
    )
)
class QuoteCreateAPIView(generics.CreateAPIView):
    queryset = Quote.objects.all()
    serializer_class = QuoteCreateSerializer
    permission_classes = [IsAuthenticated]


@extend_schema_view(
    get=extend_schema(
        tags=["Quotes"],
        summary="List my quotes",
    )
)
class QuoteListAPIView(generics.ListAPIView):
    serializer_class = QuoteSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        user = self.request.user
        queryset = Quote.objects.filter(created_by=user)
        return queryset


@extend_schema_view(
    put=extend_schema(
        tags=["Quotes"],
        summary="Replace a quote",
    ),
    patch=extend_schema(
        tags=["Quotes"],
        summary="Partially update a quote",
    ),
)
class QuoteUpdateAPIView(generics.UpdateAPIView):
    serializer_class = QuoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Quote.objects.filter(created_by=self.request.user)
