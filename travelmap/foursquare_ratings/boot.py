cat = categories(parent = 'root')
cat.get_categories()

cat = categories.objects.all()[0]
type(cat)

h = all_city_scores(categories = cat)
execfile('foursquare_ratings/cities.py')
h.get_city_scores(cities, cat.new_categories)

h = all_city_scores.objects.all()[0]


for city in h.cities:
     f = CityScore(name = city)
     f.total_checkins = 0
     f.country_code = h.cities_geocodes[city]['feature']['cc']
     f.update_score(h, h.categories.new_categories)
     f.get_total_checkins()
     f.get_weighed_scores()
     print f.weighed_scores