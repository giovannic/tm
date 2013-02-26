import foursquare
from django.conf import settings
from categories.models import Category
from cities.models import DataSource


#get foursquare client
def getClient():
	client = foursquare.Foursquare(client_id= settings.FSQ_CLIENT_ID, client_secret = settings.FSQ_CLIENT_SECRET)
	return client.venues.categories()

def get_categories(cat_dict):
	if 'name' not in cat_dict.keys():
		root = Category.objects.get_or_create(name = "root")[0]
		parent = root
	else:
		parent = Category.objects.get(name = cat_dict['name'])	
	while cat_dict['categories']:
		for cat in cat_dict['categories']:
			data_source = DataSource.objects.get_or_create(ref=cat['id'])
			kwargs = {"name": cat['name'], "parent": parentCat, "dataSource": data_source}
			new = Category.objects.get_or_create(**kwargs)
			print new
			get_categories(cat)





