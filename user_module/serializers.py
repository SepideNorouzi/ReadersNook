from django.contrib.auth import get_user_model, password_validation
from rest_framework import serializers

User = get_user_model()


class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True,
        trim_whitespace=False,
        style={"input_type": "password"},
    )
    password2 = serializers.CharField(
        write_only=True,
        trim_whitespace=False,
        style={"input_type": "password"},
    )

    class Meta:
        model = User
        fields = ("first_name", "last_name", "username", "password", "password2")
        extra_kwargs = {
            "first_name": {"required": True, "allow_blank": False},
            "last_name": {"required": True, "allow_blank": False},
        }

    def validate_password1(self, value):
        return value

    def validate_password2(self, value):
        if value != self.initial_data.get("password1"):
            raise serializers.ValidationError("Passwords don't match")
        return value

    def create(self, validated_data):
        validated_data.pop("password2")
        return super().create(validated_data)
        


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("first_name", "last_name", "username")
        read_only_fields = fields
