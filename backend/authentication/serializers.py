from rest_framework import serializers
from django.contrib.auth import authenticate
from django.contrib.auth.password_validation import validate_password
from .models import CustomUser, UserProfile


class UserRegistrationSerializer(serializers.ModelSerializer):
    """Serializer for user registration"""

    password = serializers.CharField(
        write_only=True,
        validators=[validate_password],
        style={'input_type': 'password'}
    )
    confirm_password = serializers.CharField(
        write_only=True,
        style={'input_type': 'password'}
    )

    class Meta:
        model = CustomUser
        fields = ('username', 'email', 'password', 'confirm_password', 'user_type')
        extra_kwargs = {
            'email': {'required': True},
            'username': {'required': True},
        }

    def validate_email(self, value):
        """Validate email uniqueness"""
        if CustomUser.objects.filter(email=value).exists():
            raise serializers.ValidationError("A user with this email already exists.")
        return value

    def validate_username(self, value):
        """Validate username uniqueness"""
        if CustomUser.objects.filter(username=value).exists():
            raise serializers.ValidationError("A user with this username already exists.")
        return value

    def validate(self, attrs):
        """Validate password confirmation"""
        if 'password' in attrs and 'confirm_password' in attrs:
            if attrs['password'] != attrs['confirm_password']:
                raise serializers.ValidationError("Passwords do not match.")
        return attrs

    def create(self, validated_data):
        """Create user and profile"""
        # Remove confirm_password from validated_data
        validated_data.pop('confirm_password', None)

        # Create user
        user = CustomUser.objects.create_user(**validated_data)

        # Ensure profile exists (the signal should handle this, but double-check)
        try:
            if not hasattr(user, 'profile'):
                UserProfile.objects.get_or_create(user=user)
        except Exception as e:
            # Log but don't fail - the signal should have handled it
            import logging
            logger = logging.getLogger(__name__)
            logger.warning(f"Profile creation check failed for {user.username}: {str(e)}")

        return user


class UserLoginSerializer(serializers.Serializer):
    """Serializer for user login"""

    username = serializers.CharField()
    password = serializers.CharField(style={'input_type': 'password'})

    def validate(self, attrs):
        """Validate user credentials"""
        username = attrs.get('username')
        password = attrs.get('password')

        if username and password:
            # Try to authenticate with username
            user = authenticate(username=username, password=password)

            # If username auth fails, try email
            if not user:
                try:
                    user_obj = CustomUser.objects.get(email=username)
                    user = authenticate(username=user_obj.username, password=password)
                except CustomUser.DoesNotExist:
                    pass

            if user:
                if user.is_active:
                    attrs['user'] = user
                else:
                    raise serializers.ValidationError("User account is disabled.")
            else:
                raise serializers.ValidationError("Invalid credentials.")
        else:
            raise serializers.ValidationError("Must provide username/email and password.")

        return attrs


class UserProfileSerializer(serializers.ModelSerializer):
    """Serializer for user profile"""

    user_type = serializers.CharField(source='user.user_type', read_only=True)
    username = serializers.CharField(source='user.username', read_only=True)
    email = serializers.CharField(source='user.email', read_only=True)

    class Meta:
        model = UserProfile
        fields = '__all__'
        read_only_fields = ('user', 'created_at', 'updated_at')


class UserSerializer(serializers.ModelSerializer):
    """Serializer for user data"""

    profile = UserProfileSerializer(read_only=True)

    class Meta:
        model = CustomUser
        fields = ('id', 'username', 'email', 'user_type', 'is_verified',
                  'created_at', 'updated_at', 'profile')
        read_only_fields = ('id', 'created_at', 'updated_at')