from rest_framework import serializers
from django.core.validators import EmailValidator
from .models import WaitlistEntry


class WaitlistEntrySerializer(serializers.ModelSerializer):
    """Serializer for creating waitlist entries"""

    email = serializers.EmailField(
        validators=[EmailValidator()],
        help_text="Valid email address"
    )
    user_type = serializers.ChoiceField(
        choices=WaitlistEntry.USER_TYPE_CHOICES,
        help_text="Type of user: 'business' or 'influencer'"
    )

    class Meta:
        model = WaitlistEntry
        fields = ['email', 'user_type']

    def validate_email(self, value):
        """Ensure email is properly formatted and not already registered"""
        value = value.lower().strip()

        if WaitlistEntry.objects.filter(email=value).exists():
            raise serializers.ValidationError(
                "This email is already on our waitlist."
            )

        return value

    def validate_user_type(self, value):
        """Ensure user_type is valid"""
        if value not in ['business', 'influencer']:
            raise serializers.ValidationError(
                "User type must be either 'business' or 'influencer'."
            )
        return value


class WaitlistEntryResponseSerializer(serializers.ModelSerializer):
    """Serializer for returning waitlist entry data (read-only)"""

    days_on_waitlist = serializers.ReadOnlyField()

    class Meta:
        model = WaitlistEntry
        fields = [
            'id',
            'email',
            'user_type',
            'created_at',
            'days_on_waitlist',
            'is_notified'
        ]
        read_only_fields = fields


class WaitlistStatsSerializer(serializers.Serializer):
    """Serializer for waitlist statistics"""

    total = serializers.IntegerField(help_text="Total waitlist entries")
    business = serializers.IntegerField(help_text="Total business entries")
    influencer = serializers.IntegerField(help_text="Total influencer entries")
    recent_signups = serializers.IntegerField(help_text="Signups in the last 7 days")


class JoinWaitlistRequestSerializer(serializers.Serializer):
    """Serializer for the frontend request format"""

    email = serializers.EmailField()
    userType = serializers.CharField()  # Frontend sends 'userType' instead of 'user_type'

    def validate_userType(self, value):
        """Convert userType to user_type and validate"""
        if value not in ['business', 'influencer']:
            raise serializers.ValidationError(
                "User type must be either 'business' or 'influencer'."
            )
        return value

    def to_internal_value(self, data):
        """Convert frontend format to backend format"""
        internal_data = super().to_internal_value(data)
        # Convert userType to user_type for consistency with backend
        if 'userType' in internal_data:
            internal_data['user_type'] = internal_data.pop('userType')
        return internal_data