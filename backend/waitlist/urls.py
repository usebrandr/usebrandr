from django.urls import path
from . import views

app_name = 'waitlist'

urlpatterns = [
    path('join/', views.join_waitlist, name='join_waitlist'),
    path('stats/', views.waitlist_stats, name='waitlist_stats'),
    path('recent/', views.recent_signups, name='recent_signups'),
    path('check/', views.check_email, name='check_email'),
]