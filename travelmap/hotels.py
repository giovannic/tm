import csv
from cities.models import City, Hotel, ExtUrl

def get_hotels():
  f = open('../hotelsbase.csv')
  reader = csv.reader(f, delimiter='~')
  hotels = []
  for line in reader:
    try:
      if (len(line) > 14) and line[2] != '' and line[7] != '' and line[3] != '99999' and line[12] != '0' and line[13] != '0' and line[10] != '':
        #name country price stars long lat url
        hotels.append((line[1],line[7],line[3],line[2],line[13],line[12],line[10]))
    except ValueError:
      pass
  f.close()
  return hotels

def load_hotels():
  hots = get_hotels()
    
  for h in hots[:5000]:
      try:
        city=City.objects.filter(country=h[1])
        rating = float(h[3])
	lo = float(h[4])
	la = float(h[5])
	if (lo != 0 and la != 0):
	  u, _ = ExtUrl.objects.get_or_create(ref=h[6])
          add = Hotel(
	    name=h[0],
	    city=city[0],
	    rate=h[2],
	    stars=rating,
	    long=float(h[4]),
	    lat=float(h[5]),
	    source=u,
	    )
          add.save()
      except ValueError:
	pass


if __name__ == '__main__':
  h = get_hotels()
  for hotel in h:
    print hotel[0] + ', ' + hotel[1] + ', ' + hotel[2]
