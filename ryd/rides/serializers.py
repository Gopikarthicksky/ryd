from rest_framework.serializers import ModelSerializer
from django.contrib.auth.hashers import make_password
from django.contrib.auth import authenticate
from rest_framework import serializers
from .models import Vehicle, Employee

class VehicleSerializer(ModelSerializer):
    class Meta:
        model = Vehicle
        fields = ['vehicle_id', 'model', 'owner', 'number_of_seats', 'vehicle_type']

    def validate_vehicle_id(self, value):
        if Vehicle.objects.filter(vehicle_id=value).exists():
            raise serializers.ValidationError("A vehicle with this ID already exists.")
        return value

    def create(self, validated_data):
        vehicle = Vehicle(**validated_data)
        vehicle.save()
        return vehicle


class SignUpSerializer(ModelSerializer):
    class Meta:
        model = Employee
        fields = ['employee_id', 'name', 'email_id', 'password', 'gender', 'mobile_number']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def validate_email(self, value):
        if Employee.objects.filter(email=value).exists():
            raise serializers.ValidationError("An employee with this email already exists.")
        return value

    def validate_employee_id(self, value):
        if Employee.objects.filter(employee_id=value).exists():
            raise serializers.ValidationError("An employee with this ID already exists.")
        return value

    def create(self, validated_data):
        password = validated_data.pop('password')
        employee = Employee(**validated_data)
        employee.password = make_password(password)
        employee.save()
        return employee


class SignInSerializer(ModelSerializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        username = data.get('username')
        password = data.get('password')
        user = authenticate(username=username, password=password)

        if user is not None:
            return data
        else:
            raise serializers.ValidationError("Invalid username/password.")