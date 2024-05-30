# urls.py
from django.urls import path
from .views import RideListView, RideDetailView, CreateRideView, LocationAutocompleteView, SignUpView, SignInView, VehicleView, EmployeeVehiclesView, AvailableRidesView

urlpatterns = [
    path('rides/', RideListView.as_view(), name='ride_list'),
    path('rides/<int:pk>/', RideDetailView.as_view(), name='ride_detail'),
    path('create_ride/', CreateRideView.as_view(), name='available_rides'),
    path('location_autocomplete/', LocationAutocompleteView.as_view(), name='to_location_autocomplete'),
    path('register_vehicle/', VehicleView.as_view(), name='vehicle-create'),
    path('signup/', SignUpView.as_view(), name='signup'),
    path('signin/', SignInView.as_view(), name='signin'),
    path('api/employee/<int:employee_id>/vehicles/', EmployeeVehiclesView.as_view(), name='employee-vehicles'),
    path('available_rides/', AvailableRidesView.as_view(), name='available_rides_list')
]