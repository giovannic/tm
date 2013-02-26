from tastypie.api import Api
from tastypie.resources import ModelResource
from tastypie.authorization import Authorization 
from tastypie import fields
from cities.models import City, Hotel, Flight, ExtUrl

class CitySummaryResource(ModelResource):
  class Meta:

class CityResource(ModelResource):
    class Meta:
      queryset = City.objects.annotate(
	flight = Avg('destination__cost'),
	hotels = Avg('hotel_in__rate')
	activity = )
      authorization = Authorization()
      always_return_data = True

class ExtUrlResource(ModelResource):
    class Meta:
      queryset = ExtUrl.objects.all()
      always_return_data = True

class HotelResource(ModelResource):
    city = fields.ToOneField(CityResource, 'city', full=False)
    source = fields.ToOneField(ExtUrlResource, 'source', full=True)
    class Meta:
      queryset = Hotel.objects.all()
      authorization = Authorization()
      always_return_data = True

class FlightResource(ModelResource):
    country = fields.ToOneField(CityResource, 'country', full=False)
    source = fields.ToOneField(ExtUrlResource, 'source', full=True)
    class Meta:
      queryset = Flight.objects.all()
      authorization = Authorization()
      always_return_data = True
