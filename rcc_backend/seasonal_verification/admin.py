from django.contrib import admin
from .models import CofRecord, ClimatologyImage , RCMImage, GCMImage , SkillImage# Import your model

# Register the model
admin.site.register(CofRecord)
admin.site.register(ClimatologyImage)
admin.site.register(RCMImage)
admin.site.register(GCMImage)
admin.site.register(SkillImage)
