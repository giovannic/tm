from django.conf.urls import patterns, include, url
from tastypie.api import Api
from cities.api import CityResource, AirportResource, HotelResource, FlightResource
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.views.generic.simple import redirect_to
from django.shortcuts import redirect
import score

v1_api = Api(api_name='v1')
v1_api.register(CityResource())
v1_api.register(AirportResource())
v1_api.register(HotelResource())
v1_api.register(FlightResource())

# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()


#hack
def resource_view(request, name):
    return redirect('/static/resources/' + name)

urlpatterns = patterns('',
    url(r'^$', redirect_to, {'url':'/static/index.html'}),
    url(r'^resources/(?P<name>\w+\.\w+)$', resource_view),
    url(r'^scores$', score.view),

    url(r'^api/', include(v1_api.urls)),
    # Examples:
    # url(r'^$', 'travelmap.views.home', name='home'),
    # url(r'^travelmap/', include('travelmap.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    # url(r'^admin/', include(admin.site.urls)),
)
urlpatterns += staticfiles_urlpatterns()
