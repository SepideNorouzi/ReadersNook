from rest_framework import serializers

from .models import Book, Quote


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


class BookCreateSerializer(BookSerializer):
    class Meta(BookSerializer.Meta):
        pass


class QuoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quote
        fields = "__all__"
        read_only_fields = ("id", "created_at", "updated_at", "created_by")

class QuoteCreateSerializer(QuoteSerializer):
    class Meta(QuoteSerializer.Meta):
        pass

    def create(self, validated_data):
        validated_data["created_by"] = self.context["request"].user
        return super().create(validated_data)
