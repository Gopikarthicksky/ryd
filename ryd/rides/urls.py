# urls.py
from django.urls import path
from .views import RideListView, RideDetailView, AvailableRidesView, LocationAutocompleteView

urlpatterns = [
    path('rides/', RideListView.as_view(), name='ride_list'),
    path('rides/<int:pk>/', RideDetailView.as_view(), name='ride_detail'),
    path('available_rides/', AvailableRidesView.as_view(), name='available_rides'),
    path('location_autocomplete/', LocationAutocompleteView.as_view(), name='to_location_autocomplete'),
]