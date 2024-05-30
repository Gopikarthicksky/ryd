# views.py
import requests
from django.http import JsonResponse
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.core import serializers
from django.shortcuts import get_object_or_404
from django.db.models import Q
from datetime import datetime, timedelta
import requests
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import SignUpSerializer, SignInSerializer, VehicleSerializer
from .models import Vehicle, Employee, Ride
from django.utils.dateparse import parse_datetime
from rest_framework import status
from django.shortcuts import get_object_or_404

@method_decorator(csrf_exempt, name='dispatch')
class RideListView(APIView):
    def get(self, request):
        rides = Ride.objects.all()
        ride_list = serializers.serialize('json', rides)
        return JsonResponse(ride_list, safe=False)

    def post(self, request):
        new_ride = Ride.objects.create(
            driver=request.user,
            vehicle=request.user.vehicle,
            origin=request.POST['origin'],
            destination=request.POST['destination'],
            departure_time=request.POST['departure_time'],
            arrival_time=request.POST['arrival_time'],
            available_seats=request.POST['available_seats'],
        )
        return JsonResponse({'ride_id': new_ride.id}, status=201)


@method_decorator(csrf_exempt, name='dispatch')
class RideDetailView(APIView):
    def get(self, request, pk):
        ride = get_object_or_404(Ride, pk=pk)
        ride_detail = serializers.serialize('json', [ride])
        return JsonResponse(ride_detail, safe=False)

    def post(self, request, pk):
        ride = get_object_or_404(Ride, pk=pk)
        if 'join' in request.POST:
            ride.passengers.add(request.user)
            ride.available_seats -= 1
            ride.save()
            return JsonResponse({'message': 'Successfully joined the ride.'}, status=200)
        elif 'leave' in request.POST:
            ride.passengers.remove(request.user)
            ride.available_seats += 1
            ride.save()
            return JsonResponse({'message': 'Successfully left the ride.'}, status=200)
        else:
            return JsonResponse({'error': 'Invalid action.'}, status=400)

class CreateRideView(APIView):
    def post(self, request, format=None):
        data = request.data
        origin = data.get('origin')
        destination = data.get('destination')
        passengers = data.get('passengers')
        origin_latitude = data.get('origin_latitude')
        origin_longitude = data.get('origin_longitude')
        destination_latitude = data.get('destination_latitude')
        destination_longitude = data.get('destination_longitude')
        # vehicle_type = data.get('vehicle_type')
        departure_time = parse_datetime(data.get('departure_time'))
        # arrival_time = parse_datetime(data.get('arrival_time'))
        # driver_id = data.get('employee_id')
        vehicle_id = data.get('vehicle_id')
        # print(Employee.objects)

        # driver = Employee.objects.get(id=driver_id)
        vehicle = Vehicle.objects.get(id=vehicle_id)
        #breakpoint()
        vehicle_type = vehicle.vehicle_type
        driver_id = vehicle.employees.first().id
        # print(driver, vehicle, vehicle_type)
        # vehicle_type = vehicle.get('vehicle_type')

        ride = Ride(
            origin=origin,
            destination=destination,
            passengers=passengers,
            origin_latitude=origin_latitude,
            origin_longitude=origin_longitude,
            destination_latitude=destination_latitude,
            destination_longitude=destination_longitude,
            vehicle_type=vehicle_type,
            departure_time=departure_time,
            # arrival_time=arrival_time,
            # driver_id=driver_id,
            # vehicle_id=vehicle_id
        )
        breakpoint()
        ride.save()
        breakpoint()
        # breakpoint()
        # breakpoint()
        # ride.employees.set([driver_id])
        # ride.vehicles.set([vehicle])

        return Response({"message": "Ride created successfully."}, status=status.HTTP_201_CREATED)


class LocationAutocompleteView(APIView):
    def get(self, request):
        query = request.GET.get('q')
        if not query:
            return JsonResponse({'error': 'Missing required parameter.'}, status=400)

        response = requests.get('https://api.locationiq.com/v1/autocomplete', params={
            'key': 'pk.a81422c5e313a53d03e8254b6e5da929',
            'q': query,
            'limit':'5',
            'dedupe':'1',
        })
        data = response.json()
        location = []
        for entry in data:
            # Extract the required fields
            display_place = entry.get('display_place')
            display_address = entry.get('display_address')
            lat = entry.get('lat')
            lon = entry.get('lon')

            # Add the extracted data to the list
            location.append({
                'display_place': display_place,
                'display_address': display_address,
                'lat': lat,
                'lon': lon,
            })
        print(location)
        return JsonResponse(location, safe=False)



