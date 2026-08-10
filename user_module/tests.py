from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

User = get_user_model()


class AuthenticationAPITests(APITestCase):
    registration_data = {
        "first_name": "Jane",
        "last_name": "Reader",
        "username": "jane_reader",
        "password": "Strong-Test-Password-947!",
    }

    def test_registration_hashes_password(self):
        response = self.client.post(
            reverse("user_module:register"),
            self.registration_data,
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertNotIn("password", response.data)

        user = User.objects.get(username=self.registration_data["username"])
        self.assertNotEqual(user.password, self.registration_data["password"])
        self.assertTrue(user.check_password(self.registration_data["password"]))

    def test_login_and_refresh_return_tokens(self):
        User.objects.create_user(**self.registration_data)

        login_response = self.client.post(
            reverse("user_module:token-obtain-pair"),
            {
                "username": self.registration_data["username"],
                "password": self.registration_data["password"],
            },
            format="json",
        )

        self.assertEqual(login_response.status_code, status.HTTP_200_OK)
        self.assertIn("access", login_response.data)
        self.assertIn("refresh", login_response.data)

        refresh_response = self.client.post(
            reverse("user_module:token-refresh"),
            {"refresh": login_response.data["refresh"]},
            format="json",
        )

        self.assertEqual(refresh_response.status_code, status.HTTP_200_OK)
        self.assertIn("access", refresh_response.data)
        self.assertIn("refresh", refresh_response.data)

    def test_registration_rejects_weak_password(self):
        weak_data = {**self.registration_data, "password": "password"}

        response = self.client.post(
            reverse("user_module:register"),
            weak_data,
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("password", response.data)

    def test_current_user_requires_and_accepts_access_token(self):
        User.objects.create_user(**self.registration_data)
        current_user_url = reverse("user_module:current-user")

        unauthorized_response = self.client.get(current_user_url)
        self.assertEqual(
            unauthorized_response.status_code,
            status.HTTP_401_UNAUTHORIZED,
        )

        login_response = self.client.post(
            reverse("user_module:token-obtain-pair"),
            {
                "username": self.registration_data["username"],
                "password": self.registration_data["password"],
            },
            format="json",
        )
        self.client.credentials(
            HTTP_AUTHORIZATION=f"Bearer {login_response.data['access']}"
        )

        authorized_response = self.client.get(current_user_url)

        self.assertEqual(authorized_response.status_code, status.HTTP_200_OK)
        self.assertEqual(
            authorized_response.data["username"],
            self.registration_data["username"],
        )
