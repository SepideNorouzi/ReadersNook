from django.contrib import admin

from .models import AestheticPhoto, Book, Collection, Library, Quote, UserBook


@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    list_display = ("title", "author", "external_id", "total_pages")
    search_fields = ("title", "author", "external_id")


@admin.register(Quote)
class QuoteAdmin(admin.ModelAdmin):
    list_display = ("book", "page", "favorite")
    list_filter = ("favorite",)


@admin.register(AestheticPhoto)
class AestheticPhotoAdmin(admin.ModelAdmin):
    list_display = ("book", "caption", "order")


@admin.register(Library)
class LibraryAdmin(admin.ModelAdmin):
    list_display = ("user", "created_at")
    search_fields = ("user__username",)


@admin.register(UserBook)
class UserBookAdmin(admin.ModelAdmin):
    list_display = ("library", "book", "status", "current_page", "rating")
    list_filter = ("status",)
    search_fields = ("book__title", "library__user__username")


@admin.register(Collection)
class CollectionAdmin(admin.ModelAdmin):
    list_display = ("name", "library", "created_at")
    list_filter = ("created_at",)
    search_fields = ("name", "description", "library__user__username")
    filter_horizontal = ("books",)
