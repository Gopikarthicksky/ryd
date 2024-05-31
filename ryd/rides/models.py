from django.db import models
from django.contrib.auth.hashers import make_password
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
    def get_session_auth_hash(self):
        return make_password(self.password)

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
    arrival_time = models.DateTimeField(null=True)
    # employees = models.ManyToManyField(Employee, related_name='employee_rides')
    driver = models.CharField(max_length=255, default="")
    vehicle = models.CharField(max_length=255, default="")
    # driver = models.ForeignKey(Employee, on_delete=models.CASCADE, null=True)
    # vehicle = models.ForeignKey(Vehicle, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return str(self.id)

class RideRequest(models.Model):
    STATUS_CHOICES = (
        ('P', 'Pending'),
        ('A', 'Accepted'),
        ('R', 'Rejected'),
        ('C', 'Cancelled'),
    )

    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    ride = models.ForeignKey(Ride, on_delete=models.CASCADE)
    status = models.CharField(max_length=1, choices=STATUS_CHOICES, default='P')

    def create_request(self, employee, ride):
        self.employee = employee
        self.ride = ride
        self.status = 'P'
        self.save()
    
    class Meta:
        unique_together = ('ride', 'employee')

class RideResponse(models.Model):
    STATUS_CHOICES = (
        ('P', 'Pending'),
        ('A', 'Accepted'),
        ('R', 'Rejected'),
        ('C', 'Cancelled'),        
    )

    driver = models.ForeignKey(Employee, on_delete=models.CASCADE, related_name='driver_responses')
    ride_request = models.ForeignKey(RideRequest, on_delete=models.CASCADE)
    status = models.CharField(max_length=1, choices=STATUS_CHOICES, default='P')

    def accept_request(self, driver):
        self.driver = driver
        self.status = 'A'
        self.save()

    def reject_request(self, driver):
        self.driver = driver
        self.status = 'R'
        self.save()
    
    class Meta:
        unique_together = ('ride_request', 'driver')

# employee = Employee.objects.get(id=1)  # Replace with your employee id
# ride = Ride.objects.get(id=1)  # Replace with your ride id

# # Create a ride request
# ride_request = RideRequest()
# ride_request.create_request(employee, ride)

# # Assuming you have a driver (which is also an Employee instance)
# driver = Employee.objects.get(id=2)  # Replace with your driver id

# # Create a ride response and accept the request
# ride_response = RideResponse()
# ride_response.ride_request = ride_request
# ride_response.accept_request(driver)