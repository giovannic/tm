import csv
from cities.models import City, Hotel

def get_hotels():
  f = open('../hotelsbase.csv')
  reader = csv.reader(f, delimiter='~')
  hotels = []
  for line in reader:
    if (len(line) > 6) and line[2] != '' and line[7] != '' and line[3] != '99999':
      #name country price stars
      hotels.append((line[1],line[7],line[3],line[2]))
  f.close()
  return hotels

def load_hotels():
  hots = get_hotels()
  f = open("../list_of_cities.txt")
  eu = []
  for line in f:
    eu.append(line[1:-3])
    
  cNames = []
  for city in eu:
    c = City.objects.filter(name=city)
    if len(c) > 0:
      cNames.append(c[0].country.encode('ascii', 'ignore'))

  for h in hots:
    if any(h[1] in country for country in cNames):
      try:
        city=City.objects.filter(country=h[1])
        rating = float(h[3])
        add = Hotel(
	    name=h[0],
	    city=city[0],
	    rate=h[2],
	    stars=rating,
	    long=0,
	    lat=0)
        add.save()
      except ValueError:
	pass

if __name__ == '__main__':
  h = get_hotels()
  for hotel in h:
    print hotel[0] + ', ' + hotel[1] + ', ' + hotel[2]
