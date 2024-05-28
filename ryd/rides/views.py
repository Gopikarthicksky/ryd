# views.py
from django.http import JsonResponse
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from .models import Ride
from django.core import serializers
from django.shortcuts import get_object_or_404
from django.db.models import Q
from datetime import datetime
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

@method_decorator(csrf_exempt, name='dispatch')
class RideListView(View):
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
class RideDetailView(View):
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


class AvailableRidesView(APIView):
    def post(self, request, format=None):
        data = request.data
        origin = data.get('origin')
        destination = data.get('destination')
        passengers = data.get('passengers')
        origin_latitude = data.get('origin_latitude')
        origin_longitude = data.get('origin_longitude')
        destination_latitude = data.get('destination_latitude')
        destination_longitude = data.get('destination_longitude')
        vehicle_type = data.get('vehicle_type')
    
        return None

class LocationAutocompleteView(View):
    def get(self, request):
        query = request.GET.get('query')
        if not query:
            return JsonResponse({'error': 'Missing required parameter.'}, status=400)

        response = requests.get('https://api.locationiq.com/v1/autocomplete', params={
            'key': 'your-opencage-api-key',
            'q': query,
            'limit':'5',
            'dedupe':'1',
        })

        return JsonResponse(response.json(), safe=False)
