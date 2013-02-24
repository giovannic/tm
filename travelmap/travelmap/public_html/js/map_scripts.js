// Global Map
var map;

// Global XML Requests
var xmlreq;
var xmlreq2;

// Global array of markers
var markers;

// Info on each city for heat map
var cities;

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
			var data = city_objects[index].weighed_scores

			var data = data.replace(/u/g, "");
			var data = data.replace(/'/g, "\"");
			var data = jQuery.parseJSON(data);	
			var score = 0;
			var total = 0;
			$.each(weights_object, function(index, val){
				val = parseInt(val);
				total += (val-40);

			})

			$.each(data, function(index, val){
				
				score += (val+weights_object[mapping(index)]/total)/2;
			})
			setScoreForCity(city_objects[index].name, score);

		})
		// updateHeatMap();
	});
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
		mapTypeId: google.maps.MapTypeId.HYBRID
	};
	map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);

	// Style map
    var styledMap = new google.maps.StyledMapType(style,
            {name: "Styled Map"});
    map.mapTypes.set('map_style', styledMap);
    map.setMapTypeId('map_style');

	//google.maps.event.addListener(map, 'zoom_changed', function() { updateHeatMap() });

	$.getJSON(getBaseURL() + 'api/v1/city/?format=json&limit=0', recieveCities);

}

function sortCitiesByScore() {
	cities.sort( function(a,b) {
		return a.score - b.score;
	});
}

function recieveCities(data, status, jqXHR) {
	cities = data.objects;

	// Add template scores to cities
	for (var key in cities) {
		var value = cities[key];
		value.score = Math.random();//0;
	}

	//sort by score
	sortCitiesByScore();

	//add to map
	for (var key in cities) {
		var value = cities[key];
		if (value.name === "London") addMarker(value);
	}

	sendOffData();
}

function addMarker(city) {
	var latitude = city.lat;
	var longitude = city.long;
	var longandlat = new google.maps.LatLng(latitude, longitude);
	
	//TEMP
	var ldnData = getScoresForCity("London");
	var usrData = getUserPreferences();
	var ldnScore = getOverallScore(ldnData, usrData);
	var ldnBreakdown = getPercentageScores(ldnData, usrData);
	
	var marker = new PieOverlay(longandlat, city.name, ldnScore, ldnBreakdown, map);
	
/*	google.maps.event.addListener(marker, 'click', function () {
		var latitude = city.lat;
		var longitude = city.long;
		var location = new google.maps.LatLng(latitude, longitude);
		if (overlay) overlay.setMap(null);
		overlay = new USGSOverlay(location, city.name, city.score, map);

		google.maps.event.addListener(map, 'click', function () {
			overlay.setMap(null);
		});
	});
*/
	markers.push(marker);
}

function getBaseURL () {
   return location.protocol + "//" + location.hostname + 
      (location.port && ":" + location.port) + "/";
}

function updatePieCharts() {
	for (var i = 0; i < markers.length; i++) {
		markers[i].setMap(null);
	}

	for (var key in cities) {
		var value = cities[key];
		if (value.name === "London") addMarker(value);
	}
}


