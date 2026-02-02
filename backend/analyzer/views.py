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

from .embeddings import get_similarity

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
        job_description = request.data.get("job_description")

        if not resume_id or not job_description:
            return Response(
                {"error": "resume_id and job_description are required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        resume = Resume.objects.get(id=resume_id, user=request.user)

        similarity_score = get_similarity(
            resume.extracted_text,
            job_description
        )

        match_percentage = round(similarity_score * 100, 2)

        analysis = JobAnalysis.objects.create(
            resume=resume,
            job_description=job_description,
            match_percentage=match_percentage,
            matched_keywords=[],
            missing_keywords=[]
        )

        return Response({
            "match_percentage": match_percentage,
            "message": "AI-based semantic matching completed"
        })
