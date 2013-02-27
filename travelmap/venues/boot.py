import foursquare
from django.conf import settings
from categories.models import Category
from props.models import DataSource, City 
from venues.models import Venue
#get foursquare client
def getClient():
	client = foursquare.Foursquare(client_id= settings.FSQ_CLIENT_ID, client_secret = settings.FSQ_CLIENT_SECRET)
	return client
def getEUCities():
	return execfile('venues/city_list_europe.py')

def getVenues(city_list, cat_list, client):
	params ={
		'near': '', 
		'radius': 100000, 
		'intent': 'browse',
		'categoryId': '',
		'limit': 50,}

	venues = {}

	for city in city_list:
		print city
		if type(city) is not str:
			city = city.name
		params['near'] = city
		venues[city] = {}
		ignore = ["Travel & Transport", "Residence", "Professional & Other Places", "College & University"]	
		for cat in cat_list:
			if cat.name in ignore:
				pass;
			else:
				print cat.name
				venues[city][cat] = []
				params['categoryId'] = cat.dataSource.ref
				res = client.venues.search(params)
				venues[city][cat].extend(res['venues'])
	return venues

def loadVenues(venues):
	for key in venues:
		try:
			city = City.objects.get(name = key)
		except Exception:
			pass;
		for cat in venues[key]:
			category = Category.objects.get(name = cat)
			for place in venues[key][cat]:
				name = place['name']
				data_source = DataSource.objects.get_or_create(ref=place['id'])[0]
				latitude = float(place['location']['lat'])
				longitude = float(place['location']['lng'])
				count = float(place['stats']['checkinsCount'])



				venue = {
					'name': name, 
					'latitude': latitude, 
					'longitude': longitude, 
					'checkinsCount': count, 
					'city':city, 
					'category': None,
					'dataSource': data_source,}
				venue = Venue.objects.get_or_create(**venue)
				for

def getCategoriesForVenue(venue_categories):



				










