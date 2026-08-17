import uuid
from user_module.models import User 
from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models


class BookStatus(models.TextChoices):
    CURRENT = "current", "Currently Reading"
    TBR = "tbr", "To Be Read"
    READ = "read", "Read"


class Book(models.Model):
    title = models.CharField(max_length=255)
    author = models.CharField(max_length=255)
    summary = models.TextField(blank=True)
    cover_url = models.URLField(max_length=500, blank=True)

    current_page = models.PositiveIntegerField(default=0)
    total_pages = models.PositiveIntegerField(default=0)

    status = models.CharField(
        max_length=20,
        choices=BookStatus.choices,
        default=BookStatus.TBR,
        db_index=True,
    )
    rating = models.FloatField(
        default=0,
        validators=[MinValueValidator(0), MaxValueValidator(5)],
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]
        constraints = [
            models.CheckConstraint(
                check=models.Q(current_page__lte=models.F("total_pages")),
                name="book_current_page_lte_total_pages",
            ),
        ]

    def __str__(self):
        return self.title


class Quote(models.Model):
    book = models.ForeignKey(Book, related_name="quotes", on_delete=models.CASCADE)
    text = models.TextField()
    page = models.PositiveIntegerField(null=True, blank=True)
    favorite = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    created_by = models.ForeignKey(User , on_delete=models.CASCADE)

    class Meta:
        ordering = ["created_at"]
        indexes = [models.Index(fields=["book", "favorite"])]

    def __str__(self):
        return self.text[:50]


class AestheticPhoto(models.Model):
    book = models.ForeignKey(
        Book, related_name="aesthetic_images", on_delete=models.CASCADE
    )
    image_url = models.URLField(max_length=500)
    caption = models.CharField(max_length=255, blank=True)
    order = models.PositiveSmallIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["order", "created_at"]

    def __str__(self):
        return self.caption or self.image_url
