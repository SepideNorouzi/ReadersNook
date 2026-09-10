from unittest.mock import patch

from django.contrib.auth import get_user_model
from django.test import SimpleTestCase, override_settings
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from .catalog.dto import BookCard, SearchPage
from .catalog.hardcover.mapping import parse_search_hits
from .models import Book, Collection, Library, Quote, UserBook

User = get_user_model()


@override_settings(SEARCH_BACKEND="local", CATALOG_PROVIDER="local")
class LibraryAPITests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username="reader",
            password="Strong-Test-Password-947!",
            first_name="Jane",
            last_name="Reader",
        )
        self.admin = User.objects.create_superuser(
            username="admin",
            password="Strong-Admin-Password-947!",
        )
        self.book = Book.objects.create(
            external_id="ol-dune",
            title="Dune",
            author="Frank Herbert",
            total_pages=100,
        )
        UserBook.objects.create(library=self.user.library, book=self.book)

    def _auth(self, user):
        self.client.force_authenticate(user=user)

    def test_create_user_creates_library(self):
        self.assertTrue(Library.objects.filter(user=self.user).exists())
        self.assertTrue(Library.objects.filter(user=self.admin).exists())

    def test_library_list_requires_auth_and_returns_own_books(self):
        other = User.objects.create_user(
            username="other",
            password="Strong-Test-Password-947!",
        )
        other_book = Book.objects.create(
            external_id="ol-other",
            title="Other",
            author="A",
            total_pages=10,
        )
        UserBook.objects.create(library=other.library, book=other_book)

        unauthorized = self.client.get(reverse("books:book-list"))
        self.assertEqual(unauthorized.status_code, status.HTTP_401_UNAUTHORIZED)

        self._auth(self.user)
        response = self.client.get(reverse("books:book-list"))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data["books"]), 1)
        self.assertEqual(response.data["books"][0]["book"]["title"], "Dune")
        self.assertEqual(response.data["collections"], [])

    def test_library_includes_own_collections(self):
        other = User.objects.create_user(
            username="other",
            password="Strong-Test-Password-947!",
        )
        Collection.objects.create(name="Not mine", library=other.library)
        collection = Collection.objects.create(
            name="Favorites",
            library=self.user.library,
        )
        collection.books.add(self.book)

        self._auth(self.user)
        response = self.client.get(reverse("books:book-list"))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data["collections"]), 1)
        self.assertEqual(response.data["collections"][0]["name"], "Favorites")
        self.assertEqual(response.data["collections"][0]["books"][0]["title"], "Dune")

    def test_add_book_to_library(self):
        payload = {
            "external_id": "ol-neuromancer",
            "title": "Neuromancer",
            "author": "William Gibson",
            "total_pages": 50,
            "current_page": 0,
        }
        self._auth(self.user)
        created = self.client.post(reverse("books:book-create"), payload, format="json")
        self.assertEqual(created.status_code, status.HTTP_201_CREATED)
        self.assertEqual(created.data["book"]["title"], "Neuromancer")
        self.assertEqual(created.data["book"]["author"], "William Gibson")
        self.assertEqual(created.data["book"]["external_id"], "ol-neuromancer")
        self.assertEqual(created.data["book"]["total_pages"], 50)
        self.assertIn("status", created.data)
        self.assertIn("current_page", created.data)
        self.assertIn("rating", created.data)
        self.assertTrue(
            UserBook.objects.filter(
                library=self.user.library,
                book__external_id="ol-neuromancer",
            ).exists()
        )

        duplicate = self.client.post(reverse("books:book-create"), payload, format="json")
        self.assertEqual(duplicate.status_code, status.HTTP_409_CONFLICT)

    def test_add_existing_book_reuses_catalog_row(self):
        self._auth(self.admin)
        catalog_count = Book.objects.count()
        response = self.client.post(
            reverse("books:book-create"),
            {
                "external_id": "ol-dune",
                "title": "Dune",
                "author": "Frank Herbert",
            },
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Book.objects.count(), catalog_count)
        self.assertTrue(
            UserBook.objects.filter(library=self.admin.library, book=self.book).exists()
        )

    def test_unknown_external_id_without_metadata_is_not_found(self):
        self._auth(self.user)
        response = self.client.post(
            reverse("books:book-create"),
            {"external_id": "ol-new-book"},
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_two_users_can_own_the_same_catalog_book(self):
        other = User.objects.create_user(
            username="other",
            password="Strong-Test-Password-947!",
        )
        self._auth(other)
        response = self.client.post(
            reverse("books:book-create"),
            {
                "external_id": "ol-dune",
                "title": "Dune",
                "author": "Frank Herbert",
                "total_pages": 100,
            },
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Book.objects.filter(external_id="ol-dune").count(), 1)
        self.assertEqual(UserBook.objects.filter(book=self.book).count(), 2)

    def test_library_book_rejects_current_page_greater_than_total(self):
        self._auth(self.user)
        response = self.client.patch(
            reverse("books:library-book-update", kwargs={"book_pk": self.book.pk}),
            {"current_page": 200},
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("current_page", response.data)

    def test_quote_create_and_list_are_scoped_to_user(self):
        other = User.objects.create_user(
            username="other",
            password="Strong-Test-Password-947!",
        )
        Quote.objects.create(
            book=self.book,
            text="Other quote",
            created_by=other,
        )
        self._auth(self.user)
        create_response = self.client.post(
            reverse("books:quote-create", kwargs={"pk": self.book.pk}),
            {"text": "Fear is the mind-killer.", "page": 12},
            format="json",
        )
        self.assertEqual(create_response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(create_response.data["created_by"], self.user.pk)
        self.assertEqual(create_response.data["book"], self.book.pk)

        list_response = self.client.get(
            reverse("books:quote-list", kwargs={"pk": self.book.pk})
        )
        self.assertEqual(list_response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(list_response.data), 1)
        self.assertEqual(list_response.data[0]["text"], "Fear is the mind-killer.")

    def test_quote_update_cannot_reassign_book(self):
        other_book = Book.objects.create(
            external_id="ol-other",
            title="Other",
            author="A",
            total_pages=10,
        )
        quote = Quote.objects.create(
            book=self.book,
            text="Original",
            created_by=self.user,
        )
        self._auth(self.user)
        response = self.client.patch(
            reverse(
                "books:quote-update",
                kwargs={"pk": self.book.pk, "quote_pk": quote.pk},
            ),
            {"text": "Updated", "book": other_book.pk},
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        quote.refresh_from_db()
        self.assertEqual(quote.text, "Updated")
        self.assertEqual(quote.book_id, self.book.pk)

    def test_collection_unique_name_on_create_and_update(self):
        self._auth(self.user)
        first = self.client.post(
            reverse("books:collection-create"),
            {"name": "Favorites"},
            format="json",
        )
        self.assertEqual(first.status_code, status.HTTP_201_CREATED)
        self.assertEqual(first.data["library"], self.user.library.pk)

        duplicate = self.client.post(
            reverse("books:collection-create"),
            {"name": "Favorites"},
            format="json",
        )
        self.assertEqual(duplicate.status_code, status.HTTP_400_BAD_REQUEST)

        second = self.client.post(
            reverse("books:collection-create"),
            {"name": "TBR"},
            format="json",
        )
        self.assertEqual(second.status_code, status.HTTP_201_CREATED)

        rename = self.client.patch(
            reverse("books:collection-update", kwargs={"pk": second.data["id"]}),
            {"name": "Favorites"},
            format="json",
        )
        self.assertEqual(rename.status_code, status.HTTP_400_BAD_REQUEST)

    def test_collection_add_and_remove_book(self):
        self._auth(self.user)
        collection = Collection.objects.create(name="Shelf", library=self.user.library)
        add_url = reverse(
            "books:collection-add-books",
            kwargs={"pk": collection.pk, "book_pk": self.book.pk},
        )

        added = self.client.post(add_url)
        self.assertEqual(added.status_code, status.HTTP_200_OK)
        self.assertTrue(collection.books.filter(pk=self.book.pk).exists())

        again = self.client.post(add_url)
        self.assertEqual(again.status_code, status.HTTP_400_BAD_REQUEST)

        removed = self.client.delete(add_url)
        self.assertEqual(removed.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(collection.books.filter(pk=self.book.pk).exists())


class RegistrationCreatesLibraryTests(APITestCase):
    def test_registration_creates_library(self):
        response = self.client.post(
            reverse("user_module:register"),
            {
                "first_name": "Jane",
                "last_name": "Reader",
                "username": "jane_reader",
                "password": "Strong-Test-Password-947!",
                "password2": "Strong-Test-Password-947!",
            },
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        user = User.objects.get(username="jane_reader")
        self.assertTrue(Library.objects.filter(user=user).exists())


class HardcoverMappingTests(SimpleTestCase):
    def test_parse_typesense_hits_with_ids(self):
        results = {
            "hits": [
                {
                    "document": {
                        "title": "Dune",
                        "author_names": ["Frank Herbert"],
                        "description": "Sand.",
                        "pages": 412,
                    }
                }
            ]
        }
        cards = parse_search_hits(results, ids=[101])
        self.assertEqual(len(cards), 1)
        self.assertEqual(cards[0].external_id, "hc:101")
        self.assertEqual(cards[0].title, "Dune")
        self.assertEqual(cards[0].author, "Frank Herbert")
        self.assertEqual(cards[0].total_pages, 412)


@override_settings(SEARCH_BACKEND="local", CATALOG_PROVIDER="local")
class CatalogSearchAPITests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username="searcher",
            password="Strong-Test-Password-947!",
        )
        self.book = Book.objects.create(
            external_id="hc:101",
            title="Dune",
            author="Frank Herbert",
            total_pages=412,
        )
        UserBook.objects.create(library=self.user.library, book=self.book)

    def test_search_requires_query_and_auth(self):
        url = reverse("books:book-search")
        self.assertEqual(self.client.get(url).status_code, status.HTTP_401_UNAUTHORIZED)
        self.client.force_authenticate(user=self.user)
        self.assertEqual(
            self.client.get(url).status_code,
            status.HTTP_400_BAD_REQUEST,
        )

    def test_local_search_marks_in_library(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.get(
            reverse("books:book-search"),
            {"q": "dune"},
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data["results"]), 1)
        self.assertTrue(response.data["results"][0]["in_library"])
        self.assertEqual(response.data["results"][0]["external_id"], "hc:101")

    @override_settings(SEARCH_BACKEND="hardcover")
    @patch("books.catalog.hardcover.search.HardcoverClient.execute")
    def test_hardcover_search_maps_results(self, execute):
        execute.return_value = {
            "search": {
                "ids": [9],
                "page": 1,
                "per_page": 10,
                "results": {
                    "hits": [
                        {
                            "document": {
                                "title": "Neuromancer",
                                "author_names": ["William Gibson"],
                                "pages": 271,
                            }
                        }
                    ]
                },
            }
        }
        self.client.force_authenticate(user=self.user)
        response = self.client.get(
            reverse("books:book-search"),
            {"q": "neuromancer"},
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["results"][0]["external_id"], "hc:9")
        self.assertFalse(response.data["results"][0]["in_library"])

    @override_settings(CATALOG_PROVIDER="hardcover")
    @patch("books.catalog.hardcover.provider.HardcoverClient.execute")
    def test_add_by_external_id_fetches_from_provider(self, execute):
        execute.return_value = {
            "books_by_pk": {
                "id": 9,
                "title": "Neuromancer",
                "description": "Cyberpunk.",
                "pages": 271,
                "cached_image": {"url": "https://example.com/cover.jpg"},
                "cached_contributors": [{"author": {"name": "William Gibson"}}],
            }
        }
        self.client.force_authenticate(user=self.user)
        response = self.client.post(
            reverse("books:book-create"),
            {"external_id": "hc:9"},
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["book"]["title"], "Neuromancer")
        self.assertEqual(response.data["book"]["author"], "William Gibson")
        self.assertEqual(response.data["book"]["external_id"], "hc:9")
        execute.assert_called_once()
