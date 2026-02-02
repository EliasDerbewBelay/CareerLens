from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from PyPDF2 import PdfReader

from .models import Resume
from .serializers import ResumeSerializer

from rest_framework import generics 
from django.contrib.auth.models import User 
from .serializers import RegisterSerializer

from .models import JobAnalysis
from .utils import SKILLS

# Create your views here.

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer

class ResumeUploadView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        file = request.FILES.get('file')

        if not file:
            return Response(
                {"error": "No file uploaded"},
                status = status.HTTP_400_BAD_REQUEST
            )
        resume = Resume.objects.create(
            user = request.user,
            file = file
        )

        # Extract text from PDF 
        text = ""
        reader = PdfReader(resume.file)
        for page in reader.pages:
            text += page.extract_text() or ""

        resume.extracted_text = text
        resume.save()

        serializer = ResumeSerializer(resume)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    

class JobMatchView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        resume_id = request.data.get("resume_id")
        job_description = request.data.get("job_description", "").lower()

        if not resume_id or not job_description:
            return Response(
                {"error": "resume_id and job_description are required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        resume = Resume.objects.get(id=resume_id, user=request.user)
        resume_text = resume.extracted_text.lower()

        matched = []
        missing = []

        for skill in SKILLS:
            if skill in job_description:
                if skill in resume_text:
                    matched.append(skill)
                else:
                    missing.append(skill)

        total = len(matched) + len(missing)
        match_percentage = (len(matched) / total * 100) if total > 0 else 0

        analysis = JobAnalysis.objects.create(
            resume=resume,
            job_description=job_description,
            match_percentage=match_percentage,
            matched_keywords=matched,
            missing_keywords=missing
        )

        return Response({
            "match_percentage": match_percentage,
            "matched_skills": matched,
            "missing_skills": missing
        })
