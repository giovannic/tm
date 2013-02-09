from tastypie.api import Api
from tastypie.resources import ModelResource
from tastypie.authorization import Authorization 
from tastypie import fields
from foursquare_ratings.models import CityScore
from tastypie.constants import ALL, ALL_WITH_RELATIONS

class CityScoreResource(ModelResource):
    class Meta:
      queryset = CityScore.objects.all()
      authorization = Authorization()
      fields = ['name','weighed_scores']
      always_return_data = True
      filtering = {'name' : ALL}
      max_limit = None
      limit = 100

class CityLocationResource(ModelResource):
    class Meta:
      queryset = CityScore.objects.all()
      authorization = Authorization()
      fields = ['name','longitude', 'latitude', 'country_code']
      always_return_data = True
      filtering = {'name' : ALL}   
      max_limit = None   
      limit = 100