from django.db import models

class CofRecord(models.Model):
    cof_no = models.CharField(max_length=50, unique=True)
    hit_rate = models.DecimalField(max_digits=10, decimal_places=1)
    hss = models.DecimalField(max_digits=10, decimal_places=1)
    verification_document = models.FileField(upload_to='verification_documents/')

    def __str__(self):
        return self.cof_no

class ClimatologyImage(models.Model):
    temperature_type = models.CharField(max_length=100)  # Example: mean, max, min
    season = models.CharField(max_length=100)  # Example: annual, MAM, JJAS, etc.
    tiff_file = models.FileField(upload_to='tiff_images/')  # Store tiff files

    def __str__(self):
        return f"{self.temperature_type} - {self.season}"
    


class RCMImage(models.Model):
    model = models.CharField(max_length=100, default='WRF')  # WRF as the only option
    base_time = models.CharField(max_length=100)  # Example: Jan, Feb, etc.
    lead_time = models.CharField(max_length=100)  # 1 Month Lead, 2 Months Lead
    time = models.CharField(max_length=100)  # Monthly, Seasonal
    period_months = models.CharField(max_length=100)  
    period_years = models.IntegerField()  # From 2017 to 2022
    variable = models.CharField(max_length=100)  # Precipitation, 2M-Temperature, etc.
    parameter = models.CharField(max_length=100)  # Anomaly, Average
    image_file = models.FileField(upload_to='rcm_images/')  # The result image

    def __str__(self):
        return f'{self.model} {self.base_time} {self.lead_time} {self.time} {self.period_months} {self.period_years} {self.variable} {self.parameter}'

class GCMImage(models.Model):
    model = models.CharField(max_length=100)  # WRF as the only option
    base_time = models.CharField(max_length=100)  # Example: Jan, Feb, etc.
    lead_time = models.CharField(max_length=100)  # 1 Month Lead, 2 Months Lead
    time = models.CharField(max_length=100)  # Monthly, Seasonal
    period_months = models.CharField(max_length=100)  
    period_years = models.IntegerField()  # From 2017 to 2022
    variable = models.CharField(max_length=100)  # Precipitation, 2M-Temperature, etc.
    parameter = models.CharField(max_length=100)  # Anomaly, Average
    method = models.CharField(max_length=100, default='Regression')  
    image_file = models.FileField(upload_to='gcm_images/')  # The result image

    def __str__(self):
        return f'{self.model} {self.base_time} {self.lead_time} {self.time} {self.period_months} {self.period_years} {self.variable} {self.parameter}'
    
class SkillImage(models.Model):
    data_type = models.CharField(max_length=100, default='Raw Data')
    parameter = models.CharField(max_length=100, default='Precipitation')
    model = models.CharField(max_length=100)  # CMCC, DWD
    season = models.CharField(max_length=100)  # MAM, JAS, OND
    lead_time = models.CharField(max_length=100)  # 1 month, 2 months
    roc_type = models.CharField(max_length=100)  # ROC Normal, ROC Below, ROC Above
    tiff_file = models.FileField(upload_to='skill_images/')  # Store TIFF files

    def __str__(self):
        return f"{self.model} - {self.season} - {self.lead_time} - {self.roc_type}"


