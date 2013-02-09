from django.http import HttpResponse
import json
import random

raw = """Amsterdam
Andorra la Vella
Athens
Belgrade
Berlin
Bern
Bratislava
Brussels
Bucharest
Budapest
Chisinau
Copenhagen
Douglas
Dublin
Gibraltar
Helsinki
Kiev
Lisbon
Ljubljana
London
Longyearbyen
Luxemburg
Madrid
Minsk
Monaco-Ville
Nicosia
Oslo
Paris
Podgorica
Prague
Pristina
Reykjavik
Riga
Rome
Saint Helier
Saint Peter Port
San Marino
Sarajevo
Skopje
Sofia
Stockholm
Tallinn
Tirana
Torshavn
Vaduz
Valletta
Vatican City
Vienna
Vilnius
Warsaw
Zagreb"""
names = raw.split('\n')


def get_scores():
    random.seed(123)
    scores = {}
    for i, name in enumerate(names):
        d = {
            'food': random.random(),
            'outdoors': random.random(),
            'art': random.random(),
            'shop': random.random(),
            'nightlife': random.random()
            }

        scores[name] = d
    return scores

def view(request):
    data = get_scores()
    return HttpResponse(json.dumps(data), content_type="application/json")

if __name__ == '__main__':
    print get_scores()

