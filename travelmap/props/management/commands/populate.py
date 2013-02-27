from django.core.management.base import NoArgsCommand
import _cityparser as cityparser
import _flights as flights
import _hotels as hotels

class Command(NoArgsCommand):
  def handle_noargs(self, **options):
    print "doing cities"
    cityparser.load_cities()
    print "done"
    print "doing flights"
    flights.load_flights()
    print "done"
    print "doing hotels"
    hotels.load_hotels()
