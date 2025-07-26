from django.db.models.signals import post_save
from django.dispatch import receiver
from django.conf import settings
from .models import CustomUser, UserProfile
import logging

logger = logging.getLogger(__name__)


@receiver(post_save, sender=CustomUser)
def create_or_update_user_profile(sender, instance, created, **kwargs):
    """
    Create a UserProfile when a new CustomUser is created
    """
    if created:
        try:
            # Only create profile if it doesn't exist
            profile, profile_created = UserProfile.objects.get_or_create(
                user=instance,
                defaults={}
            )
            if profile_created:
                logger.info(f"Profile created for user: {instance.username}")
            else:
                logger.info(f"Profile already existed for user: {instance.username}")
        except Exception as e:
            logger.error(f"Error creating profile for user {instance.username}: {str(e)}")
    else:
        # For existing users, ensure profile exists but don't create duplicates
        try:
            if not hasattr(instance, 'profile') or not UserProfile.objects.filter(user=instance).exists():
                profile, profile_created = UserProfile.objects.get_or_create(
                    user=instance,
                    defaults={}
                )
                if profile_created:
                    logger.info(f"Profile created for existing user: {instance.username}")
        except Exception as e:
            logger.error(f"Error ensuring profile for user {instance.username}: {str(e)}")