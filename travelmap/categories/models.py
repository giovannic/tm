from django.db import models
from jsonfield import JSONField
from props.models import DataSource


# Create your models here.
class Category(models.Model):
	name = models.CharField(max_length = 512, primary_key = True)
	parentCat = models.ForeignKey('self', blank = True, null = True, related_name = 'children_categories')
	dataSource = models.ForeignKey(DataSource, blank = True, null =True)

	def __unicode__(self):
		return self.name