from django.contrib import admin

from .models import AestheticPhoto, Book, Quote


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
