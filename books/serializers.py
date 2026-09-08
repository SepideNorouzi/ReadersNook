from rest_framework import serializers

from .models import (
    Achievement,
    AestheticPhoto,
    Book,
    Collection,
    Library,
    Quote,
    ReadingStatus,
    UserBook,
)


# --- Quotes ---


class QuoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quote
        fields = "__all__"
        # book is set from the URL; created_by is set from the request user
        read_only_fields = ("id", "created_at", "updated_at", "created_by", "book")


class ShortQuoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quote
        fields = ("id", "book", "text", "page", "favorite", "created_by")
        read_only_fields = ("id", "created_at", "updated_at", "created_by")


class QuoteCreateSerializer(QuoteSerializer):
    def create(self, validated_data):
        validated_data["created_by"] = self.context["request"].user
        return super().create(validated_data)


# --- Catalog books ---


class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = "__all__"
        read_only_fields = ("id", "created_at", "updated_at")


class ShortBookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ("id", "external_id", "title", "author", "cover_url", "total_pages")


class AestheticPhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = AestheticPhoto
        fields = ("id", "book", "image_url", "caption", "order")
        read_only_fields = ("id", "created_at")


class AestheticPhotoCreateSerializer(AestheticPhotoSerializer):
    class Meta(AestheticPhotoSerializer.Meta):
        read_only_fields = AestheticPhotoSerializer.Meta.read_only_fields + ("book",)


class BookDetailSerializer(BookSerializer):
    quotes = ShortQuoteSerializer(many=True, read_only=True)
    aesthetic_photos = AestheticPhotoSerializer(many=True, read_only=True)

    class Meta(BookSerializer.Meta):
        fields = (
            "id",
            "external_id",
            "title",
            "author",
            "summary",
            "cover_url",
            "total_pages",
            "created_at",
            "updated_at",
            "quotes",
            "aesthetic_photos",
        )


class AddLibraryBookSerializer(serializers.Serializer):
    """Payload for adding a book to the caller's library.

    external_id comes from the upstream book API. Catalog fields create the
    Book row when it is not in our database yet.
    """
    
    external_id = serializers.CharField(max_length=50)
    title = serializers.CharField(max_length=255)
    author = serializers.CharField(max_length=255)
    summary = serializers.CharField(required=False, allow_blank=True, default="")
    cover_url = serializers.URLField(
        max_length=500, required=False, allow_blank=True, default=""
    )
    total_pages = serializers.IntegerField(min_value=0, required=False, default=0)

    status = serializers.ChoiceField(
        choices=ReadingStatus.choices,
        default=ReadingStatus.TBR,
    )
    current_page = serializers.IntegerField(min_value=0, required=False, default=0)
    rating = serializers.FloatField(
        min_value=0,
        max_value=5,
        required=False,
        allow_null=True,
        default=None,
    )

    def validate_current_page(self, value):
        total_pages = self.initial_data.get("total_pages")
        if total_pages and value > int(total_pages):
            raise serializers.ValidationError(
                "Current page cannot exceed total pages."
            )
        return value


# --- Collections ---


class CollectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Collection
        fields = [
            "id",
            "name",
            "description",
            "books",
            "library",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "library", "created_at", "updated_at"]
        extra_kwargs = {
            "description": {"required": False, "allow_blank": True},
            "books": {"required": False},
        }

    def validate_name(self, value):
        # Names are unique per library, not globally.
        request = self.context.get("request")
        user = getattr(request, "user", None)
        if user is None or not getattr(user, "is_authenticated", False):
            return value

        library = Library.for_user(user)
        queryset = Collection.objects.filter(library=library, name=value)
        if self.instance is not None:
            queryset = queryset.exclude(pk=self.instance.pk)
        if queryset.exists():
            raise serializers.ValidationError(
                "You already have a collection with this name."
            )
        return value

    def create(self, validated_data):
        validated_data["library"] = Library.for_user(self.context["request"].user)
        return super().create(validated_data)


class ShortCollectionSerializer(CollectionSerializer):
    class Meta:
        model = Collection
        fields = ["id", "name", "description"]
        read_only_fields = ("id",)
        extra_kwargs = {
            "description": {"required": False, "allow_blank": True},
        }


class CollectionDetailSerializer(serializers.ModelSerializer):
    books = ShortBookSerializer(many=True, read_only=True)

    class Meta:
        model = Collection
        fields = [
            "id",
            "name",
            "description",
            "books",
            "library",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "library", "created_at", "updated_at"]



# --- Library (per-user copies of catalog books) ---


class UserBookSerializer(serializers.ModelSerializer):
    book = BookSerializer(read_only=True)

    class Meta:
        model = UserBook
        fields = (
            "id",
            "book",
            "status",
            "current_page",
            "rating",
            "added_at",
            "updated_at",
        )
        read_only_fields = ("id", "book", "added_at", "updated_at")

    def validate(self, attrs):
        # PATCH may omit current_page; compare against the stored book length.
        if self.instance is None:
            return attrs

        current_page = attrs.get("current_page", self.instance.current_page)
        if current_page > self.instance.book.total_pages:
            raise serializers.ValidationError(
                {"current_page": "Current page cannot be greater than total pages."}
            )
        return attrs


class LibrarySerializer(serializers.ModelSerializer):
    """Full library payload: the user's books and their collections."""

    books = UserBookSerializer(source="user_books", many=True, read_only=True)
    collections = CollectionDetailSerializer(many=True, read_only=True)

    class Meta:
        model = Library
        fields = ("id", "books", "collections", "created_at", "updated_at")
        read_only_fields = fields


class AchievementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Achievement
        fields = "__all__"
        read_only_fields = ("id",)


class DetailMessageSerializer(serializers.Serializer):
    """Simple ``{"detail": "..."}`` body used in OpenAPI responses."""

    detail = serializers.CharField()
