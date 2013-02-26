
# cat = categories(parent = 'root')
# cat.get_categories()

# cat = categories.objects.all()[0]
# type(cat)

# h = all_city_scores(categories = cat)
# execfile('foursquare_parser/city_list_europe.py')
# h.get_city_scores(cities, cat.new_categories)

h = all_city_scores.objects.all()[0]


for city in h.cities:
      f = CityScore(name = city, total_checkins = 0)
      f.country_code = h.cities_geocodes[city]['feature']['cc']
      print h.cities_geocodes[city]['feature']['geometry']['center']['lat'], h.cities_geocodes[city]['feature']['geometry']['center']['lng']
      f.latitude = float(h.cities_geocodes[city]['feature']['geometry']['center']['lat'])
      f.longitude = float(h.cities_geocodes[city]['feature']['geometry']['center']['lng'])
      print f.name, f.latitude, f.longitude
      f.update_score(h, h.categories.new_categories)
      f.get_total_checkins()
      f.get_weighed_scores()





for f in CityScore.objects.all():  
     print f.city, f.name
     load = City.objects.filter(name__startswith = f.name)
     print load
     if not f.city:
          if not load:
               res = City(name = f.name, country = f.country_code, lat = f.latitude, long = f.longitude)
               res.save()
               print res
               f.city = res
               f.save()
               print("created")
          else:
               print("got") 
               res = load[0] 
               f.city = res 
               f.save()

     f.get_venues()  





