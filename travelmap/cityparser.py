
# -*- coding: utf-8 -*-
import csv
from props.models import City

def get_cities():
  f = open('../country_capital.txt')
  reader = csv.reader(f, delimiter=',')
  candc = []
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
  f.close()
  return candc

def load_cities():
  cs = get_cities()
  f = open("../list_of_cities.txt")
  for c in cs:
      add = City(name=c[0],country=c[1],lat=c[2],long=c[3])
      add.save()

if __name__ == '__main__':
  c = get_cities()
  for city in c:
    print city[0] + ', ' + city[1] 
