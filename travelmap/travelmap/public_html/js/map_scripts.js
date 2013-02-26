// Global Map
var map;

// Global XML Requests
var xmlreq;
var xmlreq2;

// Global array of markers
var markers;
<<<<<<< HEAD

// Info on each city for heat map
var cities;
var hotels;
var music;
=======
// foursquare
var fsmarksers;

// Info on each city for heat map
var cities = {};
var hotels = {};
var flights = {};
var maxFlight = 0;
var maxHotel = 0;

var cityCircle;
>>>>>>> a02dd6a345d46ae5e05ba70a41df80098ea9ab0d

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
<<<<<<< HEAD
    } else if (name === "Outdoors & Recreation") {
=======
    } else if (name === "Otdoors & Recreation") {
>>>>>>> a02dd6a345d46ae5e05ba70a41df80098ea9ab0d
        return "outdoor";
    } else if (name === "Arts & Entertainment") {
        return "arts";
    }
<<<<<<< HEAD
    log(name);
}

=======
}

/*
>>>>>>> a02dd6a345d46ae5e05ba70a41df80098ea9ab0d
function setScoreForCity(city, score) {
	$.each(cities, function (key, value) {
		if (value.name === city) {
			value.score = score;
		}
	});
}

function get_compatibilityScore(weights_object){
<<<<<<< HEAD
	var weights_size = 0;

	$.each(weights_object, function(index, val){
		val = parseInt(val);
		weights_size += val*val;
	});

	weights_size = Math.sqrt(weights_size);

=======
>>>>>>> a02dd6a345d46ae5e05ba70a41df80098ea9ab0d

	$.getJSON(getBaseURL() + 'api/v1/cityscore/?format=json', function(stuff){

		var city_objects = stuff.objects

		$.each(city_objects	, function(index, data){
<<<<<<< HEAD

			var data = city_objects[index].weighed_scores

			var data = data.replace(/u\'/g, "\"");
			var data = data.replace(/'/g, "\"");
			var data = jQuery.parseJSON(data);	
			var dot_product = 0;
			var scores_size = 0;
			var score = 0;
			console.log(data);

			$.each(data, function(index, val){
				scores_size += val*val;
				dot_product += val*(parseInt(weights_object[mapping(index)]))
				
			})
			scores_size = Math.sqrt(scores_size);
			score = dot_product/(scores_size*weights_size);
			console.log('done cosine similarity', score);
			setScoreForCity(city_objects[index].name, score);

		})
		updateHeatMap();
	});
}

function updateHeatMapForZoomLevel(zoom) {
	var heatmapData = new Array();
	$.each (cities, function (key,value) {
		var longitude = value.longitude;
		var latitude = value.latitude;
		var latlong = { location : new google.maps.LatLng(latitude, longitude), weight : Math.max(0.01,value.score) };
		heatmapData.push(latlong);
	});
/*
	$.each (hotels, function (key, value) {
		var lat = value.lat;
		var long = value.long;
		var score1;

		$.each(cities, function (key2, value2) {
			if (value2.name === value.city.name) {
				score1 = value2.score;
				break;
			}
		});

		heatmapData.push({location : new google.maps.LatLng(lat,long), weight : value.cost});
	});
*/
    if (heatmap) {
        heatmap.setMap(null);
        delete heatmap;
    }
=======
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
		// updateHeatMap();
	});
}



