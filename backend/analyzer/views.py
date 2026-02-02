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