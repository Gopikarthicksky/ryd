# views.py
import requests
from django.contrib.auth import authenticate, login, get_user_model
from django.contrib.auth import SESSION_KEY, BACKEND_SESSION_KEY, HASH_SESSION_KEY
from django.contrib.auth.hashers import check_password
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
from .serializers import SignUpSerializer, SignInSerializer, VehicleSerializer, RideSerializer
from .models import Vehicle, Employee, Ride, RideRequest, RideResponse
from django.utils.dateparse import parse_datetime
from rest_framework import status
from django.shortcuts import get_object_or_404

@method_decorator(csrf_exempt, name='dispatch')
class RideListView(APIView):
    def get(self, request):
        rides = Ride.objects.all()
        serializer = RideSerializer(rides, many=True)
        return Response(serializer.data)

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
        return JsonResponse({'ride_id': new_ride.id}, status=status.HTTP_201_CREATED)


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
            return JsonResponse({'message': 'Successfully joined the ride.'}, status=status.HTTP_200_OK)
        elif 'leave' in request.POST:
            ride.passengers.remove(request.user)
            ride.available_seats += 1
            ride.save()
            return JsonResponse({'message': 'Successfully left the ride.'}, status=status.HTTP_200_OK)
        else:
            return JsonResponse({'error': 'Invalid action.'}, status=status.HTTP_400_BAD_REQUEST)

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
        # breakpoint()
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
            driver=driver_id,
            vehicle=vehicle_id
        )
        ride.save()
        # breakpoint()
        # breakpoint()
        # ride.employees.set([driver_id])
        # ride.vehicles.set([vehicle])

        return Response({"message": "Ride created successfully."}, status=status.HTTP_201_CREATED)


class LocationAutocompleteView(APIView):
    def get(self, request):
        query = request.GET.get('q')
        if not query:
            return JsonResponse({'error': 'Missing required parameter.'}, status=status.HTTP_400_BAD_REQUEST)

        response = requests.get('https://api.locationiq.com/v1/autocomplete', params={
            'key': 'pk.a81422c5e313a53d03e8254b6e5da929',
            'q': query,
            'limit':'5',
            'dedupe':'1',
        })
        data = response.json()
        location = []
        if data:
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
        if Vehicle.objects.filter(vehicle_id=vehicle_id).exists():
            return JsonResponse({"error": "A vehicle with this ID already exists."}, status=status.HTTP_400_BAD_REQUEST)
        if vehicle_type == 'MC' and number_of_seats != '1':
            return JsonResponse({'error': 'Motorcycles must have exactly 1 seat.'}, status=status.HTTP_400_BAD_REQUEST)

        employees = Employee.objects.get(employee_id=employee_ids)
        # print(Employee.objects.get(employee_id=employee_ids))
        # print(Employee.objects.get(employee_id=employee_ids))
        # breakpoint()
        # print(Employee.objects.filter(employee_id__in=employee_ids))
        # print("yes")
        # if len(employees) != len(employee_ids):
        #     return JsonResponse({"error": "Some employees with provided IDs do not exist."}, status=status.HTTP_400_BAD_REQUEST)

        vehicle = Vehicle(vehicle_id=vehicle_id, model=model, number_of_seats=number_of_seats, vehicle_type=vehicle_type)
        vehicle.save()
        vehicle.employees.set([employees])

        return JsonResponse({"message": "Vehicle created successfully."}, status=status.HTTP_201_CREATED)


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
        print("coming in")
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

        key = "pk.fe474ac2da54fec72364bd4f6ef67a90"
        for ride in rides:
            # Get the route from the ride's origin to its destination

            response1 = requests.get(f"https://eu1.locationiq.com/v1/directions/driving/{ride.origin_longitude},{ride.origin_latitude};{ride.destination_longitude},{ride.destination_latitude}?key={key}")
            total = response1.json()['routes'][0]['distance']

            # Get the route from the ride's origin to the user's destination, and from the user's destination to the ride's destination
            if ride.destination_latitude == user_destination_lat:
                response2 = requests.get(f"https://eu1.locationiq.com/v1/directions/driving/{ride.origin_longitude},{ride.origin_latitude};{user_origin_lng},{user_origin_lat}?key={key}")
                response3 = requests.get(f"https://eu1.locationiq.com/v1/directions/driving/{user_origin_lng},{user_origin_lat};{ride.destination_longitude},{ride.destination_latitude}?key={key}")
            else:
                response2 = requests.get(f"https://eu1.locationiq.com/v1/directions/driving/{ride.destination_longitude},{ride.destination_latitude};{user_destination_lng},{user_destination_lat}?key={key}")
                response3 = requests.get(f"https://eu1.locationiq.com/v1/directions/driving/{user_origin_lng},{user_origin_lat};{user_destination_lng},{user_destination_lat}?key={key}")
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
                    'driver': Employee.objects.get(id=ride.driver).name,
                    'departure_time': ride.departure_time.strftime("%Y-%m-%dT%H:%M:%S")
                }
                available_rides.append(ride_data)
        return JsonResponse({"rides":available_rides}, status=status.HTTP_200_OK)
    

