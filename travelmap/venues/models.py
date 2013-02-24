from django.db import models
from cities.models import City
# Create your models here.
class Venue(models.Model):
	name = models.CharField(max_length = 1023)
	latitude = models.FloatField()
	longitude = models.FloatField()
	checkinsCount = models.FloatField()
	city = models.ForeignKey(City, related_name = "venues", blank=True ,null = True)
	total_checkins = models.FloatField()
	#category = models.ForeignKey(blank = True, null = True)

	def __unicode__(self):
		return self.name+","+self.city.name