import logging
from django.db.models import Count
from django.utils import timezone
from datetime import timedelta
from rest_framework import status
from rest_framework.decorators import api_view, throttle_classes
from rest_framework.response import Response
from rest_framework.throttling import AnonRateThrottle
from django_ratelimit.decorators import ratelimit
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

from .models import WaitlistEntry
from .serializers import (
    WaitlistEntrySerializer,
    WaitlistStatsSerializer,
    JoinWaitlistRequestSerializer,
    WaitlistEntryResponseSerializer
)

logger = logging.getLogger(__name__)


class WaitlistRateThrottle(AnonRateThrottle):
    """Custom throttle for waitlist endpoints"""
    scope = 'waitlist'


def get_client_ip(request):
    """Get client IP address from request"""
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip


@api_view(['POST'])
@throttle_classes([WaitlistRateThrottle])
@ratelimit(key='ip', rate='5/m', method='POST', block=True)
def join_waitlist(request):
    """
    Join the waitlist

    Expected payload:
    {
        "email": "user@example.com",
        "userType": "business" | "influencer"
    }
    """
    try:
        # Use the request serializer to handle frontend format
        request_serializer = JoinWaitlistRequestSerializer(data=request.data)

        if not request_serializer.is_valid():
            logger.warning(f"Invalid waitlist signup attempt: {request_serializer.errors}")
            return Response({
                'error': 'Invalid data provided',
                'details': request_serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)

        validated_data = request_serializer.validated_data

        # Create the waitlist entry using the model serializer
        entry_data = {
            'email': validated_data['email'].lower().strip(),
            'user_type': validated_data['user_type']
        }

        entry_serializer = WaitlistEntrySerializer(data=entry_data)

        if not entry_serializer.is_valid():
            if 'email' in entry_serializer.errors:
                error_message = entry_serializer.errors['email'][0]
                if 'already on our waitlist' in str(error_message):
                    return Response({
                        'error': 'This email is already on our waitlist'
                    }, status=status.HTTP_409_CONFLICT)

            return Response({
                'error': 'Validation failed',
                'details': entry_serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)

        # Save the entry with additional metadata
        waitlist_entry = entry_serializer.save(
            ip_address=get_client_ip(request),
            user_agent=request.META.get('HTTP_USER_AGENT', '')[:500]  # Limit length
        )

        logger.info(f"New waitlist signup: {waitlist_entry.email} ({waitlist_entry.user_type})")

        return Response({
            'success': True,
            'message': 'Successfully joined the waitlist!',
            'id': waitlist_entry.id
        }, status=status.HTTP_201_CREATED)

    except Exception as e:
        logger.error(f"Unexpected error in join_waitlist: {str(e)}")
        return Response({
            'error': 'An unexpected error occurred. Please try again.'
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
def waitlist_stats(request):
    """
    Get waitlist statistics

    Returns:
    {
        "total": 150,
        "business": 75,
        "influencer": 75,
        "recent_signups": 25
    }
    """
    try:
        # Get counts by user type
        stats_data = WaitlistEntry.objects.aggregate(
            total=Count('id'),
            business=Count('id', filter=Count('user_type').filter(user_type='business')),
            influencer=Count('id', filter=Count('user_type').filter(user_type='influencer'))
        )

        # Get recent signups (last 7 days)
        seven_days_ago = timezone.now() - timedelta(days=7)
        recent_signups = WaitlistEntry.objects.filter(
            created_at__gte=seven_days_ago
        ).count()

        stats_data['recent_signups'] = recent_signups

        # Handle case where counts might be None
        for key in ['total', 'business', 'influencer']:
            if stats_data[key] is None:
                stats_data[key] = 0

        serializer = WaitlistStatsSerializer(data=stats_data)
        if serializer.is_valid():
            return Response(serializer.validated_data, status=status.HTTP_200_OK)
        else:
            return Response({
                'error': 'Failed to serialize stats data'
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    except Exception as e:
        logger.error(f"Error fetching waitlist stats: {str(e)}")
        return Response({
            'error': 'Failed to fetch waitlist statistics'
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
def recent_signups(request):
    """
    Get recent waitlist signups (admin/internal use)

    Query parameters:
    - limit: Number of results to return (default: 10, max: 50)
    """
    try:
        limit = request.GET.get('limit', 10)
        try:
            limit = int(limit)
            limit = min(max(limit, 1), 50)  # Ensure limit is between 1 and 50
        except ValueError:
            limit = 10

        recent_entries = WaitlistEntry.objects.select_related().order_by('-created_at')[:limit]
        serializer = WaitlistEntryResponseSerializer(recent_entries, many=True)

        return Response({
            'count': len(serializer.data),
            'results': serializer.data
        }, status=status.HTTP_200_OK)

    except Exception as e:
        logger.error(f"Error fetching recent signups: {str(e)}")
        return Response({
            'error': 'Failed to fetch recent signups'
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
def check_email(request):
    """
    Check if an email is already on the waitlist

    Query parameters:
    - email: Email to check
    """
    email = request.GET.get('email', '').lower().strip()

    if not email:
        return Response({
            'error': 'Email parameter is required'
        }, status=status.HTTP_400_BAD_REQUEST)

    try:
        exists = WaitlistEntry.objects.filter(email=email).exists()
        return Response({
            'exists': exists,
            'email': email
        }, status=status.HTTP_200_OK)

    except Exception as e:
        logger.error(f"Error checking email {email}: {str(e)}")
        return Response({
            'error': 'Failed to check email'
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)