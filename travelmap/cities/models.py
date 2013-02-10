from django.db import models

class City(models.Model):
  name = models.CharField(max_length=200)
  country = models.CharField(max_length=200)
  long = models.FloatField()
  lat = models.FloatField()

class Hotel(models.Model):
  name = models.CharField(primary_key=True, max_length=200)
  city = models.ForeignKey(City, related_name='hotel_in')
  rate = models.IntegerField()
  stars = models.FloatField()
  long = models.FloatField()
  lat = models.FloatField()

class Score(models.Model):
  type = models.CharField(max_length=100)
  city = models.ForeignKey(City)

class Flight(models.Model):
  country = models.ForeignKey(City, related_name='destination')
  cost = models.FloatField()
  distance = models.FloatField()
