# Generated by Django 5.0.6 on 2024-05-31 11:48

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("rides", "0009_alter_riderequest_unique_together_and_more"),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name="riderequest",
            unique_together={("ride", "employee")},
        ),
        migrations.AlterUniqueTogether(
            name="rideresponse",
            unique_together={("ride_request", "driver")},
        ),
    ]
