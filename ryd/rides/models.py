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
    password = models.CharField(max_length=255)

    def __str__(self):
        return str(self.id)

class Vehicle(models.Model):
    CAR = 'CR'
    MOTORCYCLE = 'MC'

    VEHICLE_TYPE_CHOICES = [
        (CAR, 'Car'),
        (MOTORCYCLE, 'Motorcycle'),
    ]
    vehicle_type = models.CharField(max_length=255, choices=VEHICLE_TYPE_CHOICES, default=CAR)
    vehicle_id = models.CharField(max_length=255, unique=True, null=True)
    # owner = models.ForeignKey('Employee', on_delete=models.CASCADE)
    model = models.CharField(max_length=200)
    number_of_seats = models.IntegerField(default=1)
    employees = models.ManyToManyField(Employee)
    
    def __str__(self):
        return str(self.id)


class Ride(models.Model):
    origin = models.CharField(max_length=255, default='Unknown')
    destination = models.CharField(max_length=255, default='Unknown')
    passengers = models.IntegerField(default=1)
    origin_latitude = models.FloatField(default=0.0)
    origin_longitude = models.FloatField(default=0.0)
    destination_latitude = models.FloatField(default=0.0)
    destination_longitude = models.FloatField(default=0.0)
    vehicle_type = models.CharField(max_length=255, default='CR')
    departure_time = models.DateTimeField(null=True)
    # departure_tim = models.DateTimeField(null=True)
    # arrival_time = models.DateTimeField(null=True)
    # employees = models.ManyToManyField(Employee, related_name='employee_rides')
    driver = models.CharField(max_length=255, default="")
    vehicle = models.CharField(max_length=255, default="")
    # driver = models.ForeignKey(Employee, on_delete=models.CASCADE, null=True)
    # vehicle = models.ForeignKey(Vehicle, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return str(self.id)