@method_decorator(csrf_exempt, name='dispatch')
class CreateRideRequestView(View):
    def post(self, request, *args, **kwargs):
        employee_id = request.POST.get('employee_id')
        ride_id = request.POST.get('ride_id')

        employee = Employee.objects.get(id=employee_id)
        ride = Ride.objects.get(id=ride_id)
        
        if RideRequest.objects.filter(ride_id=ride).exists():
            return JsonResponse({'error': 'A request for this ride request already exists.'}, status=status.HTTP_400_BAD_REQUEST)
        ride_request = RideRequest()
        ride_request.create_request(employee, ride)

        return JsonResponse({'message': 'Ride request created successfully'}, status=status.HTTP_201_CREATED)

@method_decorator(csrf_exempt, name='dispatch')
class CreateRideResponseView(View):
    def post(self, request, *args, **kwargs):
        driver_id = request.POST.get('driver_id')
        ride_request_id = request.POST.get('ride_request_id')
        ride_status = request.POST.get('status')
        # try:
        #     ride_request = RideRequest.objects.create(ride_request_id=ride_request_id)
        # except IntegrityError:
        #     return Response({"error": "A ride request with this ID already exists."}, status=400)

        try:
            ride_request = RideRequest.objects.get(id=ride_request_id)
            driver = Employee.objects.get(id=driver_id)
        except RideRequest.DoesNotExist:
            return JsonResponse({'error': 'Ride request not found.'}, status=status.HTTP_404_NOT_FOUND)
        except Employee.DoesNotExist:
            return JsonResponse({'error': 'Driver not found.'}, status=status.HTTP_404_NOT_FOUND)
        
        if RideResponse.objects.filter(ride_request_id=ride_request_id).exists():
            return JsonResponse({'error': 'A response for this ride request already exists.'}, status=status.HTTP_400_BAD_REQUEST)

        ride_response = RideResponse()
        ride_response.ride_request = ride_request
        if ride_status == 'A':
            ride_response.accept_request(driver)
            return JsonResponse({'message': 'Ride request accepted successfully'}, status=status.HTTP_201_CREATED)
        elif ride_status == 'R':
            ride_response.reject_request(driver)
            return JsonResponse({'message': 'Ride request rejected successfully'}, status=status.HTTP_201_CREATED)
    
@method_decorator(csrf_exempt, name='dispatch')
class RideRequestResponseView(View):
    def get(self, request, *args, **kwargs):
        ride_request_id = request.GET.get('ride_request_id')

        ride_request = RideRequest.objects.get(id=ride_request_id)
        ride_responses = RideResponse.objects.filter(ride_request=ride_request)

        response_data = {
            'ride_request': {
                'employee': ride_request.employee.name,
                'ride': ride_request.ride.id,
            },
            'ride_responses': [
                {
                    'driver': ride_response.driver.name,
                    'status': ride_response.status,
                } for ride_response in ride_responses
            ]
        }

        return JsonResponse(response_data, status=status.HTTP_200_OK)
    

class CancelRideRequestView(APIView):
    def post(self, request, ride_request_id):
        try:
            breakpoint()
            ride_request = RideRequest.objects.get(id=ride_request_id)
        except RideRequest.DoesNotExist:
            return Response({'error': 'Ride request not found.'}, status=status.HTTP_404_NOT_FOUND)

        ride_request.status = 'C'
        ride_request.save()

        return Response({'message': 'Ride request cancelled successfully'}, status=status.HTTP_200_OK)