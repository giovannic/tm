from django.db import models
from props.models import City
from categories.models import Category
from props.models import DataSource

# Create your models here.
class Venue(models.Model):

	name = models.CharField(max_length = 1023)
	latitude = models.FloatField()
	longitude = models.FloatField()
	checkinsCount = models.IntegerField()
	city = models.ForeignKey(City, related_name = "venues", blank=True ,null = True)
	category = models.ForeignKey(Category, blank = True, null = True, related_name = "venues")
	dataSource = models.ForeignKey(DataSource, blank = True, null = True, related_name = "venue") 

	def __unicode__(self):
		return self.name+","+self.city.name