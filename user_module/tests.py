from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from books.models import Library

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
            {**self.registration_data, "password2": self.registration_data["password"]},
            format="json",
        )

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertNotIn("password", response.data)

        user = User.objects.get(username=self.registration_data["username"])
        self.assertNotEqual(user.password, self.registration_data["password"])
        self.assertTrue(user.check_password(self.registration_data["password"]))
        self.assertTrue(Library.objects.filter(user=user).exists())

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
        weak_data = {
            **self.registration_data,
            "password": "password",
            "password2": "password",
        }

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


class ProfileAPITests(APITestCase):
    def setUp(self):
        self.password = "Strong-Test-Password-947!"
        self.user = User.objects.create_user(
            username="jane_reader",
            password=self.password,
            first_name="Jane",
            last_name="Reader",
        )
        self.client.force_authenticate(user=self.user)

    def test_update_username_and_names(self):
        response = self.client.patch(
            reverse("user_module:current-user"),
            {"username": "jane_updated", "first_name": "Janet"},
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["username"], "jane_updated")
        self.assertEqual(response.data["first_name"], "Janet")
        self.assertEqual(response.data["last_name"], "Reader")
        self.user.refresh_from_db()
        self.assertEqual(self.user.username, "jane_updated")

    def test_update_username_rejects_taken_name(self):
        User.objects.create_user(username="taken", password=self.password)
        response = self.client.patch(
            reverse("user_module:current-user"),
            {"username": "taken"},
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("username", response.data)

    def test_change_password(self):
        new_password = "Even-Stronger-Password-258!"
        response = self.client.post(
            reverse("user_module:change-password"),
            {
                "current_password": self.password,
                "new_password": new_password,
                "new_password2": new_password,
            },
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.user.refresh_from_db()
        self.assertTrue(self.user.check_password(new_password))
        self.assertFalse(self.user.check_password(self.password))

    def test_change_password_rejects_wrong_current(self):
        response = self.client.post(
            reverse("user_module:change-password"),
            {
                "current_password": "not-the-password",
                "new_password": "Even-Stronger-Password-258!",
                "new_password2": "Even-Stronger-Password-258!",
            },
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("current_password", response.data)

    def test_change_password_rejects_mismatch_and_weak(self):
        mismatch = self.client.post(
            reverse("user_module:change-password"),
            {
                "current_password": self.password,
                "new_password": "Even-Stronger-Password-258!",
                "new_password2": "Different-Password-258!",
            },
            format="json",
        )
        self.assertEqual(mismatch.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("new_password2", mismatch.data)

        weak = self.client.post(
            reverse("user_module:change-password"),
            {
                "current_password": self.password,
                "new_password": "password",
                "new_password2": "password",
            },
            format="json",
        )
        self.assertEqual(weak.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("new_password", weak.data)

    def test_profile_and_password_require_auth(self):
        self.client.force_authenticate(user=None)
        self.assertEqual(
            self.client.patch(
                reverse("user_module:current-user"),
                {"username": "x"},
                format="json",
            ).status_code,
            status.HTTP_401_UNAUTHORIZED,
        )
        self.assertEqual(
            self.client.post(
                reverse("user_module:change-password"),
                {
                    "current_password": self.password,
                    "new_password": "Even-Stronger-Password-258!",
                    "new_password2": "Even-Stronger-Password-258!",
                },
                format="json",
            ).status_code,
            status.HTTP_401_UNAUTHORIZED,
        )


class AvatarAPITests(APITestCase):
    def setUp(self):
        self.password = "Strong-Test-Password-947!"
        self.user = User.objects.create_user(
            username="avatar_user",
            password=self.password,
            first_name="A",
            last_name="V",
        )
        self.client.force_authenticate(user=self.user)

    def test_profile_avatar_defaults_to_null(self):
        response = self.client.get(reverse("user_module:current-user"))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("avatar", response.data)
        self.assertIsNone(response.data["avatar"])

    def test_set_avatar(self):
        url = "https://example.com/avatars/me.png"
        response = self.client.patch(
            reverse("user_module:current-user"),
            {"avatar": url},
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK, response.data)
        self.assertEqual(response.data["avatar"], url)
        self.user.refresh_from_db()
        self.assertEqual(self.user.avatar, url)

    def test_avatar_rejects_too_long(self):
        response = self.client.patch(
            reverse("user_module:current-user"),
            {"avatar": "x" * 300},
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("avatar", response.data)