function updateHeatMapForZoomLevel(zoom) {
	$.each (flights, function (key, value) {
		var latitude = cities[value.country].lat;
		var longitude = cities[value.country].long;
		var score = 255 * ((maxFlight - value.cost) / maxFlight);
		var centre = new google.maps.LatLng(latitude, longitude);
		var populationOptions = {
		    strokeColor: '#FF0000',
	            strokeOpacity: 0,
	            strokeWeight: 0,
	            fillColor: '#0000' + parseInt(score).toString(16),
	            fillOpacity: 0.15,
	            map: map,
	            center: centre,
	            radius: 200000,
	  	    clickable: true,
	            };
		cityCircle = new google.maps.Circle(populationOptions);

	        google.maps.event.addListener(cityCircle, 'click', function () {
		  var location = centre; 
		  if (overlay) overlay.setMap(null);
		  overlay = new ItinOverlay(location, 
		    value,
		    "flight",
		    map);
		});

	      });

         for (var hotel in hotels) {

            var score = 255 * ((maxHotel - hotels[hotel].rate) / maxHotel);
	    var pos = new google.maps.LatLng(hotels[hotel].lat, hotels[hotel].long);
            var populationOptions = {
                  strokeColor: '#FF0000',
                  strokeOpacity: 0,
                  strokeWeight: 0,
	          fillColor: '#' + parseInt(score).toString(16) + '0000',
	          fillOpacity: 0.15,
                  map: map,
	          center: pos,
		  radius: 200000, 
	  	  clickable: true,
          };
          cityCircle = new google.maps.Circle(populationOptions);

	        google.maps.event.addListener(cityCircle, 'click', function () {
		  var location = centre; 
		  if (overlay) overlay.setMap(null);
		  overlay = new ItinOverlay(location, 
		    value,
		    "hotel",
		    map);
		});
        }

	if (heatmap) {
        	heatmap.setMap(null);
        	delete heatmap;
    	}

>>>>>>> a02dd6a345d46ae5e05ba70a41df80098ea9ab0d
	var radius = 0;
	if (zoom < 4) radius = 1.8;
	else if (zoom < 7) radius = 1;
	else radius = 0.5;
<<<<<<< HEAD
	heatmap = new google.maps.visualization.HeatmapLayer({ data: heatmapData, dissipating : false, radius : 1.8 });
	heatmap.setMap(map);
=======
>>>>>>> a02dd6a345d46ae5e05ba70a41df80098ea9ab0d
}

function updateHeatMap() {
	updateHeatMapForZoomLevel(map.getZoom());
}
<<<<<<< HEAD
=======
 
 */
>>>>>>> a02dd6a345d46ae5e05ba70a41df80098ea9ab0d

function log(msg) {
    setTimeout(function() {
        throw new Error(msg);
    }, 0);
}

function initialiseMap() {
	//Initiallisation of global variables
	markers = new Array();
<<<<<<< HEAD
	scores = new Array();
=======
>>>>>>> a02dd6a345d46ae5e05ba70a41df80098ea9ab0d
	locations = new Array();

	var point = new google.maps.LatLng(52.536273,13.623047);

	var mapOptions = {
		center: point,
		zoom: 4,
<<<<<<< HEAD
    	//disableDefaultUI: true,
=======
>>>>>>> a02dd6a345d46ae5e05ba70a41df80098ea9ab0d
		mapTypeId: google.maps.MapTypeId.HYBRID
	};
	map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);

<<<<<<< HEAD
	google.maps.event.addListener(map, 'zoom_changed', function() { updateHeatMap() });

	$.getJSON(getBaseURL() + 'api/v1/citylocation/?format=json', recieveCities);
	$.getJSON(getBaseURL() + 'api/v1/hotel/?format=json', recieveHotels);

}

function restyleMap(styles) {
	var styledMap = new google.maps.StyledMapType(styles, {name: "Styled Map"});

	map.mapTypes.set('map_style', styledMap);
	map.setMapTypeId('map_style');
}

function recieveCities(data, status, jqXHR) {
	cities = data.objects;
	$.each(cities, function (key,value) {
		value.score = 0;//Math.random();
		addMarker(value);
	});

	updateHeatMap();

	sendOffData();
}


function recieveHotels(data, status, jqXHR) {
	hotels = data.objects;
}
/*
function recieveMusic(data) {
	mus = data.objects;
	$.each(mus, function (key,value) {
	  if(value.hometown):
	    music.push(value);
	});
	updateHeatMap();
}
*/
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
=======
	// Style map
    var styledMap = new google.maps.StyledMapType(style,
            {name: "Styled Map"});
    map.mapTypes.set('map_style', styledMap);
    map.setMapTypeId('map_style');

	//google.maps.event.addListener(map, 'zoom_changed', function() { updateHeatMap() });

	$.getJSON(getBaseURL() + 'api/v1/city/?format=json&limit=0', recieveCities);
	$.getJSON(getBaseURL() + 'api/v1/flight/?format=json&limit=0', recieveFlights);
	$.getJSON(getBaseURL() + 'api/v1/hotel/?format=json&limit=0', recieveHotels);
    //$.getJSON(getBaseURL() + 'api/v1/cityscore/?format=json', recieveScores);

}

