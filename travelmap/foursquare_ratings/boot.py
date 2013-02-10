cat = categories(parent = 'root')
cat.get_categories()

cat = categories.objects.all()[0]
type(cat)

h = all_city_scores(categories = cat)
execfile('foursquare_ratings/cities.py')
h.get_city_scores(cities, cat.new_categories)

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
     f.get_venues()


for city in CityScore.objects.all():  
    f = Venue.objects.all().order_by('checkinsCount').filter(city = city.name)
    g = 4*len(f)/5
    f = f[0:g]
    for thing in f:
            thing.delete()     
