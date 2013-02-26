<<<<<<< HEAD
=======
# -*- coding: utf-8 -*-
>>>>>>> a02dd6a345d46ae5e05ba70a41df80098ea9ab0d
import csv
from cities.models import City

def get_cities():
  f = open('../country_capital.txt')
  reader = csv.reader(f, delimiter=',')
  candc = []
<<<<<<< HEAD
  for line in reader:
    if len(line) > 2:
      candc.append((line[0], line[1]))
=======
  reader.next()
  for line in reader:
    try:
      if len(line) > 3:
        lat = line[2].split('°');
        long = line[3].split('°');
        latd = float(lat[0])
        longd = float(long[0])
        if (len(lat) > 1):
	  latd += float(lat[1][:-2])/60
        if (len(long) > 1):
	  longd += float(long[1][:-2])/60
	if (lat[1][-1:] == 'S'):
	  latd = -latd
	if (long[1][-1:] == 'W'):
	  longd = -longd
        candc.append((line[1],line[0],latd,longd))
    except:
      pass
>>>>>>> a02dd6a345d46ae5e05ba70a41df80098ea9ab0d
  f.close()
  return candc

def load_cities():
  cs = get_cities()
  f = open("../list_of_cities.txt")
<<<<<<< HEAD
  eu = []
  for line in f:
    eu.append(line[1:-3])

  for c in cs:
    if any(c[1] in city for city in eu):
      add = City(name=c[1],country=c[0],long=0,lat=0)
=======

  for c in cs:
      add = City(name=c[0],country=c[1],lat=c[2],long=c[3])
>>>>>>> a02dd6a345d46ae5e05ba70a41df80098ea9ab0d
      add.save()

if __name__ == '__main__':
  c = get_cities()
  for city in c:
    print city[0] + ', ' + city[1] 
