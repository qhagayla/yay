# serializers.py
from rest_framework import serializers
from .models import Criterion, Trial, Assessment

class CriterionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Criterion
        fields = '__all__'

class TrialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trial
        fields = '__all__'

class AssessmentSerializer(serializers.ModelSerializer):
    criterion = CriterionSerializer()
    trial = TrialSerializer()

    class Meta:
        model = Assessment
        fields = '__all__'
