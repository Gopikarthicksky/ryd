# urls.py
from django.urls import path
from .views import RideListView, RideDetailView, AvailableRidesView

urlpatterns = [
    path('rides/', RideListView.as_view(), name='ride_list'),
    path('rides/<int:pk>/', RideDetailView.as_view(), name='ride_detail'),
    path('available_rides/', AvailableRidesView.as_view(), name='available_rides'),
]