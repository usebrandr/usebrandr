from django.contrib import admin
from django.utils.html import format_html
from django.db.models import Count
from .models import WaitlistEntry, WaitlistStats


@admin.register(WaitlistEntry)
class WaitlistEntryAdmin(admin.ModelAdmin):
    list_display = [
        'email',
        'user_type',
        'created_at',
        'is_notified',
        'days_on_waitlist_display',
        'ip_address'
    ]
    list_filter = [
        'user_type',
        'is_notified',
        'created_at'
    ]
    search_fields = [
        'email',
        'ip_address'
    ]
    readonly_fields = [
        'created_at',
        'days_on_waitlist',
        'ip_address',
        'user_agent'
    ]
    date_hierarchy = 'created_at'
    ordering = ['-created_at']

    actions = ['mark_as_notified', 'export_emails']

    def days_on_waitlist_display(self, obj):
        """Display days on waitlist with color coding"""
        days = obj.days_on_waitlist
        if days < 7:
            color = 'green'
        elif days < 30:
            color = 'orange'
        else:
            color = 'red'

        return format_html(
            '<span style="color: {};">{} days</span>',
            color,
            days
        )

    days_on_waitlist_display.short_description = 'Days on Waitlist'
    days_on_waitlist_display.admin_order_field = 'created_at'

    def mark_as_notified(self, request, queryset):
        """Mark selected entries as notified"""
        updated = queryset.filter(is_notified=False).update(is_notified=True)
        self.message_user(
            request,
            f'{updated} entries marked as notified.'
        )

    mark_as_notified.short_description = 'Mark as notified'

    def export_emails(self, request, queryset):
        """Export emails (this would typically generate a file)"""
        emails = list(queryset.values_list('email', flat=True))
        self.message_user(
            request,
            f'Exported {len(emails)} emails. Implementation needed for actual export.'
        )

    export_emails.short_description = 'Export selected emails'

    def get_queryset(self, request):
        """Optimize database queries"""
        return super().get_queryset(request).select_related()


@admin.register(WaitlistStats)
class WaitlistStatsAdmin(admin.ModelAdmin):
    list_display = [
        'date',
        'total_signups',
        'business_signups',
        'influencer_signups',
        'cumulative_total'
    ]
    list_filter = ['date']
    date_hierarchy = 'date'
    ordering = ['-date']
    readonly_fields = ['date', 'total_signups', 'business_signups', 'influencer_signups', 'cumulative_total']


# Custom admin site configuration
admin.site.site_header = "Brandr Admin"
admin.site.site_title = "Brandr Admin Portal"
admin.site.index_title = "Welcome to Brandr Administration"