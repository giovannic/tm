from django.db import models
import foursquare
from cities import cities 
from jsonfield import JSONField
from django.conf import settings


class categories(models.Model):
	parent = models.CharField(max_length = 512, primary_key = True)
	raw_categories = JSONField()
	new_categories = JSONField()

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


class CityScore(models.Model):
	name = models.CharField(max_length = 255, unique = True)
	country_code = models.CharField(max_length = 3)
	raw_scores = JSONField()
	total_checkins = models.FloatField()
	venues = JSONField()
	weighed_scores = JSONField()
	latitude = models.FloatField()
	longitude = models.FloatField()

	def update_score(self, city_scores, categories):
		if not self.raw_scores:
			self.raw_scores = {}
		if not self.venues:
			self.venues = {}	
		for key in categories:
			self.raw_scores[key] = float()
			self.venues[key] = []
			for result in city_scores.all_scores[self.name][key]:
				self.raw_scores[key]+=float(result['stats']['checkinsCount']+result['stats']['usersCount'])
				self.venues[key].append(result)
		self.save()	

	def get_total_checkins(self):
		self.total_checkins = float()
		for key in self.raw_scores:
			self.total_checkins += self.raw_scores[key]
			self.save()

	def get_weighed_scores(self):
		if not self.weighed_scores:
			self.weighed_scores = {}
		self.get_total_checkins()
		for key in self.raw_scores:
			self.weighed_scores[key] = self.raw_scores[key]/self.total_checkins
		self.save()	
