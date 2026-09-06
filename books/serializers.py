from django.db import IntegrityError
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


class QuoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quote
        fields = "__all__"
        read_only_fields = ("id", "created_at", "updated_at", "created_by", "book")


class ShortQuoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quote
        fields = ("id", "book", "text", "page", "favorite", "created_by")
        read_only_fields = ("id", "created_at", "updated_at", "created_by")


class QuoteCreateSerializer(QuoteSerializer):
    class Meta(QuoteSerializer.Meta):
        read_only_fields = QuoteSerializer.Meta.read_only_fields + ("book",)

    def create(self, validated_data):
        validated_data["created_by"] = self.context["request"].user
        return super().create(validated_data)


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
        model = Book
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
        read_only_fields = ("id", "created_at", "updated_at")


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
        current_page = attrs.get("current_page")
        if self.instance is not None:
            if current_page is None:
                current_page = self.instance.current_page
            total_pages = self.instance.book.total_pages
            if current_page is not None and current_page > total_pages:
                raise serializers.ValidationError(
                    {
                        "current_page": (
                            "Current page cannot be greater than total pages."
                        )
                    }
                )
        return attrs


class AddLibraryBookSerializer(serializers.Serializer):
    # Book fields
    external_id = serializers.CharField(max_length=50)
    title = serializers.CharField(max_length=255)
    author = serializers.CharField(max_length=255)
    summary = serializers.CharField(required=False, allow_blank=True, default="")
    cover_url = serializers.URLField(
        max_length=500, required=False, allow_blank=True, default=""
    )
    total_pages = serializers.IntegerField(
        min_value=0, required=False, default=0
    )

    # UserBook fields
    status = serializers.ChoiceField(
        choices=ReadingStatus.choices,
        default=ReadingStatus.TBR,
    )
    current_page = serializers.IntegerField(
        min_value=0, required=False, default=0
    )
    rating = serializers.FloatField(
        min_value=0,
        max_value=5,
        required=False,
        allow_null=True,
        default=None,
    )

    def validate_current_page(self, value):
        """validating current page to ensure it does not exceed total pages"""
        total_pages = self.initial_data.get("total_pages")
        if total_pages and value > int(total_pages):
            raise serializers.ValidationError(
                "Current page cannot exceed total pages."
            )
        return value


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


class AchievementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Achievement
        fields = "__all__"
        read_only_fields = ("id",)


class DetailMessageSerializer(serializers.Serializer):
    detail = serializers.CharField()
