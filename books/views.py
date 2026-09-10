from django.db.models import Prefetch
from django.shortcuts import get_object_or_404
from drf_spectacular.types import OpenApiTypes
from drf_spectacular.utils import (
    OpenApiExample,
    OpenApiParameter,
    OpenApiResponse,
    extend_schema,
    extend_schema_view,
)
from rest_framework import generics, status
from rest_framework.permissions import (
    IsAdminUser,
    IsAuthenticated,
    IsAuthenticatedOrReadOnly,
)
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import (
    Achievement,
    AestheticPhoto,
    Book,
    Collection,
    Library,
    Quote,
    UserBook,
)
from .serializers import (
    AchievementSerializer,
    AddLibraryBookSerializer,
    AestheticPhotoCreateSerializer,
    BookDetailSerializer,
    BookSerializer,
    CollectionDetailSerializer,
    CollectionSerializer,
    DetailMessageSerializer,
    QuoteCreateSerializer,
    QuoteSerializer,
    ShortCollectionSerializer,
    LibrarySerializer,
    UserBookSerializer,
    BookSearchResponseSerializer,
    CatalogBookDetailSerializer,
)

from .catalog import get_search
from .catalog.exceptions import CatalogError
from .catalog.ingest import get_book_card, resolve_book
from .services import _library_books_qs, _library_collections_qs, _user_library


def _catalog_error_response(exc: CatalogError) -> Response:
    response = Response({"detail": exc.detail}, status=exc.status_code)
    retry_after = getattr(exc, "retry_after", None)
    if retry_after:
        response["Retry-After"] = str(retry_after)
    return response


# ________________________________________________
# Search
# ________________________________________________

