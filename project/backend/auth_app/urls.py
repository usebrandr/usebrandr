from django.urls import path
from . import views
from . import ai_views

urlpatterns = [
    path('register/', views.RegisterView.as_view(), name='register'),
    path('login/', views.login_view, name='login'),
    path('user/', views.user_view, name='user'),
    path('logout/', views.logout_view, name='logout'),
    path('ai/answer/', ai_views.ai_answer_view, name='ai_answer'),
]
