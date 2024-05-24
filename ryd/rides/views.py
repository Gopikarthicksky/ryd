from django.http import JsonResponse
from django.views import View
from .models import Ride
from django.core import serializers

class RideListView(View):
    def get(self, request):
        rides = Ride.objects.all()
        ride_list = serializers.serialize('json', rides)
        return JsonResponse(ride_list, safe=False)

class RideDetailView(View):
    def get(self, request, pk):
        ride = Ride.objects.get(id=pk)
        ride_detail = serializers.serialize('json', [ride])
        return JsonResponse(ride_detail, safe=False)