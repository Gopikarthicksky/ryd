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


class AvailableRidesView(View):
    def get(self, request):
        source = request.GET.get('source')
        destination = request.GET.get('destination')
        passengers = request.GET.get('passengers')
        date = request.GET.get('date')

        if not all([source, destination, passengers, date]):
            return JsonResponse({'error': 'Missing required parameters.'}, status=400)

        date = datetime.strptime(date, '%Y-%m-%d')

        rides = Ride.objects.filter(
            Q(origin=source) &
            Q(destination=destination) &
            Q(available_seats__gte=passengers) &
            Q(departure_time__date=date)
        )

        ride_list = serializers.serialize('json', rides)
        return JsonResponse(ride_list, safe=False)


class FromLocationAutocompleteView(View):
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


class ToLocationAutocompleteView(View):
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