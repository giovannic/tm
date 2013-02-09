from django.db import models
import foursquare


client = foursquare.Foursquare(client_id= settings.FSQ_CLIENT_ID, client_secret = settings.FSQ_CLIENT_SECRET)
categories = {}
for base_category in client.venues.categories()['categories']:
	categories[base_category['name']] = base_category
for base_category in categories.keys():	
	for sub_category in categories[base_category]['categories']:
		categories[base_category][sub_category['name']] = sub_category

cities = [
"Amsterdam",
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

params ={'near':'city', 'limit':50, 'intent': 'browse', 'categoryId' : '','radius': 100000}
res = {}
for city in cities:
	res[city] = {}
	params['near'] = city
	for cat in categories.keys():
		params['categoryId'] = categories[cat]['id']
		res[city][categories[cat]['name']] = client.venues.search(params=params)['venues']
	print(city)	


for result in res['Amsterdam']['Arts & Entertainment']:
     arts_and_e+=(res['stats']['checkinsCount']+res['stats']['usersCount'])

