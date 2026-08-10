from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import User


@admin.register(User)
class CustomUserAdmin(UserAdmin):
    fieldsets = tuple(
        fieldset
        for fieldset in UserAdmin.fieldsets
        if fieldset[0] != "Personal info"
    ) + (("Personal info", {"fields": ("first_name", "last_name")}),)

    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": (
                    "username",
                    "first_name",
                    "last_name",
                    "password1",
                    "password2",
                ),
            },
        ),
    )
    list_display = ("username", "first_name", "last_name", "is_staff")
