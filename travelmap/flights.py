import requests
from props.models import City, Flight, DataSource

def get_prices(leaving):
    url = 'http://www.skyscanner.net/flights-from/uk/130223/130302/airfares-%s-in-february-2013-and-march-2013.html' % leaving
    r = requests.get(url)
    html = r.text
    places = {}
    links = {}
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
	if '"url"' == line[:5]:
            line = line[line.index(':')+2:]
            line = line.replace('"', '')
            line = line.replace(',', '')
            line = line.replace('\r', '')
            links[place] = 'www.skyscanner.net' + line.encode('ascii', 'ignore')
    newplaces = {}
    for place, price in places.items():
        if price != 'null':
            newplaces[place] = price
    return (places, links)

def load_flights():
  fs = get_prices('united-kingdom')
  for place, price in fs[0].items():
    country=City.objects.filter(country=place)
    if len(country) > 0 and price != 'null':
      link = DataSource(ref=fs[1][place])
      link.save()
      add = Flight(country=country[0],
	  cost=price,
	  distance=0,
	  source=link,
	  )
      add.save()

if __name__ == '__main__':
    for place, price in get_prices('united-kingdom').items():
        print place + ',' + price
