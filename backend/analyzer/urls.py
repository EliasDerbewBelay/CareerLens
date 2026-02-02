from django.urls import path
from .views import RegisterView, ResumeUploadView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('resume/upload/', ResumeUploadView.as_view(), name='resume-upload'),
]
