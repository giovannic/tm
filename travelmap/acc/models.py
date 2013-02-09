from django.db import models
from cities.models import Hotel

class Stay(models.Model):
  hotel = models.ForeignKey(Hotel, related_name='hotel')
  nights = models.IntegerField()
  cost = models.FloatField()
