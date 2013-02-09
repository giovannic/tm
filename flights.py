import requests

def get_prices(leaving):
    url = 'http://www.skyscanner.net/flights-from/uk/130223/130302/airfares-%s-in-february-2013-and-march-2013.html' % leaving
    r = requests.get(url)
    html = r.text
    places = {}
    place = ''
    for line in r.text.split('\n'):
        line = line.strip(' ')

        if '"placeName" :' in line:
            line = line[line.index(':')+2:]
            line = line.replace('"', '')
            line = line.replace(',', '')
            line = line.replace('\r', '')
            place = line.encode('ascii', 'ignore')
        if '"price" :' in line:
            line = line[line.index(':')+2:]
            line = line.replace('"', '')
            line = line.replace(',', '')
            line = line.replace('\r', '')
            places[place] = line.encode('ascii', 'ignore')
    newplaces = {}
    for place, price in places.items():
        if price != 'null':
            newplaces[place] = price
    return places


if __name__ == '__main__':
    for place, price in get_prices('united-kingdom').items():
        print place + ',' + price
