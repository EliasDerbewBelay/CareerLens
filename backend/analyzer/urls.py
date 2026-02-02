from django.urls import path
from .views import RegisterView, ResumeUploadView, JobMatchView, JobAnalysisHistoryView, JobAnalysisDetailView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('resume/upload/', ResumeUploadView.as_view(), name='resume-upload'),
    path('job/match/', JobMatchView.as_view(), name='job-match'),
    path("job/history/", JobAnalysisHistoryView.as_view()),
    path("job/history/<int:analysis_id>/", JobAnalysisDetailView.as_view()),
]
