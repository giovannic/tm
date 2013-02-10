import csv
from cities.models import City

def get_cities():
  f = open('../country_capital.txt')
  reader = csv.reader(f, delimiter=',')
  candc = []
  for line in reader:
    if len(line) > 2:
      candc.append((line[0], line[1]))
  f.close()
  return candc

def load_cities():
  cs = get_cities()
  f = open("../list_of_cities.txt")
  eu = []
  for line in f:
    eu.append(line[1:-3])

  for c in cs:
    if any(c[1] in city for city in eu):
      add = City(name=c[1],country=c[0],long=0,lat=0)
      add.save()

if __name__ == '__main__':
  c = get_cities()
  for city in c:
    print city[0] + ', ' + city[1] 
