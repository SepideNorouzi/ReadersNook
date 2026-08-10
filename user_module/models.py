from django.contrib.auth.models import AbstractUser, UserManager


class UsernameUserManager(UserManager):
    """Create users without accepting or injecting an email address."""

    use_in_migrations = True

    def _create_user(self, username, password, **extra_fields):
        if not username:
            raise ValueError("The username must be set.")

        username = self.model.normalize_username(username)
        user = self.model(username=username, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, username, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", False)
        extra_fields.setdefault("is_superuser", False)
        return self._create_user(username, password, **extra_fields)

    def create_superuser(self, username, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")

        return self._create_user(username, password, **extra_fields)


class User(AbstractUser):
    """Username-based user model without an email field."""

    email = None

    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = []
    objects = UsernameUserManager()

    def __str__(self):
        return self.username
