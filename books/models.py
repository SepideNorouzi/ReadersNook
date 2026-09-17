from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models

from user_module.models import User


# ---------------------------------------------------------------------------
# Choices
# ---------------------------------------------------------------------------


class ReadingStatus(models.TextChoices):
    CURRENT = "current", "Currently Reading"
    TBR = "tbr", "To Be Read"
    READ = "read", "Read"


# ---------------------------------------------------------------------------
# Catalog
# ---------------------------------------------------------------------------


class Book(models.Model):
    """Shared book metadata that any library can reference."""

    external_id = models.CharField(max_length=50, unique=True)
    title = models.CharField(max_length=255)
    author = models.CharField(max_length=255)
    genres = models.JSONField(default=list, blank=True)
    summary = models.TextField(blank=True)
    cover_url = models.URLField(max_length=500, blank=True)
    total_pages = models.PositiveIntegerField(default=0)
    rating = models.FloatField(
        null=True,
        blank=True,
        validators=[MinValueValidator(0.0), MaxValueValidator(5.0)],
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.title


class Quote(models.Model):
    book = models.ForeignKey(Book, related_name="quotes", on_delete=models.CASCADE)
    text = models.TextField()
    page = models.PositiveIntegerField(null=True, blank=True)
    favorite = models.BooleanField(default=False)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["created_at"]
        indexes = [models.Index(fields=["book", "favorite"])]

    def __str__(self):
        return self.text[:50]


class AestheticPhoto(models.Model):
    book = models.ForeignKey(
        Book, related_name="aesthetic_photos", on_delete=models.CASCADE
    )
    image_url = models.URLField(max_length=500)
    caption = models.CharField(max_length=255, blank=True)
    order = models.PositiveSmallIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["order", "created_at"]

    def __str__(self):
        return self.caption or self.image_url


# ---------------------------------------------------------------------------
# Library
# ---------------------------------------------------------------------------


class Library(models.Model):
    """A user's personal collection of books. Created automatically on signup."""

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="library")
    books = models.ManyToManyField(
        Book,
        through="UserBook",
        related_name="libraries",
        blank=True,
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.username}'s Library"

    @classmethod
    def for_user(cls, user):
        library, _ = cls.objects.get_or_create(user=user)
        return library


class UserBook(models.Model):
    """A catalog book inside one library, with that user's reading progress."""

    library = models.ForeignKey(
        Library, on_delete=models.CASCADE, related_name="user_books"
    )
    book = models.ForeignKey(
        Book, on_delete=models.CASCADE, related_name="user_books"
    )
    status = models.CharField(
        max_length=20,
        choices=ReadingStatus.choices,
        default=ReadingStatus.TBR,
        db_index=True,
    )
    current_page = models.PositiveIntegerField(default=0)

    added_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["library", "book"],
                name="uq_userbook_library_book",
            ),
        ]

    def __str__(self):
        return f"{self.library.user.username} - {self.book.title}"


class Collection(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    books = models.ManyToManyField(Book, related_name="collections", blank=True)
    library = models.ForeignKey(
        Library, on_delete=models.CASCADE, related_name="collections"
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["name"]
        constraints = [
            models.UniqueConstraint(
                fields=["library", "name"],
                name="uq_collection_library_name",
            ),
        ]

    def __str__(self):
        return self.name


# ---------------------------------------------------------------------------
# Achievements
# ---------------------------------------------------------------------------


class Achievement(models.Model):
    class Category(models.TextChoices):
        READING = "reading", "Reading"
        WRITING = "writing", "Writing"
        POPULARITY = "popularity", "Popularity"

    code = models.SlugField(unique=True)
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=255)
    category = models.CharField(max_length=40, choices=Category.choices)
    threshold = models.PositiveIntegerField()

    class Meta:
        ordering = ["category", "threshold"]

    def __str__(self):
        return self.name


class UserAchievement(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="achievements")
    achievement = models.ForeignKey(Achievement, on_delete=models.CASCADE)
    unlocked_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["user", "achievement"],
                name="uq_user_achievement",
            ),
        ]

    def __str__(self):
        return f"{self.user.username} - {self.achievement.code}"
