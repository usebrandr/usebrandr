from rest_framework import status, permissions
from rest_framework.decorators import api_view, permission_classes, throttle_classes
from rest_framework.response import Response
from rest_framework.throttling import AnonRateThrottle
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import login
from django.db import transaction
from django.core.exceptions import ValidationError
import logging

from .models import CustomUser, UserProfile
from .serializers import (
    UserRegistrationSerializer,
    UserLoginSerializer,
    UserSerializer,
    UserProfileSerializer
)

logger = logging.getLogger(__name__)


class SignupRateThrottle(AnonRateThrottle):
    """Custom throttle for signup endpoint"""
    scope = 'signup'


def get_tokens_for_user(user):
    """Generate JWT tokens for user"""
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }


@api_view(['POST'])
@permission_classes([permissions.AllowAny])
@throttle_classes([SignupRateThrottle])
def signup_view(request):
    """
    User registration endpoint
    """
    try:
        serializer = UserRegistrationSerializer(data=request.data)

        if serializer.is_valid():
            with transaction.atomic():
                user = serializer.save()

                # Generate tokens
                tokens = get_tokens_for_user(user)

                # Get user data
                user_serializer = UserSerializer(user)

                logger.info(f"New user registered: {user.username} ({user.user_type})")

                return Response({
                    'message': 'Account created successfully',
                    'user': user_serializer.data,
                    'tokens': tokens
                }, status=status.HTTP_201_CREATED)

        else:
            # Return specific field errors
            errors = serializer.errors

            # Check for specific error types
            if 'username' in errors:
                error_msg = 'Username already exists'
            elif 'email' in errors:
                error_msg = 'Email already exists'
            elif 'password' in errors:
                error_msg = str(errors['password'][0])
            elif 'non_field_errors' in errors:
                error_msg = str(errors['non_field_errors'][0])
            else:
                error_msg = 'Invalid signup data'

            return Response({
                'error': error_msg,
                'details': errors
            }, status=status.HTTP_400_BAD_REQUEST)

    except ValidationError as e:
        logger.error(f"Validation error during signup: {str(e)}")
        return Response({
            'error': 'Validation error',
            'details': str(e)
        }, status=status.HTTP_400_BAD_REQUEST)

    except Exception as e:
        logger.error(f"Unexpected error during signup: {str(e)}")
        return Response({
            'error': 'An unexpected error occurred. Please try again.'
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
@permission_classes([permissions.AllowAny])
@throttle_classes([AnonRateThrottle])
def login_view(request):
    """
    User login endpoint
    """
    try:
        serializer = UserLoginSerializer(data=request.data)

        if serializer.is_valid():
            user = serializer.validated_data['user']

            # Generate tokens
            tokens = get_tokens_for_user(user)

            # Get user data
            user_serializer = UserSerializer(user)

            logger.info(f"User logged in: {user.username}")

            return Response({
                'message': 'Login successful',
                'user': user_serializer.data,
                'tokens': tokens
            }, status=status.HTTP_200_OK)

        else:
            return Response({
                'error': 'Invalid credentials',
                'details': serializer.errors
            }, status=status.HTTP_401_UNAUTHORIZED)

    except Exception as e:
        logger.error(f"Unexpected error during login: {str(e)}")
        return Response({
            'error': 'An unexpected error occurred. Please try again.'
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def logout_view(request):
    """
    User logout endpoint
    """
    try:
        refresh_token = request.data.get('refresh_token')

        if refresh_token:
            token = RefreshToken(refresh_token)
            token.blacklist()

        logger.info(f"User logged out: {request.user.username}")

        return Response({
            'message': 'Logout successful'
        }, status=status.HTTP_200_OK)

    except Exception as e:
        logger.error(f"Error during logout: {str(e)}")
        return Response({
            'error': 'An error occurred during logout'
        }, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def profile_view(request):
    """
    Get user profile
    """
    try:
        user_serializer = UserSerializer(request.user)
        return Response({
            'user': user_serializer.data
        }, status=status.HTTP_200_OK)

    except Exception as e:
        logger.error(f"Error fetching profile for {request.user.username}: {str(e)}")
        return Response({
            'error': 'An error occurred while fetching profile'
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['PUT', 'PATCH'])
@permission_classes([permissions.IsAuthenticated])
def update_profile_view(request):
    """
    Update user profile
    """
    try:
        profile, created = UserProfile.objects.get_or_create(user=request.user)

        serializer = UserProfileSerializer(
            profile,
            data=request.data,
            partial=request.method == 'PATCH'
        )

        if serializer.is_valid():
            serializer.save()

            # Return updated user data
            user_serializer = UserSerializer(request.user)

            return Response({
                'message': 'Profile updated successfully',
                'user': user_serializer.data
            }, status=status.HTTP_200_OK)

        else:
            return Response({
                'error': 'Invalid profile data',
                'details': serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)

    except Exception as e:
        logger.error(f"Error updating profile for {request.user.username}: {str(e)}")
        return Response({
            'error': 'An error occurred while updating profile'
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)