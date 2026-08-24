from drf_spectacular.utils import extend_schema, extend_schema_view
from rest_framework import generics
from rest_framework.permissions import IsAdminUser, IsAuthenticatedOrReadOnly , IsAuthenticated
from django.db.models import Prefetch
from .models import AestheticPhoto, Book , Quote , Collection
from .serializers import (
                           BookSerializer ,
                           BookDetailSerializer ,
                           QuoteSerializer ,
                           QuoteCreateSerializer,
                           AestheticPhotoSerializer,
                           AchievementSerializer,
                           CollectionSerializer

)


#______________________________________________
# Books
#______________________________________________


@extend_schema_view(
    post=extend_schema(
        tags=["Books"],
        summary="Create a book",
    )
)
class BookCreateAPIView(generics.CreateAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
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
    queryset = Book.objects.prefetch_related(
        Prefetch("quotes", queryset=Quote.objects.select_related("created_by")),
        "aesthetic_photos",
    )
    serializer_class = BookDetailSerializer
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


#______________________________________________
# Quote
#______________________________________________


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

    def perform_create(self, serializer):
        book = generics.get_object_or_404(Book, pk=self.kwargs["pk"])
        serializer.save(book=book)


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
        queryset = Quote.objects.filter(
            created_by=user, book_id=self.kwargs["pk"]
        )
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
    lookup_url_kwarg = "quote_pk"

    def get_queryset(self):
        return Quote.objects.filter(
            created_by=self.request.user, book_id=self.kwargs["pk"]
        )


#______________________________________________
# AestheticPhoto
#______________________________________________
@extend_schema_view(
    post=extend_schema(
        tags=["Aesthetic Photos"],
        summary="Create an aesthetic photo",
    )
)
class AestheticPhotoCreateAPIView(generics.CreateAPIView):
    queryset = AestheticPhoto.objects.all()
    serializer_class = AestheticPhotoSerializer
    permission_classes = [IsAdminUser]

    def perform_create(self, serializer):
        book = generics.get_object_or_404(Book, pk=self.kwargs["pk"])
        serializer.save(book=book)


#______________________________________________
# Colleection
#______________________________________________

@extend_schema_view(
    post=extend_schema(
        tags=["Collections"],
        summary="Create a Collection",
    )
)
class CollectionCreateAPIView(generics.CreateAPIView):
    queryset = Collection.objects.all()
    serializer_class = CollectionSerializer
    permission_classes = [IsAuthenticated] 

@extend_schema_view(
    get=extend_schema(
        tags=["Collections"],
        summary="List my collection",
    )
)
class CollectionListAPIView(generics.ListAPIView):
    serializer_class = CollectionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return (Collection.objects
                .filter(created_by=self.request.user)
                .prefetch_related("books"))


@extend_schema_view(
    put=extend_schema(
        tags=["Collections"],
        summary="Replace a collection",
        description="Full update: every writable field must be supplied.",
    ),
    patch=extend_schema(
        tags=["Collections"],
        summary="Partially update a collection",
        description="Partial update: only the supplied fields are changed.",
    ),
    delete=extend_schema(
        tags=["Collections"],
        summary="Delete a collection",
    ),
)
class CollectionUpdateDeleteAPIView(generics.RetrieveUpdateDestroyAPIView):
    """Handle PUT/PATCH (update) and DELETE for a collection owned by the caller."""

    serializer_class = CollectionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Collection.objects.filter(
            created_by=self.request.user
        ).prefetch_related("books")


#______________________________________________
# Achievement
#______________________________________________

@extend_schema_view(
    post=extend_schema(
        tags=["Achievements"],
        summary="Create an Achievements",
    )
)
class AchievementCreateAPIView(generics.CreateAPIView):
    queryset = None
    serializer_class = AchievementSerializer
    permission_classes = [IsAdminUser]


