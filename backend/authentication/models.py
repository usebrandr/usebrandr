from django.contrib.auth.models import AbstractUser
from django.db import models


class CustomUser(AbstractUser):
    """Extended user model with additional fields"""

    USER_TYPE_CHOICES = [
        ('business', 'Business'),
        ('influencer', 'Influencer'),
    ]

    user_type = models.CharField(
        max_length=20,
        choices=USER_TYPE_CHOICES,
        default='business'
    )

    # Additional profile fields
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_verified = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.username} ({self.get_user_type_display()})"


class UserProfile(models.Model):
    """Extended profile information for users"""

    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='profile')

    # Common fields
    bio = models.TextField(max_length=500, blank=True)
    avatar = models.ImageField(upload_to='avatars/', blank=True, null=True)

    # Business-specific fields
    company_name = models.CharField(max_length=100, blank=True)
    industry = models.CharField(max_length=50, blank=True)
    company_size = models.CharField(max_length=50, blank=True)
    website = models.URLField(blank=True)

    # Influencer-specific fields
    platforms = models.JSONField(default=list, blank=True)  # List of connected platforms
    niche = models.CharField(max_length=50, blank=True)
    follower_count = models.CharField(max_length=20, blank=True)
    engagement_rate = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)

    # Social media links
    instagram_url = models.URLField(blank=True)
    youtube_url = models.URLField(blank=True)
    tiktok_url = models.URLField(blank=True)
    twitter_url = models.URLField(blank=True)
    linkedin_url = models.URLField(blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Profile for {self.user.username}"