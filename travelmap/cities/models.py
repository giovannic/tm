from django.db import models

class City(models.Model):
  name = models.CharField(max_length=200)
  country = models.CharField(max_length=200)
  long = models.FloatField()
  lat = models.FloatField()

class ExtUrl(models.Model):
  ref = models.CharField(max_length=1000)
  hits = models.IntegerField(default=0)

class Hotel(models.Model):
  name = models.CharField(primary_key=True, max_length=200)
  city = models.ForeignKey(City, related_name='hotel_in')
  rate = models.IntegerField()
  stars = models.FloatField()
  long = models.FloatField()
  lat = models.FloatField()
  source = models.ForeignKey(ExtUrl, related_name='hotel_source', null=True)
  filtering = {
      'stars' : ('gte', 'lte',),
      'rate' : ('gte', 'lte',),
      }
  ordering = ['city']

class Flight(models.Model):
  country = models.ForeignKey(City, related_name='destination')
  cost = models.FloatField()
  distance = models.FloatField()
  source = models.ForeignKey(ExtUrl, related_name='flight_source', null=True)
  filtering = {
      'cost' : ('gte', 'lte',),
      'distance' : ('gte', 'lte',),
      }
