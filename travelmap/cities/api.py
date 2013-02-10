from tastypie.api import Api
from tastypie.resources import ModelResource
from tastypie.authorization import Authorization 
from tastypie import fields
from cities.models import City, Hotel, Flight

class CityResource(ModelResource):
    class Meta:
      queryset = City.objects.all()
      authorization = Authorization()
      fields = ['name']
      always_return_data = True

class HotelResource(ModelResource):
    city = fields.ToOneField(CityResource, 'city', full=True)
    class Meta:
      queryset = Hotel.objects.all()
      authorization = Authorization()
      always_return_data = True

class FlightResource(ModelResource):
  country = fields.ToOneField(CityResource, 'country', full=True)
  class Meta:
      queryset = Flight.objects.all()
      authorization = Authorization()
      always_return_data = True
