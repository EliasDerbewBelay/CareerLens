from django.urls import path
from .views import RegisterView, ResumeUploadView, JobMatchView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('resume/upload/', ResumeUploadView.as_view(), name='resume-upload'),
    path('job/match/', JobMatchView.as_view(), name='job-match'),
]
