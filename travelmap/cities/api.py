from tastypie.api import Api
from tastypie.resources import ModelResource
from tastypie.authorization import Authorization 
from tastypie import fields
from cities.models import City, Airport, Hotel, Score, Stay, Flight

class CityResource(ModelResource):
    class Meta:
      queryset = City.objects.all()
      authorization = Authorization()
      fields = ['name']
      always_return_data = True

class AirportResource(ModelResource):
    class Meta:
      queryset = Airport.objects.all()
      authorization = Authorization()
      fields = ['code', 'city']
      always_return_data = True

class HotelResource(ModelResource):
    class Meta:
      queryset = Hotel.objects.all()
      authorization = Authorization()
      fields = ['name', 'city']
      always_return_data = True

class FlightResource(ModelResource):
    class Meta:
      queryset = Flight.objects.all()
      authorization = Authorization()
      fields = ['dep', 'dst']
      always_return_data = True
