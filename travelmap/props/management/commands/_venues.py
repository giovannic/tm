import foursquare
from django.conf import settings
from categories.models import Category
from props.models import DataSource, City 
from venues.models import Venue
#get foursquare client
def getClient():
	client = foursquare.Foursquare(client_id= settings.FSQ_CLIENT_ID, client_secret = settings.FSQ_CLIENT_SECRET)
	return client

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
				venues[city][cat.name] = []
				params['categoryId'] = cat.dataSource.ref
				res = client.venues.search(params)
				venues[city][cat.name].extend(res['venues'])
	return venues

def loadVenues():

	cat_list = Category.objects.filter(parentCat__name = 'root')
	venues = getVenues(getEUCities(), cat_list, getClient())

	for key in venues:
		try:
			city = City.objects.get(name__startswith = key)
		except Exception:
			continue		
		for cat in venues[key]:
			for place in venues[key][cat]:
				name = place['name']
				category = Category.objects.get(name = place['categories'][0]['name'])
				data_source = DataSource.objects.get_or_create(ref=place['id'])[0]
				print data_source
				latitude = float(place['location']['lat'])
				longitude = float(place['location']['lng'])
				count = int(place['stats']['checkinsCount'])				
				if count <10:
					
					pass;
				else:
					
					venue = {
						'name': name, 
						'latitude': latitude, 
						'longitude': longitude, 
						'checkinsCount': count, 
						'city':city, 
						'category': category,
						'dataSource': data_source,}
					venue = Venue.objects.get_or_create(**venue)[0]
					print venue


				






def getEUCities():
	return ["Amsterdam",
			"Andorra la Vella",
			"Athens",
			"Belgrade",
			"Berlin",
			"Bern",
			"Bratislava",
			"Brussels",
			"Bucharest",
			"Budapest",
			"Chisinau",
			"Copenhagen",
			"Douglas",
			"Dublin",
			"Gibraltar",
			"Helsinki",
			"Kiev",
			"Lisbon",
			"Ljubljana",
			"London",
			"Longyearbyen",
			"Luxemburg",
			"Madrid",
			"Minsk",
			"Monaco-Ville",
			"Nicosia",
			"Oslo",
			"Podgorica",
			"Prague",
			"Pristina",
			"Reykjavik",
			"Riga",
			"Rome",
			"Saint Helier",
			"Saint Peter Port",
			"San Marino",
			"Sarajevo",
			"Skopje",
			"Sofia",
			"Stockholm",
			"Tallinn",
			"Tirana",
			"Torshavn",
			"Vaduz",
			"Valletta",
			"Vatican City",
			"Vienna",
			"Vilnius",
			"Warsaw",
			"Zagreb",]










