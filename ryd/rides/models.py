from django.db import models
# from django.contrib.auth.models import User
class Employee(models.Model):
    GENDER_CHOICES = (
        ('M', 'Male'),
        ('F', 'Female'),
        ('O', 'Other'),
    )

    name = models.CharField(max_length=255)
    employee_id = models.CharField(max_length=255, unique=True)
    email_id = models.EmailField(unique=True)
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES)
    mobile_number = models.CharField(max_length=15)

    def __str__(self):
        return self.name

class Vehicle(models.Model):
    owner = models.ForeignKey('Employee', on_delete=models.CASCADE)
    model = models.CharField(max_length=200)
    number_of_seats = models.IntegerField(default=1)
    employees = models.ManyToManyField(Employee, related_name='vehicles')


class Ride(models.Model):
    origin = models.CharField(max_length=255, default='Unknown')
    destination = models.CharField(max_length=255, default='Unknown')
    passengers = models.IntegerField(default=1)
    origin_latitude = models.FloatField(default=0.0)
    origin_longitude = models.FloatField(default=0.0)
    destination_latitude = models.FloatField(default=0.0)
    destination_longitude = models.FloatField(default=0.0)
    vehicle_type = models.CharField(max_length=255, default='car')
    departure_time = models.DateTimeField(null=True)
    arrival_time = models.DateTimeField(null=True)
    driver = models.ForeignKey(Employee, on_delete=models.CASCADE, null=True)
    vehicle = models.ForeignKey(Vehicle, on_delete=models.CASCADE, null=True)