@method_decorator(csrf_exempt, name='dispatch')
class VehicleView(View):
    def post(self, request):
        vehicle_id = request.POST.get('vehicle_id')
        model = request.POST.get('model')
        number_of_seats = request.POST.get('number_of_seats')
        vehicle_type = request.POST.get('vehicle_type')
        employee_ids = request.POST.get('employee_ids')
        print(employee_ids)
        print( type(employee_ids))
        if Vehicle.objects.filter(vehicle_id=vehicle_id).exists():
            return JsonResponse({"error": "A vehicle with this ID already exists."}, status=400)

        employees = Employee.objects.get(employee_id=employee_ids)
        # print(Employee.objects.get(employee_id=employee_ids))
        # print(Employee.objects.get(employee_id=employee_ids))
        # breakpoint()
        # print(Employee.objects.filter(employee_id__in=employee_ids))
        # print("yes")
        # if len(employees) != len(employee_ids):
        #     return JsonResponse({"error": "Some employees with provided IDs do not exist."}, status=400)

        vehicle = Vehicle(vehicle_id=vehicle_id, model=model, number_of_seats=number_of_seats, vehicle_type=vehicle_type)
        vehicle.save()
        vehicle.employees.set([employees])

        return JsonResponse({"message": "Vehicle created successfully."}, status=201)


class SignUpView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = SignUpSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SignInView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = SignInSerializer(data=request.data)

        if serializer.is_valid():
            return Response({'message': 'Successful login!'}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class EmployeeVehiclesView(APIView):
    def get(self, request, employee_id, format=None):
        employee = get_object_or_404(Employee, employee_id=employee_id)
        vehicles = Vehicle.objects.filter(employees=employee)
        serializer = VehicleSerializer(vehicles, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)



class AvailableRidesView(APIView):
    def post(self, request, format=None):
        user_origin_lat = request.data.get('origin_lat')
        user_origin_lng = request.data.get('origin_lng')
        user_destination_lat = request.data.get('destination_lat')
        user_destination_lng = request.data.get('destination_lng')
        departure_time = request.data.get('departure_time')

        # Convert departure_time to datetime object
        departure_time = datetime.strptime(departure_time, "%Y-%m-%dT%H:%M:%S")

        # Get all rides that start close to the user's departure time
        rides = Ride.objects.filter(departure_time__range=(departure_time - timedelta(minutes=30), departure_time + timedelta(minutes=30)))

        available_rides = []

        for ride in rides:
            # Get the route from the ride's origin to its destination
            response1 = requests.get(f"https://eu1.locationiq.com/v1/directions/driving/{ride.origin_longitude},{ride.origin_latitude};{ride.destination_longitude},{ride.destination_latitude}?key=YOUR KEY HERE")
            total = response1.json()['routes'][0]['distance']

            # Get the route from the ride's origin to the user's destination, and from the user's destination to the ride's destination
            response2 = requests.get(f"https://eu1.locationiq.com/v1/directions/driving/{ride.origin_longitude},{ride.origin_latitude};{user_destination_lng},{user_destination_lat}?key=YOUR KEY HERE")
            response3 = requests.get(f"https://eu1.locationiq.com/v1/directions/driving/{user_destination_lng},{user_destination_lat};{ride.destination_longitude},{ride.destination_latitude}?key=YOUR KEY HERE")
            sum_of_distances = response2.json()['routes'][0]['distance'] + response3.json()['routes'][0]['distance']

            # If the total distance and the sum of the two distances are approximately equal, add the ride to the list of available rides
            if abs(total - sum_of_distances) < 1000:  # 1000 meters = 1 kilometer
                ride_data = {
                    'origin': ride.origin,
                    'destination': ride.destination,
                    'origin_lat': ride.origin_latitude,
                    'origin_lng': ride.origin_longitude,
                    'destination_lat': ride.destination_latitude,
                    'destination_lng': ride.destination_longitude,
                    'vehicle_type': ride.vehicle_type,
                    'driver': ride.driver.name,
                    'departure_time': ride.departure_time.strftime("%Y-%m-%dT%H:%M:%S")
                }
                available_rides.append(ride_data)

        return Response(available_rides, status=status.HTTP_200_OK)