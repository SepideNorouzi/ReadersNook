from drf_spectacular.utils import extend_schema, extend_schema_view
from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from .serializers import UserProfileSerializer, UserRegistrationSerializer


@extend_schema_view(
    post=extend_schema(
        tags=["Authentication"],
        summary="Register a user",
        description="Create a username-based account. The password is validated and hashed.",
    )
)
class UserRegistrationView(generics.CreateAPIView):
    serializer_class = UserRegistrationSerializer
    permission_classes = [AllowAny]
    authentication_classes = []


@extend_schema_view(
    post=extend_schema(
        tags=["Authentication"],
        summary="Obtain JWT token pair",
        description="Authenticate with username and password to receive access and refresh tokens.",
    )
)
class UserTokenObtainPairView(TokenObtainPairView):
    permission_classes = [AllowAny]
    authentication_classes = []


@extend_schema_view(
    post=extend_schema(
        tags=["Authentication"],
        summary="Refresh an access token",
        description="Exchange a valid refresh token for a new token pair.",
    )
)
class UserTokenRefreshView(TokenRefreshView):
    permission_classes = [AllowAny]
    authentication_classes = []


@extend_schema_view(
    get=extend_schema(
        tags=["Authentication"],
        summary="Get the authenticated user",
    )
)
class CurrentUserView(generics.RetrieveAPIView):
    serializer_class = UserProfileSerializer

    def get_object(self):
        return self.request.user
