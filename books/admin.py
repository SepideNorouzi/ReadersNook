from django.contrib import admin

from .models import AestheticPhoto, Book, Collection, Quote


@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    list_display = ("title", "author", "status", "current_page", "total_pages")
    list_filter = ("status",)
    search_fields = ("title", "author")


@admin.register(Quote)
class QuoteAdmin(admin.ModelAdmin):
    list_display = ("book", "page", "favorite")
    list_filter = ("favorite",)


@admin.register(AestheticPhoto)
class AestheticPhotoAdmin(admin.ModelAdmin):
    list_display = ("book", "caption", "order")


@admin.register(Collection)
class CollectionAdmin(admin.ModelAdmin):
    list_display = ("name", "created_by", "created_at")
    list_filter = ("created_at",)
    search_fields = ("name", "description", "created_by__username")
    filter_horizontal = ("books",)
