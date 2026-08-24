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
        null=True,
        blank=True,
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


class Collection(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    books = models.ManyToManyField(Book, related_name="collections" , blank=True)
    created_by = models.ForeignKey(User , on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["name"]
        constraints = [
            models.UniqueConstraint(
                fields=["created_by", "name"],
                name="uq_collection_created_by_name",
            ),
        ]

    def __str__(self):
        return self.name


class Achievement(models.Model):
    class Category(models.TextChoices):
        READING   = "reading", "Reading"     
        WRITING   = "writing", "Writing"      
        POPULARITY = "popularity", "Popularity" 

    code = models.SlugField(unique=True)
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=255)
    category = models.CharField(max_length=40 , choices=Category.choices)
    threshold = models.PositiveIntegerField()

    class Meta:
        ordering = ["category", "threshold"]


class UserAchievement(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="achievements")
    achievement = models.ForeignKey(Achievement, on_delete=models.CASCADE)
    unlocked_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["user", "achievement"],
                name="uq_user_achievement"
            ),
        ]