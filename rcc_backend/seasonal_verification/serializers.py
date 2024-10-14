from rest_framework import serializers
from .models import CofRecord, ClimatologyImage, RCMImage, GCMImage, SkillImage, Reference

class CofRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = CofRecord
        fields = ['id', 'cof_no', 'hit_rate', 'hss', 'verification_document']
class ClimatologyImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClimatologyImage
        fields = ['id', 'temperature_type', 'season', 'tiff_file']
        

class RCMImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = RCMImage
        fields = '__all__'
        
class GCMImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = GCMImage
        fields = '__all__'


class SkillImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = SkillImage
        fields = '__all__'

class ReferenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reference
        fields = '__all__'