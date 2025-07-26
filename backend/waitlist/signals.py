from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils import timezone
from .models import WaitlistEntry, WaitlistStats


@receiver(post_save, sender=WaitlistEntry)
def update_daily_stats(sender, instance, created, **kwargs):
    """Update daily statistics when a new waitlist entry is created"""
    if created:
        today = timezone.now().date()

        # Get or create today's stats
        stats, created_stats = WaitlistStats.objects.get_or_create(
            date=today,
            defaults={
                'total_signups': 0,
                'business_signups': 0,
                'influencer_signups': 0,
                'cumulative_total': 0
            }
        )

        # Update counts
        stats.total_signups += 1
        if instance.user_type == 'business':
            stats.business_signups += 1
        elif instance.user_type == 'influencer':
            stats.influencer_signups += 1

        # Update cumulative total
        stats.cumulative_total = WaitlistEntry.objects.count()

        stats.save()