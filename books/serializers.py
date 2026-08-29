from rest_framework import serializers

from .models import AestheticPhoto, Book, Quote , Achievement , Collection


class QuoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quote
        fields = "__all__"
        read_only_fields = ("id", "created_at", "updated_at", "created_by")

class ShortQuoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quote
        fields = ("id", "book", "text", "page", "favorite" , "created_by")
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

    def validate(self, attrs):
        """Enforce the book_current_page_lte_total_pages database constraint.

        On PATCH only a subset of fields arrives, so fall back to the values
        already stored on the instance before comparing.
        """
        current_page = attrs.get("current_page")
        total_pages = attrs.get("total_pages")

        if self.instance is not None:
            if current_page is None:
                current_page = self.instance.current_page
            if total_pages is None:
                total_pages = self.instance.total_pages

        if current_page is not None and total_pages is not None:
            if current_page > total_pages:
                raise serializers.ValidationError(
                    {
                        "current_page": (
                            "Current page cannot be greater than total pages."
                        )
                    }
                )

        return attrs


class ShortBookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ("id" , "title" , "author" , "cover_url" , "current_page" , "total_pages" , "status")

class AestheticPhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = AestheticPhoto
        fields = ("id", "book", "image_url", "caption" , "order")
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
            "id", "title", "author", "summary", "cover_url",
            "current_page", "total_pages", "status", "rating",
            "created_at", "updated_at", "quotes", "aesthetic_photos",
        )
        read_only_fields = ("id", "created_at", "updated_at")



class CollectionSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Collection
        fields = ["id","name", "description", "books", "created_by" , "created_at", "updated_at"]
        read_only_fields = ["id", "created_by" ,"created_at", "updated_at"]
        extra_kwargs = {
            "description": {"required": False, "allow_blank": True},
            "books":       {"required": False},
        }

    def validate_name(self, value):
        request = self.context.get("request")
        user = getattr(request, "user", None)
        queryset = Collection.objects.filter(created_by=user, name=value)
        if self.instance is not None:
            queryset = queryset.exclude(pk=self.instance.pk)
        if user is not None and queryset.exists():
            raise serializers.ValidationError(
                "You already have a collection with this name."
            )
        return value

    def create(self, validated_data):
        validated_data["created_by"] = self.context["request"].user
        return super().create(validated_data)


class ShortCollectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Collection
        fields = ["id","name", "description"]
        read_only_fields = ("id",)



class CollectionDetailSerializer(serializers.ModelSerializer):
    books = ShortBookSerializer(many=True, read_only=True)

    class Meta:
        model = Collection
        fields = ["id","name", "description", "books", "created_by" , "created_at", "updated_at"]
        read_only_fields = ["id", "created_by" ,"created_at", "updated_at"]


class AchievementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Achievement
        fields = '__all__'
        read_only_fields = ("id",)


class DetailMessageSerializer(serializers.Serializer):
    """Simple ``{"detail": "..."}`` body used by membership endpoints."""

    detail = serializers.CharField()

