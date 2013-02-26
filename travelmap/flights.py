import requests
<<<<<<< HEAD
from cities.models import City, Flight
=======
from cities.models import City, Flight, ExtUrl
>>>>>>> a02dd6a345d46ae5e05ba70a41df80098ea9ab0d

def get_prices(leaving):
    url = 'http://www.skyscanner.net/flights-from/uk/130223/130302/airfares-%s-in-february-2013-and-march-2013.html' % leaving
    r = requests.get(url)
    html = r.text
    places = {}
<<<<<<< HEAD
=======
    links = {}
>>>>>>> a02dd6a345d46ae5e05ba70a41df80098ea9ab0d
    place = ''
    for line in r.text.split('\n'):
        line = line.strip(' ')

        if '"placeName" :' in line:
            line = line[line.index(':')+2:]
            line = line.replace('"', '')
            line = line.replace(',', '')
            line = line.replace('\r', '')
            place = line.encode('ascii', 'ignore')
        if '"price" :' in line:
            line = line[line.index(':')+2:]
            line = line.replace('"', '')
            line = line.replace(',', '')
            line = line.replace('\r', '')
            places[place] = line.encode('ascii', 'ignore')
<<<<<<< HEAD
=======
	if '"url"' == line[:5]:
            line = line[line.index(':')+2:]
            line = line.replace('"', '')
            line = line.replace(',', '')
            line = line.replace('\r', '')
            links[place] = 'www.skyscanner.net' + line.encode('ascii', 'ignore')
>>>>>>> a02dd6a345d46ae5e05ba70a41df80098ea9ab0d
    newplaces = {}
    for place, price in places.items():
        if price != 'null':
            newplaces[place] = price
<<<<<<< HEAD
    return places

def load_flights():
  fs = get_prices('united-kingdom')
  for place, price in fs.items():
    country=City.objects.filter(country=place)
    if len(country) > 0 and price != 'null':
      add = Flight(country=country[0],
	  cost=price,
	  distance=0)
=======
    return (places, links)

def load_flights():
  fs = get_prices('united-kingdom')
  for place, price in fs[0].items():
    country=City.objects.filter(country=place)
    if len(country) > 0 and price != 'null':
      link = ExtUrl(ref=fs[1][place])
      link.save()
      add = Flight(country=country[0],
	  cost=price,
	  distance=0,
	  source=link,
	  )
>>>>>>> a02dd6a345d46ae5e05ba70a41df80098ea9ab0d
      add.save()

if __name__ == '__main__':
    for place, price in get_prices('united-kingdom').items():
        print place + ',' + price
