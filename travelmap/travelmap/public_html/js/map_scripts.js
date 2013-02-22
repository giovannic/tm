// Global Map
var map;

// Global XML Requests
var xmlreq;
var xmlreq2;

// Global array of markers
var markers;
// foursquare
var fsmarksers;

// Info on each city for heat map
var cities;
var hotels;
var flights;
var music;

var cityCircle;

// Global heatmap layer
var heatmap;

var overlay;

function mapping(name) {
    if (name === "Food") {
        return "food";
    } else if (name === "Shop & Service") {
        return "shopping";
    } else if (name === "Nightlife Spot") {
        return "nightlife";
    } else if (name === "Otdoors & Recreation") {
        return "outdoor";
    } else if (name === "Arts & Entertainment") {
        return "arts";
    }
    log(name);
}

function setScoreForCity(city, score) {
	$.each(cities, function (key, value) {
		if (value.name === city) {
			value.score = score;
		}
	});
}

function get_compatibilityScore(weights_object){

	$.getJSON(getBaseURL() + 'api/v1/cityscore/?format=json', function(stuff){

		var city_objects = stuff.objects

		$.each(city_objects	, function(index, data){
			var data = city_objects[index].weighed_scores;

			var data = data.replace(/u/g, "");
			var data = data.replace(/'/g, "\"");
			var data = jQuery.parseJSON(data);
			var score = 0;
			var total = 0;
			$.each(weights_object, function(index, val){
				val = parseInt(val);
				total += val;
			})

			$.each(data, function(index, val){
				score += Math.min(val,weights_object[mapping(index)]/total)
			})

			setScoreForCity(city_objects[index].name,score);

		})
		updateHeatMap();
	});
}

function updateHeatMapForZoomLevel(zoom) {
	/*
	$.each (cities, function (key,value) {
		var longitude = value.longitude;
		var latitude = value.latitude;
		var latlong = { location : new google.maps.LatLng(latitude, longitude), weight : Math.max(0.01,value.score) };
		heatmapData.push(latlong);
	});
*/
/*
  
	$.each (hotels, function (key, value) {
		var latitude = value.latitude;
		var longitude = value.longitude;
		var score1;
		$.each(cities, function (key2, value2) {
			if (value2.name === value.city.name) {
				score1 = value2.score;
				break;
			}
		});
		var hotelVis = {
			fillColor: "#FF0000",
			fillOpacity: value.cost/1000,
			map: map,
			center: new google.maps.LatLng(latitude,longitude),
			radius: 20
		};
		new google.maps.Circle(hotelVis);
	});
		*/
                var centre = new google.maps.LatLng(34.052234, -118.243684); 
		var populationOptions = {
		    strokeColor: '#FF0000',
	            strokeOpacity: 0.8,
	            strokeWeight: 2,
	            fillColor: '#FF0000',
	            fillOpacity: 0.35,
	            map: map,
	            center: centre,
	            radius: 200000
	            };
		cityCircle = new google.maps.Circle(populationOptions);

	$.each (flights, function (key, value) {
		var latitude = value.country.lat;
		var longitude = value.country.long;
		var score = value.cost;
		var centre = new google.maps.LatLng(latitude, longitude);
		var populationOptions = {
	            fillColor: '#FF0000',
	            fillOpacity: 0.20,
	            map: map,
	            center: centre,
	            radius: 200000
	            };
		cityCircle = new google.maps.Circle(populationOptions);
	});
	
	/*
    if (heatmap) {
        heatmap.setMap(null);
        delete heatmap;
    }
	var radius = 0;
	if (zoom < 4) radius = 1.8;
	else if (zoom < 7) radius = 1;
	else radius = 0.5;
	heatmap = new google.maps.visualization.HeatmapLayer({ data: heatmapData, dissipating : false, radius : 1.8 });
	heatmap.setMap(map);
	*/
}

function updateHeatMap() {
	updateHeatMapForZoomLevel(map.getZoom());
}

function log(msg) {
    setTimeout(function() {
        throw new Error(msg);
    }, 0);
}

function initialiseMap() {
	//Initiallisation of global variables
	markers = new Array();
	scores = new Array();
	locations = new Array();

	var point = new google.maps.LatLng(52.536273,13.623047);

	var mapOptions = {
		center: point,
		zoom: 4,
    	//disableDefaultUI: true,
		mapTypeId: google.maps.MapTypeId.HYBRID
	};
	map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);

    // Style map
    var styles = [
    {
      "featureType": "water",
      "stylers": [
        { "visibility": "simplified" },
        { "color": "#000000" }
      ]
    },{
      "featureType": "landscape",
      "stylers": [
        { "visibility": "simplified" },
        { "color": "#2d2d36" }
      ]
    },{
      "elementType": "geometry",
      "stylers": [
        { "visibility": "simplified" }
      ]
    },{
      "elementType": "labels.text.fill",
      "stylers": [
        { "visibility": "off" }
      ]
    },{
      "featureType": "poi",
      "stylers": [
        { "visibility": "on" },
        { "color": "#25252d" }
      ]
    }
    ]

    var styledMap = new google.maps.StyledMapType(styles,
            {name: "Styled Map"});
    map.mapTypes.set('map_style', styledMap);
    map.setMapTypeId('map_style');

	google.maps.event.addListener(map, 'zoom_changed', updateHeatMap);

	$.getJSON(getBaseURL() + 'api/v1/citylocation/?format=json', recieveCities);
	$.getJSON(getBaseURL() + 'api/v1/hotel/?format=json', recieveHotels);
	$.getJSON(getBaseURL() + 'api/v1/flight/?format=json', recieveFlights);
}

function recieveCities(data, status, jqXHR) {
	cities = data.objects;
	$.each(cities, function (key,value) {
		value.score = 0;//Math.random();
		addMarker(value);
	});
}

function recieveHotels(data, status, jqXHR) {
	hotels = data.objects;
}

function recieveFlights(data, status, jqXHR) {
	flights = data.objects;
	updateHeatMap();
}

function recieveMusic(data) {
	mus = data.objects;
	$.each(mus, function (key,value) {
	  if(value.hometown)
	    music.push(value);
	});
	updateHeatMap();
}

function addMarker(city) {
	var latitude = city.latitude;
	var longitude = city.longitude;
	var longandlat = new google.maps.LatLng(latitude, longitude);
	var marker = new google.maps.Marker({
		map: map,
		position: longandlat,
		title: city.name,
		icon: '../resources/24.png'
	});

	google.maps.event.addListener(marker, 'click', function () {
		var latitude = city.latitude;
		var longitude = city.longitude;
		var location = new google.maps.LatLng(latitude, longitude);
		if (overlay) overlay.setMap(null);
		overlay = new USGSOverlay(location, city.name, city.score, map);

		google.maps.event.addListener(map, 'click', function () {
			overlay.setMap(null);
		});
	});

	markers.push(marker);
}

function getBaseURL () {
   return location.protocol + "//" + location.hostname + 
      (location.port && ":" + location.port) + "/";
}

