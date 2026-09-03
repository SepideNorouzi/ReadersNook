from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from .models import Book, Collection, Quote

User = get_user_model()


class BooksAPITests(APITestCase):
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
            title="Dune",
            author="Frank Herbert",
            total_pages=100,
            current_page=0,
        )

    def _auth(self, user):
        self.client.force_authenticate(user=user)

    def test_list_books_allows_anonymous(self):
        response = self.client.get(reverse("books:book-list"))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_create_book_requires_admin(self):
        payload = {
            "title": "Neuromancer",
            "author": "William Gibson",
            "total_pages": 50,
            "current_page": 0,
        }
        self._auth(self.user)
        forbidden = self.client.post(reverse("books:book-create"), payload, format="json")
        self.assertEqual(forbidden.status_code, status.HTTP_403_FORBIDDEN)

        self._auth(self.admin)
        created = self.client.post(reverse("books:book-create"), payload, format="json")
        self.assertEqual(created.status_code, status.HTTP_201_CREATED)

    def test_book_rejects_current_page_greater_than_total(self):
        self._auth(self.admin)
        response = self.client.patch(
            reverse("books:book-update", kwargs={"pk": self.book.pk}),
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
        other_book = Book.objects.create(title="Other", author="A", total_pages=10)
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
        collection = Collection.objects.create(name="Shelf", created_by=self.user)
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
