from django.contrib import admin

from .models import (
    Achievement,
    AestheticPhoto,
    Book,
    Collection,
    Library,
    Quote,
    UserAchievement,
    UserBook,
)


@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    list_display = ("title", "author", "external_id", "total_pages", "rating")
    search_fields = ("title", "author", "external_id")


@admin.register(Quote)
class QuoteAdmin(admin.ModelAdmin):
    list_display = ("book", "page", "favorite", "created_by")
    list_filter = ("favorite",)
    search_fields = ("text", "book__title", "created_by__username")


@admin.register(AestheticPhoto)
class AestheticPhotoAdmin(admin.ModelAdmin):
    list_display = ("book", "caption", "order")
    search_fields = ("caption", "book__title")


@admin.register(Library)
class LibraryAdmin(admin.ModelAdmin):
    list_display = ("user", "created_at")
    search_fields = ("user__username",)


@admin.register(UserBook)
class UserBookAdmin(admin.ModelAdmin):
    list_display = ("library", "book", "status", "current_page", "added_at")
    list_filter = ("status",)
    search_fields = ("book__title", "library__user__username")


@admin.register(Collection)
class CollectionAdmin(admin.ModelAdmin):
    list_display = ("name", "library", "created_at")
    list_filter = ("created_at",)
    search_fields = ("name", "description", "library__user__username")
    filter_horizontal = ("books",)


@admin.register(Achievement)
class AchievementAdmin(admin.ModelAdmin):
    list_display = ("code", "name", "category", "threshold")
    list_filter = ("category",)
    search_fields = ("code", "name")


@admin.register(UserAchievement)
class UserAchievementAdmin(admin.ModelAdmin):
    list_display = ("user", "achievement", "unlocked_at")
    search_fields = ("user__username", "achievement__code")
