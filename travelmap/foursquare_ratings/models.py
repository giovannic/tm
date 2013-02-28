from django.db import models
from jsonfield import JSONField
from props.models import City
from venues.models import Venue
import foursquare

class CityScore(models.Model):
	latitude = models.FloatField()
	longitude = models.FloatField()
	city = models.ForeignKey(City, related_name='score_for_city', null = True, blank = True)
	name = models.CharField(max_length = 255, unique = True)
	country_code = models.CharField(max_length = 3)
	raw_scores = JSONField()
	total_checkins = models.FloatField()
	venues = JSONField()
	weighed_scores = JSONField()

	def __unicode__(self):

		return self.name+", "+self.country_code

	def update_score(self, city_scores, categories):
		if not self.raw_scores:
			self.raw_scores = {}
		if not self.venues:
			self.venues = {}	
		for key in categories:
			self.raw_scores[key] = float()
			self.venues[key] = []
			for result in city_scores.all_scores[self.name][key]:
				self.raw_scores[key]+=float(result['stats']['checkinsCount'])
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

	def get_venues(self):
		venues = {}
		venues[self.name] = []
			
		for key in self.venues.keys():
			for place in self.venues[key]:
				name = place['name']
				latitude = float(place['location']['lat'])
				longitude = float(place['location']['lng'])
				count = float(place['stats']['checkinsCount'])/self.total_checkins
				city = self.city
				total_checkins = self.total_checkins
				venue = {'name': name, 'latitude': latitude, 'longitude': longitude, 'checkinsCount': count, 'city':city, 'total_checkins': total_checkins}
				venues[self.name].append(venue)
				Venue.objects.get_or_create(**venue)
		return venues		
