# Generated by Django 4.2.16 on 2024-09-11 14:31

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='CofRecord',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cof_no', models.CharField(max_length=50, unique=True)),
                ('hit_rate', models.DecimalField(decimal_places=1, max_digits=10)),
                ('hss', models.DecimalField(decimal_places=1, max_digits=10)),
                ('verification_document', models.FileField(upload_to='verification_documents/')),
            ],
        ),
    ]
