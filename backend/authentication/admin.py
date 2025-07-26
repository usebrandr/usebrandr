from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser, UserProfile


@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):
    """Admin interface for CustomUser"""

    list_display = ('username', 'email', 'user_type', 'is_verified', 'is_active', 'date_joined')
    list_filter = ('user_type', 'is_verified', 'is_active', 'date_joined')
    search_fields = ('username', 'email', 'first_name', 'last_name')
    ordering = ('-date_joined',)

    fieldsets = UserAdmin.fieldsets + (
        ('Additional Info', {
            'fields': ('user_type', 'is_verified')
        }),
    )

    add_fieldsets = UserAdmin.add_fieldsets + (
        ('Additional Info', {
            'fields': ('user_type', 'email')
        }),
    )


@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    """Admin interface for UserProfile"""

    list_display = ('user', 'get_user_type', 'company_name', 'niche', 'created_at')
    list_filter = ('user__user_type', 'niche', 'created_at')
    search_fields = ('user__username', 'user__email', 'company_name', 'niche')
    ordering = ('-created_at',)

    fieldsets = (
        ('User', {
            'fields': ('user',)
        }),
        ('Basic Info', {
            'fields': ('bio', 'avatar')
        }),
        ('Business Info', {
            'fields': ('company_name', 'industry', 'company_size', 'website'),
            'classes': ('collapse',)
        }),
        ('Influencer Info', {
            'fields': ('platforms', 'niche', 'follower_count', 'engagement_rate'),
            'classes': ('collapse',)
        }),
        ('Social Media', {
            'fields': ('instagram_url', 'youtube_url', 'tiktok_url', 'twitter_url', 'linkedin_url'),
            'classes': ('collapse',)
        }),
    )

    readonly_fields = ('created_at', 'updated_at')

    def get_user_type(self, obj):
        return obj.user.get_user_type_display()

    get_user_type.short_description = 'User Type'
    get_user_type.admin_order_field = 'user__user_type'