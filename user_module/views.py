from drf_spectacular.utils import extend_schema, extend_schema_view
from rest_framework import generics, status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from .serializers import (
    ChangePasswordSerializer,
    PasswordChangedSerializer,
    UserProfileSerializer,
    UserRegistrationSerializer,
)


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
    authentication_classes = []  # public: skip JWT so signup works without a token


@extend_schema_view(
    post=extend_schema(
        tags=["Authentication"],
        summary="Obtain JWT token pair",
        description="Authenticate with username and password to receive access and refresh tokens.",
    )
)
class UserTokenObtainPairView(TokenObtainPairView):
    permission_classes = [AllowAny]
    authentication_classes = []  # public: login cannot require an existing token


@extend_schema_view(
    post=extend_schema(
        tags=["Authentication"],
        summary="Refresh an access token",
        description="Exchange a valid refresh token for a new token pair.",
    )
)
class UserTokenRefreshView(TokenRefreshView):
    permission_classes = [AllowAny]
    authentication_classes = []  # public: refresh is authenticated by the refresh token body


@extend_schema_view(
    get=extend_schema(
        tags=["Profile"],
        summary="Get the authenticated user",
    ),
    put=extend_schema(
        tags=["Profile"],
        summary="Replace profile",
        description="Full update of first name, last name, and username.",
    ),
    patch=extend_schema(
        tags=["Profile"],
        summary="Update profile",
        description="Partial update of first name, last name, and/or username.",
    ),
)
class CurrentUserView(generics.RetrieveUpdateAPIView):
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user


@extend_schema(
    tags=["Profile"],
    summary="Change password",
    description="Requires the current password. The new password is validated and hashed.",
    request=ChangePasswordSerializer,
    responses={200: PasswordChangedSerializer},
)
class ChangePasswordView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = ChangePasswordSerializer(
            data=request.data,
            context={"request": request},
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(
            {"detail": "Password updated."},
            status=status.HTTP_200_OK,
        )
