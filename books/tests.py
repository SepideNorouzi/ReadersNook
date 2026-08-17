from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from .models import Book

User = get_user_model()


class BookUpdateAPITests(APITestCase):
    def setUp(self):
        self.admin = User.objects.create_superuser(
            username="admin_user",
            password="Strong-Test-Password-947!",
        )
        self.book = Book.objects.create(
            title="Original Title",
            author="Original Author",
            current_page=10,
            total_pages=100,
            status="tbr",
        )
        self.url = reverse("books:book-update", args=[self.book.pk])

    def test_put_replaces_book(self):
        self.client.force_authenticate(user=self.admin)
        response = self.client.put(
            self.url,
            {
                "title": "New Title",
                "author": "New Author",
                "summary": "",
                "cover_url": "",
                "current_page": 50,
                "total_pages": 200,
                "status": "current",
                "rating": 4.5,
            },
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.book.refresh_from_db()
        self.assertEqual(self.book.title, "New Title")
        self.assertEqual(self.book.current_page, 50)
        self.assertEqual(self.book.total_pages, 200)

    def test_patch_updates_single_field(self):
        self.client.force_authenticate(user=self.admin)
        response = self.client.patch(
            self.url, {"current_page": 42}, format="json"
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.book.refresh_from_db()
        self.assertEqual(self.book.current_page, 42)
        self.assertEqual(self.book.title, "Original Title")

    def test_patch_rejects_current_page_over_total_pages(self):
        self.client.force_authenticate(user=self.admin)
        response = self.client.patch(
            self.url, {"current_page": 5000}, format="json"
        )

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("current_page", response.data)
        self.book.refresh_from_db()
        self.assertEqual(self.book.current_page, 10)

    def test_update_requires_admin(self):
        response = self.client.patch(
            self.url, {"current_page": 42}, format="json"
        )
        self.assertIn(
            response.status_code,
            (status.HTTP_401_UNAUTHORIZED, status.HTTP_403_FORBIDDEN),
        )
