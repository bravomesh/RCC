# Generated by Django 4.2.16 on 2024-09-13 22:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('seasonal_verification', '0002_climatologyimage'),
    ]

    operations = [
        migrations.CreateModel(
            name='RCMImage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('model', models.CharField(default='WRF', max_length=100)),
                ('base_time', models.CharField(max_length=100)),
                ('lead_time', models.CharField(max_length=100)),
                ('time', models.CharField(max_length=100)),
                ('period_months', models.CharField(max_length=100)),
                ('period_years', models.IntegerField()),
                ('variable', models.CharField(max_length=100)),
                ('parameter', models.CharField(max_length=100)),
                ('image_file', models.FileField(upload_to='rcm_images/')),
            ],
        ),
    ]
