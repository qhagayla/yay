# views.py
from rest_framework import viewsets
from .models import Criterion, Trial, Assessment
from .serializers import CriterionSerializer, TrialSerializer, AssessmentSerializer

class CriterionViewSet(viewsets.ModelViewSet):
    queryset = Criterion.objects.all()
    serializer_class = CriterionSerializer

class TrialViewSet(viewsets.ModelViewSet):
    queryset = Trial.objects.all()
    serializer_class = TrialSerializer

class AssessmentViewSet(viewsets.ModelViewSet):
    queryset = Assessment.objects.all()
    serializer_class = AssessmentSerializer
