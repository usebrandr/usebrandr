from django.db import models
from django.core.validators import EmailValidator
from django.utils import timezone


class WaitlistEntry(models.Model):
    """Model to store waitlist signups"""

    USER_TYPE_CHOICES = [
        ('business', 'Business'),
        ('influencer', 'Influencer'),
    ]

    email = models.EmailField(
        unique=True,
        validators=[EmailValidator()],
        help_text="User's email address"
    )
    user_type = models.CharField(
        max_length=20,
        choices=USER_TYPE_CHOICES,
        help_text="Type of user (business or influencer)"
    )
    created_at = models.DateTimeField(
        default=timezone.now,
        help_text="When the user joined the waitlist"
    )
    ip_address = models.GenericIPAddressField(
        null=True,
        blank=True,
        help_text="IP address of the user when they signed up"
    )
    user_agent = models.TextField(
        null=True,
        blank=True,
        help_text="User agent string from the browser"
    )
    is_notified = models.BooleanField(
        default=False,
        help_text="Whether the user has been notified about launch"
    )
    notified_at = models.DateTimeField(
        null=True,
        blank=True,
        help_text="When the user was notified"
    )

    class Meta:
        verbose_name = "Waitlist Entry"
        verbose_name_plural = "Waitlist Entries"
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['email']),
            models.Index(fields=['user_type']),
            models.Index(fields=['created_at']),
            models.Index(fields=['is_notified']),
        ]

    def __str__(self):
        return f"{self.email} ({self.user_type})"

    @property
    def days_on_waitlist(self):
        """Calculate how many days the user has been on the waitlist"""
        return (timezone.now() - self.created_at).days

    def mark_as_notified(self):
        """Mark this entry as notified"""
        self.is_notified = True
        self.notified_at = timezone.now()
        self.save(update_fields=['is_notified', 'notified_at'])


class WaitlistStats(models.Model):
    """Model to store daily waitlist statistics"""

    date = models.DateField(
        unique=True,
        help_text="Date for these statistics"
    )
    total_signups = models.PositiveIntegerField(
        default=0,
        help_text="Total signups on this date"
    )
    business_signups = models.PositiveIntegerField(
        default=0,
        help_text="Business signups on this date"
    )
    influencer_signups = models.PositiveIntegerField(
        default=0,
        help_text="Influencer signups on this date"
    )
    cumulative_total = models.PositiveIntegerField(
        default=0,
        help_text="Cumulative total signups up to this date"
    )

    class Meta:
        verbose_name = "Waitlist Statistics"
        verbose_name_plural = "Waitlist Statistics"
        ordering = ['-date']

    def __str__(self):
        return f"Stats for {self.date}: {self.total_signups} signups"