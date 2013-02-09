from django.db import models
import foursquare
from cities import cities
import jsonfield

def get_categories():
	client = foursquare.Foursquare(client_id= settings.FSQ_CLIENT_ID, client_secret = settings.FSQ_CLIENT_SECRET)
	categories = {}
	for base_category in client.venues.categories()['categories']:
		categories[base_category['name']] = base_category
	for base_category in categories.keys():	
		for sub_category in categories[base_category]['categories']:
			categories[base_category][sub_category['name']] = sub_category
	for key in [u'College & University', u'Residence', u'Travel & Transport', u'Professional & Other Places']:
		categories.pop(key)	

class ScoreManager(models.Manager):


class CityScore(models.Model):
	name = models.CharField(max_length = 255, unique = True)
	country_code = models.CharField(max_length = 3)
	total = models.

client = foursquare.Foursquare(client_id= settings.FSQ_CLIENT_ID, client_secret = settings.FSQ_CLIENT_SECRET)
categories = {}
for base_category in client.venues.categories()['categories']:
	categories[base_category['name']] = base_category
for base_category in categories.keys():	
	for sub_category in categories[base_category]['categories']:
		categories[base_category][sub_category['name']] = sub_category
for key in [u'College & University', u'Residence', u'Travel & Transport', u'Professional & Other Places']:
	categories.pop(key)




params ={'near':'city', 'limit':50, 'intent': 'browse', 'categoryId' : '','radius': 100000}
res = {}
for city in cities:
	res[city] = {}
	params['near'] = city
	for cat in categories.keys():
		params['categoryId'] = categories[cat]['id']
		dump = client.venues.search(params=params)
		res[city][categories[cat]['name']] = dump['venues']
	res[city]['geocode'] = dump['geocode']	
	print(city)	

main_keys = [u'Food', u'Outdoors & Recreation', u'Arts & Entertainment', u'Shop & Service', u'Nightlife Spot']

score = {}

for city in cities:
	score[city]={}
	score[city]['total']=float()
	for key in main_keys:
		score[city][key] = float()
		for result in res[city][key]:
			score[city][key]+=float(result['stats']['checkinsCount']+result['stats']['usersCount'])
		score[city]['total']+=score[city][key]
	print(score[city]['total'], city)
