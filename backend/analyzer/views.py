from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics

from PyPDF2 import PdfReader
from django.contrib.auth.models import User

from .models import Resume, JobAnalysis
from .serializers import (
    ResumeSerializer,
    RegisterSerializer,
    JobAnalysisSerializer
)

from .embeddings import get_similarity
from .utils import SKILLS, generate_feedback


# ---------------------------
# AUTH
# ---------------------------
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer


# ---------------------------
# RESUME UPLOAD
# ---------------------------
class ResumeUploadView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        file = request.FILES.get("file")

        if not file:
            return Response(
                {"error": "No file uploaded"},
                status=status.HTTP_400_BAD_REQUEST
            )

        resume = Resume.objects.create(
            user=request.user,
            file=file
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


# ---------------------------
# JOB MATCH + AI FEEDBACK
# ---------------------------
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

        resume_text = resume.extracted_text.lower()
        job_text = job_description.lower()

        # 1️⃣ AI Semantic Matching (Embeddings)
        similarity_score = get_similarity(resume_text, job_text)
        ai_match_percentage = round(similarity_score * 100, 2)

        # 2️⃣ Skill Gap Analysis
        matched_skills = []
        missing_skills = []

        for skill in SKILLS:
            if skill in job_text:
                if skill in resume_text:
                    matched_skills.append(skill)
                else:
                    missing_skills.append(skill)

        # 3️⃣ AI Feedback Generation ✅ (THIS IS THE NEW PART)
        feedback = generate_feedback(
            matched_skills=matched_skills,
            missing_skills=missing_skills,
            match_percentage=ai_match_percentage
        )

        # 4️⃣ Save Analysis (WITH feedback)
        analysis = JobAnalysis.objects.create(
            resume=resume,
            job_description=job_description,
            match_percentage=ai_match_percentage,
            matched_keywords=matched_skills,
            missing_keywords=missing_skills,
            feedback=feedback
        )

        # 5️⃣ Response
        return Response({
            "analysis_id": analysis.id,
            "ai_match_percentage": ai_match_percentage,
            "matched_skills": matched_skills,
            "missing_skills": missing_skills,
            "feedback": feedback
        })


# ---------------------------
# ANALYSIS HISTORY
# ---------------------------
class JobAnalysisHistoryView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        analyses = JobAnalysis.objects.filter(
            resume__user=request.user
        ).order_by("-created_at")

        serializer = JobAnalysisSerializer(analyses, many=True)
        return Response(serializer.data)


# ---------------------------
# SINGLE ANALYSIS DETAIL
# ---------------------------
class JobAnalysisDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, analysis_id):
        analysis = JobAnalysis.objects.get(
            id=analysis_id,
            resume__user=request.user
        )
        serializer = JobAnalysisSerializer(analysis)
        return Response(serializer.data)
