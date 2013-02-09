from django.db import models

class City(models.Model):
  name = models.CharField(max_length=200)

class Airport(models.Model):
  code = models.CharField(primary_key=True, max_length=3)
  city = models.ForeignKey(City)

class Hotel(models.Model):
  name = models.CharField(primary_key=True, max_length=200)
  city = models.ForeignKey(City)

class Score(models.Model):
  type = models.CharField(max_length=100)
  city = models.ForeignKey(City)

class Stay(models.Model):
  hotel = models.ForeignKey(Hotel, related_name='host')
  nights = models.IntegerField()
  cost = models.FloatField()

class Flight(models.Model):
  dep = models.ForeignKey(Airport, related_name='dep')
  dst = models.ForeignKey(Airport, related_name='dst')
  cost = models.FloatField()
