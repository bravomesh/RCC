from rest_framework import viewsets
from .models import CofRecord, ClimatologyImage, RCMImage, GCMImage, SkillImage , Reference    
from .serializers import CofRecordSerializer, ClimatologyImageSerializer, RCMImageSerializer, GCMImageSerializer, SkillImageSerializer, ReferenceSerializer
from rest_framework.response import Response
from rest_framework.decorators import action

class CofRecordViewSet(viewsets.ModelViewSet):
    queryset = CofRecord.objects.all()
    serializer_class = CofRecordSerializer
    
class ClimatologyImageViewSet(viewsets.ModelViewSet):
    queryset = ClimatologyImage.objects.all()
    serializer_class = ClimatologyImageSerializer

    # Optional: Add filtering logic
    def get_queryset(self):
        queryset = super().get_queryset()
        temp_type = self.request.query_params.get('temperature_type')
        season = self.request.query_params.get('season')

        if temp_type:
            queryset = queryset.filter(temperature_type=temp_type)
        if season:
            queryset = queryset.filter(season=season)
            
        print(queryset)

        return queryset

class RCMImageViewSet(viewsets.ModelViewSet):
    queryset = RCMImage.objects.all()
    serializer_class = RCMImageSerializer

    def get_queryset(self):
        queryset = super().get_queryset()

        # Fetch query parameters
        model = self.request.query_params.get('model')
        base_time = self.request.query_params.get('baseTime')
        lead_time = self.request.query_params.get('leadTime')
        time = self.request.query_params.get('time')
        period_months = self.request.query_params.get('periodMonths')
        period_years = self.request.query_params.get('periodYears')
        variable = self.request.query_params.get('variable')
        parameter = self.request.query_params.get('parameter')

        # Apply filters based on query parameters
        if model:
            queryset = queryset.filter(model=model)
        if base_time:
            queryset = queryset.filter(base_time=base_time)
        if lead_time:
            queryset = queryset.filter(lead_time=lead_time)
        if time:
            queryset = queryset.filter(time=time)
        if period_months:
            queryset = queryset.filter(period_months=period_months)
        if period_years:
            queryset = queryset.filter(period_years=period_years)
        if variable:
            queryset = queryset.filter(variable=variable)
        if parameter:
            queryset = queryset.filter(parameter=parameter)

        return queryset
    
class GCMImageViewSet(viewsets.ModelViewSet):
        queryset = GCMImage.objects.all()
        serializer_class = GCMImageSerializer

        def get_queryset(self):
            queryset = super().get_queryset()

            # Fetch query parameters
            model = self.request.query_params.get('model')
            base_time = self.request.query_params.get('baseTime')
            lead_time = self.request.query_params.get('leadTime')
            time = self.request.query_params.get('time')
            period_months = self.request.query_params.get('periodMonths')
            period_years = self.request.query_params.get('periodYears')
            variable = self.request.query_params.get('variable')
            parameter = self.request.query_params.get('parameter')
            method = self.request.query_params.get('method')

            # Apply filters based on query parameters
            if model:
                queryset = queryset.filter(model=model)
            if base_time:
                queryset = queryset.filter(base_time=base_time)
            if lead_time:
                queryset = queryset.filter(lead_time=lead_time)
            if time:
                queryset = queryset.filter(time=time)
            if period_months:
                queryset = queryset.filter(period_months=period_months)
            if period_years:
                queryset = queryset.filter(period_years=period_years)
            if variable:
                queryset = queryset.filter(variable=variable)
            if parameter:
                queryset = queryset.filter(parameter=parameter)
            if method:
                queryset = queryset.filter(method=method)

            return queryset
        

class SkillImageViewSet(viewsets.ModelViewSet):
    queryset = SkillImage.objects.all()
    serializer_class = SkillImageSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        data_type = self.request.query_params.get('dataType')
        parameter = self.request.query_params.get('parameter')
        model = self.request.query_params.get('model')
        season = self.request.query_params.get('season')
        lead_time = self.request.query_params.get('lead_time')
        roc_type = self.request.query_params.get('roc_type')

        if data_type:
            queryset = queryset.filter(data_type=data_type)
        if parameter:
            queryset = queryset.filter(parameter=parameter)
        if model:
            queryset = queryset.filter(model=model)
        if season:
            queryset = queryset.filter(season=season)
        if lead_time:
            queryset = queryset.filter(lead_time=lead_time)
        if roc_type:
            queryset = queryset.filter(roc_type=roc_type)
        
        print(queryset)
        return queryset
    

class ReferenceViewset(viewsets.ModelViewSet):
    queryset = Reference.objects.all()
    serializer_class = ReferenceSerializer

    @action(detail=False, methods=['get'])
    def filter_by_month_and_season(self, request):
        month = request.query_params.get('month')
        season = request.query_params.get('season')
        
        print(month, season)

        images = []
        
        # Get an image based on the month
        if month:
            month_image = Reference.objects.filter(month=month).first()
            if month_image:
                images.append(month_image)

        # Get an image based on the season
        if season:
            season_image = Reference.objects.filter(season=season).first()
            if season_image:
                images.append(season_image)

        if images:
            serializer = self.get_serializer(images, many=True)
            print(serializer)
            return Response(serializer.data)
        print(images)
        return Response({"error": "No images found for the selected month and season."}, status=404)
