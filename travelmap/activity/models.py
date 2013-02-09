from django.db import models
from cities.models import City

class Activity(models.Model):
  city = models.ForeignKey(City)
  #loads of useful fields
