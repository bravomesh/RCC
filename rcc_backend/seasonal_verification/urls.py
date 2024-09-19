from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CofRecordViewSet, ClimatologyImageViewSet, RCMImageViewSet, GCMImageViewSet, SkillImageViewSet

router = DefaultRouter()
router.register(r'cofrecords', CofRecordViewSet),
router.register(r'climatology-images', ClimatologyImageViewSet)
router.register(r'rcm-images', RCMImageViewSet)
router.register(r'gcm-images', GCMImageViewSet)
router.register(r'skill-images', SkillImageViewSet)
urlpatterns = [
    path('', include(router.urls)),
]

