from rest_framework.serializers import ModelSerializer
from django.contrib.auth.hashers import make_password
from django.contrib.auth import authenticate
from rest_framework import serializers
from .models import Vehicle, Employee

class VehicleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vehicle
        fields = ['vehicle_type', 'vehicle_id', 'model', 'number_of_seats', 'employees']

# # serializers.py
# from rest_framework import serializers
# from .models import Vehicle, Employee

# class VehicleSerializer(serializers.ModelSerializer):
#     # employees = serializers.PrimaryKeyRelatedField(many=True, write_only=True, queryset=Employee.objects.all())

#     class Meta:
#         model = Vehicle
#         fields = ['vehicle_id', 'model', 'number_of_seats', 'employees', 'vehicle_type']

#     # def validate_vehicle_id(self, value):
#     #     if Vehicle.objects.filter(vehicle_id=value).exists():
#     #         raise serializers.ValidationError("A vehicle with this ID already exists.")
#     #     return value

#     def create(self, validated_data):
#         employee_ids = validated_data.pop('employees')
#         employees = Employee.objects.get(employee_id=employee_ids)
#         if len(employees) != len(employee_ids):
#             raise serializers.ValidationError("Some employees with provided IDs do not exist.")

#         vehicle = Vehicle(**validated_data)
#         vehicle.save()
#         vehicle.employees.set(employees)
#         return vehicle


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