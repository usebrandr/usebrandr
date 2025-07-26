from django.apps import AppConfig


class WaitlistConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'waitlist'
    verbose_name = 'Waitlist Management'

    def ready(self):
        """Import signal handlers when the app is ready"""
        try:
            import waitlist.signals
        except ImportError:
            pass