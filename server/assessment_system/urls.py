# urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CriterionViewSet, TrialViewSet, AssessmentViewSet

router = DefaultRouter()
router.register(r'criteria', CriterionViewSet)
router.register(r'trials', TrialViewSet)
router.register(r'assessments', AssessmentViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
