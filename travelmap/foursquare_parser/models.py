from django.db import models
from jsonfield import JSONField
from django.conf import settings
import foursquare

# Create your models here.
#Hi GEO. If you're looking at this, stop. 
#This is just a model to store python dicts from foursquare API so that i can manipulatea them more easily. 
#all objects are deleted after parsing foursquare.

	
class all_city_scores(models.Model):
	all_scores = JSONField()


	def get_city_scores(self, cities, categories):
		self.cities = cities
		if not self.all_scores:
			self.all_scores = {}
		client = foursquare.Foursquare(client_id= settings.FSQ_CLIENT_ID, client_secret = settings.FSQ_CLIENT_SECRET)
		params ={'near':'city', 'limit':50, 'intent': 'browse', 'categoryId' : '','radius': 100000}
		res = {}
		if not self.cities_geocodes:
			self.cities_geocodes = {}

		for city in cities:
			self.all_scores[city] = {}
			params['near'] = city
			for cat in categories.keys():
				params['categoryId'] = categories[cat]['id']
				dump = client.venues.search(params=params)
				self.all_scores[city][categories[cat]['name']] = dump['venues']
			self.cities_geocodes[city] = dump['geocode']

			print(city)	
		self.save()			