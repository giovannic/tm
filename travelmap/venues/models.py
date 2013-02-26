from django.db import models
from cities.models import City
from categories.models import Category
# Create your models here.
class Venue(models.Model):

	name = models.CharField(max_length = 1023)
	latitude = models.FloatField()
	longitude = models.FloatField()
	checkinsCount = models.IntegerField()
	city = models.ForeignKey(City, related_name = "venues", blank=True ,null = True)
	category = models.ForeignKey(Category, blank = True, null = True, related_name = "venues")

	def __unicode__(self):
		return self.name+","+self.city.name