function sortCitiesByScore() {
    for (var key in cities) {
        value = cities[key];
        value.score = getOverallScore(getScoresForCity(value), getUserPreferences());
    }
    
	cities.sort( function(a,b) {
		return a.score - b.score;
	});
}

function recieveCities(data, status, jqXHR) {
	// Add template scores to cities
	cities = data.objects;
	/* FIX this
  	$.each(data.objects, function(index, value){
	  cities[value.resource_uri] = value;
	})
	*/
}

function recieveScores(data, status, jqXHR) {
    var scores = data.objects;
    
    mergeScoreWithCities(scores);
    
    // if scores came with cities this should be called after recieve cities
    updatePieCharts();
}

// THIS FUNCTION IS NOT NEEDED IF SCORES CAME WITH CITIES!

function mergeScoreWithCities(scores) {
    // For each set of scores, find equivilent city
    for (var key in scores) {
        var cityScore = scores[key];
        var cityLoc;
        var cityLocKey;
        for (var key2 in cities) {
            var value = cities[key2];
            if (cityScore.name == value.name) { // SOMETIMES THIS IS NEVER TRUE
                cityLoc = value;
                cityLocKey = key2;
                break;
            }
        }
        // Once equivilent city is found put the scores in the city data
        cityLoc.weighed_scores = cityScore.weighed_scores;
        
        // Add on flight and hotel scores (would be better if flight and hotel scores came with other scores)
        var flightAndHotelScores = getFlightAndHotelScores();
        cityLoc.weighed_scores.averageHotelCostPerNight = flightAndHotelScores[cityLocKey].avgHotelCost;
        cityLoc.weighed_scores.flightCostFromCurrentLocation = flightAndHotelScores[cityLocKey].flightCost;
    }
}

function getFlightAndHotelScores(){
    var scores = {};
    for (city in cities)
    {
        scores[city] = {};
        scores[city].flightCost = flights[city];
        scores[city].avgHotelCost = 0;//averageRate(hotels[city]); NOT DEFINED
    }
    return scores;
}

function recieveFlights(data, status, jqXHR) {
	$.each(data.objects, function(index, value){
	  if (value.cost > maxFlight) maxFlight = value.cost;
	  flights[value.country] = value;
	})
}

function recieveHotels(data, status, jqXHR) {
	$.each(data.objects, function(index, value){
	  if (value.rate > maxHotel) maxHotel = value.rate;
	  hotels[value.city] = value;
	})
}

function getScoresForCity() {
    var data = {"Food" : 0,
                "Outdoors & Recreation" :0,
                "Nightlife Spot" : 0,
                "Arts & Entertainment" : 0,
                "Shop & Service" : 0,
                "averageHotelCostPerNight" :0,
                "flightCostFromCurrentLocation" : 0
                };
    return data;
}

function addMarker(city) {
	var latitude = city.lat;
	var longitude = city.long;
	var longandlat = new google.maps.LatLng(latitude, longitude);
	
	var cityData = getScoresForCity(city);
	var usrData = getUserPreferences();
	var cityScore = city.score;
	var cityBreakdown = getPercentageScores(cityData, usrData);
	
	var marker = new PieOverlay(longandlat, city.name, cityScore, cityBreakdown, map);
	
/*	google.maps.event.addListener(marker, 'click', function () {
		var latitude = city.lat;
		var longitude = city.long;
>>>>>>> a02dd6a345d46ae5e05ba70a41df80098ea9ab0d
		var location = new google.maps.LatLng(latitude, longitude);
		if (overlay) overlay.setMap(null);
		overlay = new USGSOverlay(location, city.name, city.score, map);

		google.maps.event.addListener(map, 'click', function () {
			overlay.setMap(null);
		});
	});
<<<<<<< HEAD
=======
*/
>>>>>>> a02dd6a345d46ae5e05ba70a41df80098ea9ab0d
	markers.push(marker);
}

function getBaseURL () {
   return location.protocol + "//" + location.hostname + 
      (location.port && ":" + location.port) + "/";
}

<<<<<<< HEAD
=======
function updatePieCharts() {
    
    sortCitiesByScore();
    
	for (var i = 0; i < markers.length; i++) {
		markers[i].setMap(null);
	}

	for (var key in cities) {
		var value = cities[key];
		addMarker(value);
	}
    
}


>>>>>>> a02dd6a345d46ae5e05ba70a41df80098ea9ab0d
