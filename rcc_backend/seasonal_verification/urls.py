from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CofRecordViewSet, ClimatologyImageViewSet, RCMImageViewSet, GCMImageViewSet, SkillImageViewSet, ReferenceViewset

router = DefaultRouter()
router.register(r'cofrecords', CofRecordViewSet),
router.register(r'climatology-images', ClimatologyImageViewSet)
router.register(r'rcm-images', RCMImageViewSet)
router.register(r'gcm-images', GCMImageViewSet)
router.register(r'skill-images', SkillImageViewSet)
router.register(r'reference', ReferenceViewset)
urlpatterns = [
    path('', include(router.urls)),
]

