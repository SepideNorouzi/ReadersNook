import django.core.validators
import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


def fill_external_ids(apps, schema_editor):
    Book = apps.get_model("books", "Book")
    for book in Book.objects.all():
        book.external_id = f"local-{book.pk}"
        book.save(update_fields=["external_id"])


def create_libraries(apps, schema_editor):
    User = apps.get_model("user_module", "User")
    Library = apps.get_model("books", "Library")
    for user in User.objects.all():
        Library.objects.get_or_create(user=user)


def assign_collection_libraries(apps, schema_editor):
    Collection = apps.get_model("books", "Collection")
    Library = apps.get_model("books", "Library")
    for collection in Collection.objects.all():
        library, _ = Library.objects.get_or_create(user_id=collection.created_by_id)
        collection.library = library
        collection.save(update_fields=["library"])


class Migration(migrations.Migration):

    dependencies = [
        ("books", "0005_collection"),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.RemoveConstraint(
            model_name="book",
            name="book_current_page_lte_total_pages",
        ),
        migrations.RemoveField(
            model_name="book",
            name="current_page",
        ),
        migrations.RemoveField(
            model_name="book",
            name="rating",
        ),
        migrations.RemoveField(
            model_name="book",
            name="status",
        ),
        migrations.AddField(
            model_name="book",
            name="external_id",
            field=models.CharField(blank=True, db_index=True, max_length=50, null=True),
        ),
        migrations.RunPython(fill_external_ids, migrations.RunPython.noop),
        migrations.AlterField(
            model_name="book",
            name="external_id",
            field=models.CharField(db_index=True, max_length=50, unique=True),
        ),
        migrations.CreateModel(
            name="Library",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                (
                    "user",
                    models.OneToOneField(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="library",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
        migrations.RunPython(create_libraries, migrations.RunPython.noop),
        migrations.AddField(
            model_name="collection",
            name="library",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="collections",
                to="books.library",
            ),
        ),
        migrations.RunPython(assign_collection_libraries, migrations.RunPython.noop),
        migrations.RemoveConstraint(
            model_name="collection",
            name="uq_collection_created_by_name",
        ),
        migrations.RemoveField(
            model_name="collection",
            name="created_by",
        ),
        migrations.AlterField(
            model_name="collection",
            name="library",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="collections",
                to="books.library",
            ),
        ),
        migrations.AddConstraint(
            model_name="collection",
            constraint=models.UniqueConstraint(
                fields=("library", "name"),
                name="uq_collection_library_name",
            ),
        ),
        migrations.CreateModel(
            name="UserBook",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "status",
                    models.CharField(
                        choices=[
                            ("current", "Currently Reading"),
                            ("tbr", "To Be Read"),
                            ("read", "Read"),
                        ],
                        db_index=True,
                        default="tbr",
                        max_length=20,
                    ),
                ),
                ("current_page", models.PositiveIntegerField(default=0)),
                (
                    "rating",
                    models.FloatField(
                        blank=True,
                        null=True,
                        validators=[
                            django.core.validators.MinValueValidator(0),
                            django.core.validators.MaxValueValidator(5),
                        ],
                    ),
                ),
                ("added_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                (
                    "book",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="user_books",
                        to="books.book",
                    ),
                ),
                (
                    "library",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="user_books",
                        to="books.library",
                    ),
                ),
            ],
        ),
        migrations.AddField(
            model_name="library",
            name="books",
            field=models.ManyToManyField(
                blank=True,
                related_name="libraries",
                through="books.UserBook",
                to="books.book",
            ),
        ),
        migrations.AddConstraint(
            model_name="userbook",
            constraint=models.UniqueConstraint(
                fields=("library", "book"),
                name="uq_userbook_library_book",
            ),
        ),
    ]
