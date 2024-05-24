# urls.py
from django.urls import path
from .views import RideListView, RideDetailView, AvailableRidesView, FromLocationAutocompleteView, ToLocationAutocompleteView

urlpatterns = [
    path('rides/', RideListView.as_view(), name='ride_list'),
    path('rides/<int:pk>/', RideDetailView.as_view(), name='ride_detail'),
    path('available_rides/', AvailableRidesView.as_view(), name='available_rides'),
    path('from_location_autocomplete/', FromLocationAutocompleteView.as_view(), name='from_location_autocomplete'),
    path('to_location_autocomplete/', ToLocationAutocompleteView.as_view(), name='to_location_autocomplete'),
]