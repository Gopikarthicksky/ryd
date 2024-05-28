# urls.py
from django.urls import path
from .views import RideListView, RideDetailView, AvailableRidesView, LocationAutocompleteView, RegisterVehicleView, SignUpView, SignInView

urlpatterns = [
    path('rides/', RideListView.as_view(), name='ride_list'),
    path('rides/<int:pk>/', RideDetailView.as_view(), name='ride_detail'),
    path('available_rides/', AvailableRidesView.as_view(), name='available_rides'),
    path('location_autocomplete/', LocationAutocompleteView.as_view(), name='to_location_autocomplete'),
    path('register_vehicle/', RegisterVehicleView.as_view(), name='register_vehicle'),
    path('signup/', SignUpView.as_view(), name='signup'),
    path('signin/', SignInView.as_view(), name='signin'),
]