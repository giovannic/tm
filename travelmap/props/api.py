from tastypie.api import Api
from tastypie.resources import ModelResource
from tastypie.authorization import Authorization 
from tastypie import fields
from props.models import City, Hotel, Flight, DataSource
from django.db.models import Avg

class CityResource(ModelResource):
    class Meta:
      queryset = City.objects.annotate(
	flight = Avg('destination__cost'),
	hotels = Avg('hotel_in__rate')
	)
      authorization = Authorization()
      always_return_data = True

class DataSourceResource(ModelResource):
    class Meta:
      queryset = DataSource.objects.all()
      always_return_data = True

class HotelResource(ModelResource):
    city = fields.ToOneField(CityResource, 'city', full=False)
    source = fields.ToOneField(DataSourceResource, 'source', full=True)
    class Meta:
      queryset = Hotel.objects.all()
      authorization = Authorization()
      always_return_data = True

class FlightResource(ModelResource):
    country = fields.ToOneField(CityResource, 'country', full=False)
    source = fields.ToOneField(DataSourceResource, 'source', full=True)
    class Meta:
      queryset = Flight.objects.all()
      authorization = Authorization()
      always_return_data = True
