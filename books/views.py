from drf_spectacular.utils import (
    OpenApiExample,
    OpenApiParameter,
    OpenApiResponse,
    extend_schema,
    extend_schema_view,
)
from drf_spectacular.types import OpenApiTypes
from rest_framework import generics, status
from rest_framework.permissions import IsAdminUser, IsAuthenticatedOrReadOnly , IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from django.db.models import Prefetch
from django.shortcuts import get_object_or_404
from .models import AestheticPhoto, Book , Quote , Collection, Achievement
from .serializers import (
                           BookSerializer ,
                           BookDetailSerializer,
                           CollectionDetailSerializer ,
                           ShortCollectionSerializer,
                           QuoteSerializer ,
                           QuoteCreateSerializer,
                           AestheticPhotoCreateSerializer,
                           AchievementSerializer,
                           CollectionSerializer,
                           DetailMessageSerializer,

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
    serializer_class = AestheticPhotoCreateSerializer
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
    get=extend_schema(
        tags=["Collections"],
        summary="Retrieve a collection",
    )
)
class CollectionDetailAPIView(generics.RetrieveAPIView):
    serializer_class = CollectionDetailSerializer
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
    """Handle PUT/PATCH (update) and DELETE for a collection owned by the caller.

    Name and description only. To add or remove a book without replacing
    the whole collection, use CollectionAddRemoveBooksAPIView.
    """

    serializer_class = ShortCollectionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Collection.objects.filter(
            created_by=self.request.user
        ).prefetch_related("books")


COLLECTION_MEMBERSHIP_PARAMETERS = [
    OpenApiParameter(
        name="id",
        type=OpenApiTypes.INT,
        location=OpenApiParameter.PATH,
        description="ID of the collection. Must belong to the authenticated user.",
    ),
    OpenApiParameter(
        name="book_pk",
        type=OpenApiTypes.INT,
        location=OpenApiParameter.PATH,
        description="ID of the book to add to or remove from the collection.",
    ),
]


@extend_schema_view(
    post=extend_schema(
        tags=["Collections"],
        operation_id="collections_add_book",
        summary="Add a book to a collection",
        description=(
            "Add an existing book to a collection you own. "
            "The collection id and book id come from the URL; there is no request body. "
            "Books already in the collection are left untouched."
        ),
        parameters=COLLECTION_MEMBERSHIP_PARAMETERS,
        request=None,
        responses={
            200: OpenApiResponse(
                response=DetailMessageSerializer,
                description="Book added to the collection.",
                examples=[
                    OpenApiExample(
                        "Added",
                        value={"detail": "book added successfully"},
                    )
                ],
            ),
            400: OpenApiResponse(
                response=DetailMessageSerializer,
                description="The book is already in the collection.",
                examples=[
                    OpenApiExample(
                        "Duplicate",
                        value={"detail": "This book exists before"},
                    )
                ],
            ),
            401: OpenApiResponse(
                description="Authentication credentials were not provided.",
            ),
            404: OpenApiResponse(
                description="Collection or book not found, or the collection is not yours.",
            ),
        },
    ),
    delete=extend_schema(
        tags=["Collections"],
        operation_id="collections_remove_book",
        summary="Remove a book from a collection",
        description=(
            "Remove a book from a collection you own. "
            "The book record itself is not deleted."
        ),
        parameters=COLLECTION_MEMBERSHIP_PARAMETERS,
        request=None,
        responses={
            204: OpenApiResponse(
                description="Book removed from the collection.",
            ),
            401: OpenApiResponse(
                description="Authentication credentials were not provided.",
            ),
            404: OpenApiResponse(
                response=DetailMessageSerializer,
                description=(
                    "Collection or book not found, the collection is not yours, "
                    "or the book is not in the collection."
                ),
                examples=[
                    OpenApiExample(
                        "Not in collection",
                        value={"detail": "This book is not in the collection."},
                    )
                ],
            ),
        },
    ),
)
class CollectionAddRemoveBooksAPIView(APIView):
    """POST adds a book to a collection; DELETE removes it."""

    permission_classes = [IsAuthenticated]

    def _get_owned_collection(self, request, pk):
        return get_object_or_404(Collection, pk=pk, created_by=request.user)

    def post(self, request, pk, book_pk):
        collection = self._get_owned_collection(request, pk)
        book = get_object_or_404(Book, pk=book_pk)

        if collection.books.filter(pk=book_pk).exists():
            return Response(
                {"detail": "This book exists before"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        collection.books.add(book)
        return Response(
            {"detail": "book added successfully"},
            status=status.HTTP_200_OK,
        )

    def delete(self, request, pk, book_pk):
        collection = self._get_owned_collection(request, pk)
        book = get_object_or_404(Book, pk=book_pk)

        if not collection.books.filter(pk=book.pk).exists():
            return Response(
                {"detail": "This book is not in the collection."},
                status=status.HTTP_404_NOT_FOUND,
            )

        collection.books.remove(book)
        return Response(status=status.HTTP_204_NO_CONTENT)




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
    queryset = Achievement.objects.all()
    serializer_class = AchievementSerializer
    permission_classes = [IsAdminUser]


