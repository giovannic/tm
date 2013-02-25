from django.db import models
from jsonfield import JSONField
from django.conf import settings
import foursquare

# Create your models here.
class categories(models.Model):
	parent = models.CharField(max_length = 512, primary_key = True)
	raw_categories = JSONField()
	new_categories = JSONField()
	parent_cat = models.ForeignKey('self', blank = True, null = True, related_name = 'children_categories')

	def get_categories(self):
		client = foursquare.Foursquare(client_id= settings.FSQ_CLIENT_ID, client_secret = settings.FSQ_CLIENT_SECRET)
		self.raw_categories = client.venues.categories()
		self.new_categories = {}
		for base_category in self.raw_categories['categories']:
			self.new_categories[base_category['name']] = base_category
		for base_category in self.new_categories.keys():	
			for sub_category in self.new_categories[base_category]['categories']:
				self.new_categories[base_category][sub_category['name']] = sub_category
		for key in [u'College & University', u'Residence', u'Travel & Transport', u'Professional & Other Places']:
			self.new_categories.pop(key)
		self.save()

	def dump_children_categories(self):
		for key in self.new_categories:
			print key
			h = categories.objects.get_or_create(
				parent = key, 
				raw_categories = self.new_categories[key], 
				new_categories = self.new_categories[key],
				parent_cat = self)
			h[0].save()
						

class all_city_scores(models.Model):
	categories = models.ForeignKey(categories)
	all_scores = JSONField()
	cities = JSONField()
	cities_geocodes = JSONField()


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