@extend_schema(
    tags=["Search"],
    summary="Search books",
    description=(
        "Search the catalog. Prototype uses Hardcover; "
        "the response shape stays the same when search becomes local."
    ),
    parameters=[
        OpenApiParameter(
            name="q",
            type=OpenApiTypes.STR,
            location=OpenApiParameter.QUERY,
            required=True,
            description="Search query.",
        ),
        OpenApiParameter(
            name="page",
            type=OpenApiTypes.INT,
            location=OpenApiParameter.QUERY,
            required=False,
        ),
        OpenApiParameter(
            name="per_page",
            type=OpenApiTypes.INT,
            location=OpenApiParameter.QUERY,
            required=False,
        ),
    ],
    responses={200: BookSearchResponseSerializer},
)
class BookSearchAPIView(APIView):
    permission_classes = [IsAuthenticated]


    def get(self, request):
        query = (request.query_params.get("q") or "").strip()
        if not query:
            return Response(
                {"q": "This field is required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            page = max(1, int(request.query_params.get("page") or 1))
            per_page = int(request.query_params.get("per_page") or 10)
        except (TypeError, ValueError):
            return Response(
                {"detail": "page and per_page must be integers."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        per_page = min(max(per_page, 1), 25)

        try:
            payload = get_search().search(query, page, per_page)
        except CatalogError as exc:
            return _catalog_error_response(exc)

        owned = set(
            UserBook.objects.filter(
                library=_user_library(request.user)
            ).values_list("book__external_id", flat=True)
        )
        for card in payload.results:
            card.in_library = card.external_id in owned

        return Response(payload.to_dict(), status=status.HTTP_200_OK)


# ________________________________________________
# Book detail api view by external_id (e.g. hc:312460)
# ________________________________________________

@extend_schema(
    tags=["Search"],
    summary="Retrieve a catalog book",
    description=(
        "Look up by external_id (e.g. hc:312460). "
        "Uses our catalog when the book was already ingested; "
        "otherwise fetches from the book provider. Does not add it to the library."
    ),
    responses={200: CatalogBookDetailSerializer, 404: DetailMessageSerializer},
)
class CatalogBookDetailAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, external_id):
        try:
            book, card = get_book_card(external_id)
        except CatalogError as exc:
            return _catalog_error_response(exc)

        user_book = None
        if book is not None:
            user_book = (
                UserBook.objects.filter(
                    library=_user_library(request.user),
                    book=book,
                )
                .select_related("book")
                .first()
            )
        card.in_library = user_book is not None

        payload = card.to_dict()
        payload["id"] = book.pk if book is not None else None
        payload["user_book"] = (
            UserBookSerializer(user_book, context={"request": request}).data
            if user_book
            else None
        )
        return Response(payload, status=status.HTTP_200_OK)


# _______________________________________________
# Add a book to the library and add it to the database if it doesn't exist yet. (POST /library/add/)
# _______________________________________________


class BookCreateAPIView(APIView):
    permission_classes = [IsAuthenticated]

    @extend_schema(
        tags=["Library"],
        summary="Add a book to my library",
        description=(
            "Look up the catalog book by external_id. "
            "If it already exists, add it to the caller's library. "
            "If it does not, create the catalog book first, then add it."
        ),
        request=AddLibraryBookSerializer,
        responses={
            201: UserBookSerializer,
            409: DetailMessageSerializer,
        },
    )
    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

    def create(self, request, *args, **kwargs):
        serializer = AddLibraryBookSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data

        try:
            book = resolve_book(data)
        except CatalogError as exc:
            return _catalog_error_response(exc)

        # Reading progress lives on UserBook, not on the shared catalog Book.
        user_book, created = UserBook.objects.get_or_create(
            library=_user_library(request.user),
            book=book,
            defaults={
                "status": data["status"],
                "current_page": data["current_page"],
                "rating": data["rating"],
            },
        )

        if not created:
            return Response(
                {"detail": "This book is already in your library."},
                status=status.HTTP_409_CONFLICT,
            )

        return Response(
            UserBookSerializer(user_book, context={"request": request}).data,
            status=status.HTTP_201_CREATED,
        )


# _______________________________________________
# Retrieve the authenticated user's library
# _______________________________________________
@extend_schema_view(
    get=extend_schema(
        tags=["Library"],
        summary="Retrieve my library",
        description="Returns the authenticated user's books and collections.",
    )
)
class BookListAPIView(generics.RetrieveAPIView):
    serializer_class = LibrarySerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return get_object_or_404(
            Library.objects.prefetch_related(
                Prefetch("user_books", queryset=_library_books_qs(self.request.user)),
                Prefetch(
                    "collections",
                    queryset=_library_collections_qs(self.request.user),
                ),
            ),
            user=self.request.user,
        )


@extend_schema_view(
    get=extend_schema(
        tags=["Library"],
        summary="Retrieve a library book",
    ),
)
class LibraryBookDetailAPIView(generics.RetrieveAPIView):
    serializer_class = UserBookSerializer
    permission_classes = [IsAuthenticated]
    lookup_url_kwarg = "book_pk"
    lookup_field = "book_id"

    def get_queryset(self):
        return _library_books_qs(self.request.user)




class LibraryBookDeleteAPIView(generics.DestroyAPIView):
    serializer_class = UserBookSerializer
    permission_classes = [IsAuthenticated]
    lookup_url_kwarg = "book_pk"
    lookup_field = "book_id"

    def perform_destroy(self, instance):
        book = instance.book
        library = instance.library
        instance.delete()
        # Keep shelves in sync: removing from the library also unshelves it.
        for collection in library.collections.all():
            collection.books.remove(book)


# --- Catalog books ---


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
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    permission_classes = [IsAdminUser]


# --- Quotes ---


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
        return Quote.objects.filter(
            created_by=self.request.user,
            book_id=self.kwargs["pk"],
        )


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
            created_by=self.request.user,
            book_id=self.kwargs["pk"],
        )


# --- Aesthetic photos ---


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


# --- Collections ---


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
        return _library_collections_qs(self.request.user)


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
        return _library_collections_qs(self.request.user)


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
    """Name and description only. Membership changes use CollectionAddRemoveBooksAPIView."""

    serializer_class = ShortCollectionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return _library_collections_qs(self.request.user)


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
    permission_classes = [IsAuthenticated]

    def _get_owned_collection(self, request, pk):
        return get_object_or_404(
            Collection, pk=pk, library=_user_library(request.user)
        )

    def post(self, request, pk, book_pk):
        collection = self._get_owned_collection(request, pk)
        book = get_object_or_404(Book, pk=book_pk)

        if collection.books.filter(pk=book_pk).exists():
            return Response(
                {"detail": "This book exists before"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Shelving a book implies it belongs in this user's library too.
        UserBook.objects.get_or_create(library=collection.library, book=book)
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


# --- Achievements ---


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
