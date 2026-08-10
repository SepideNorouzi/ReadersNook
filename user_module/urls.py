from django.urls import path

from .views import (
    CurrentUserView,
    UserRegistrationView,
    UserTokenObtainPairView,
    UserTokenRefreshView,
)

app_name = "user_module"

urlpatterns = [
    path("register/", UserRegistrationView.as_view(), name="register"),
    path("token/", UserTokenObtainPairView.as_view(), name="token-obtain-pair"),
    path("token/refresh/", UserTokenRefreshView.as_view(), name="token-refresh"),
    path("me/", CurrentUserView.as_view(), name="current-user"),
]
