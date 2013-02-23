// Global Map
var map;

// Global XML Requests
var xmlreq;
var xmlreq2;

// Global array of markers
var markers;

// Info on each city for heat map
var cities;
var flight;

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
			var data = city_objects[index].weighed_scores

			var data = data.replace(/u/g, "");
			var data = data.replace(/'/g, "\"");
			var data = jQuery.parseJSON(data);	
			console.log(data);
			var score = 0;
			var total = 0;
			$.each(weights_object, function(index, val){
				val = parseInt(val);
				total += (val-40);
				console.log(val)
			})

			$.each(data, function(index, val){
				
				score += (val+weights_object[mapping(index)]/total)/2;
				console.log(score)
			})
			console.log(score);
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

	google.maps.event.addListener(map, 'zoom_changed', function() { updateHeatMap() });

	$.getJSON(getBaseURL() + 'api/v1/city/?format=json', recieveCities);
}

function recieveCities(data, status, jqXHR) {
	cities = data.objects;
	$.each(cities, addMarker);

	sendOffData();
}


function addMarker() {
	var latitude = this.lat;
	var longitude = this.long;
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

