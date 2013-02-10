// Global Map
var map;

// Global XML Requests
var xmlreq;
var xmlreq2;

// Global array of markers
var markers;

// Info on each city for heat map
var cities;
var city_locations = {}

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
		if (value.city === city) {
			value.score = score;
		}
	});
}


function update(mult) {
    $.getJSON(getBaseURL() + 'api/v1/cityscore/?format=json', function(all) {
        var data = all.objects;
        var todo = mult[2];

        $.each(data, function(index, thing) {
            var city = thing.name;
            var scores = thing.weighed_scores;
            var scores = scores.replace(/u/g, "");
            var scores = scores.replace(/'/g, "\"");
            var scores = jQuery.parseJSON(scores);
            var heat = 0;
            $.each(scores, function(name, value) {
                heat += 10 * value * parseInt(todo[mapping(name)]);
            });
            setScoreForCity(city, heat);
            console.log(heat);
        });
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
	heatmap = new google.maps.visualization.HeatmapLayer({ data: heatmapData, dissipating : false, radius : 1 });
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

	var swBound = new google.maps.LatLng(43.73333, 7.41667);
	var neBound = new google.maps.LatLng(50.08804, 14.42076);
	var bounds = new google.maps.LatLngBounds(swBound, neBound);

	// Photograph courtesy of the U.S. Geological Survey
	var srcImage = 'js/head.jpg';
	overlay = new USGSOverlay(bounds, "test", 5, map);

	$.getJSON(getBaseURL() + 'api/v1/citylocation/?format=json', recieveCities);

	//get_CityLocations()
	//paint_CityLocations()

}

/*
function paint_CityLocations(){
	$.each(city_locations, function(index, value){
		console.log(index, value.latitude, value.longitude)
		var thing = new google.maps.LatLng(value.latitude,value.longitude);
		locations.push(thing);
		addMarker(value.longitude, value.latitude, index);
	});
}

function get_CityLocations(){
	$.getJSON(getBaseURL() + 'api/v1/citylocation/?format=json', function(stuff){
		var data = stuff.objects
		$.each(data, function(index, value) {
  			city_locations[value.name] = value
			});
	})
}
*/

function recieveCities(data, status, jqXHR) {
	cities = data.objects;
	$.each(cities, function (key,value) {
		var latitude = value.latitude;
		var longitude = value.longitude;
		value.score = Math.random();
		//addMarker(longitude, latitude, value.city);
	});
	updateHeatMap();
}

function addMarker(longitude, latitude, city) {
	var longandlat = new google.maps.LatLng(latitude, longitude);
	var marker = new google.maps.Marker({
		map: map,
		position: longandlat,
		title: city
	});

	//GEvent.addListener(marker, 'click', cityCompatibilities(city));
	markers.push(marker);
}

function getBaseURL () {
   return location.protocol + "//" + location.hostname + 
      (location.port && ":" + location.port) + "/";
}


function updateMap() {
/*    myOptions={
    center: latlon,zoom:10,
    mapTypeId:google.maps.MapTypeId.ROADMAP,
    mapTypeControl:false,
    navigationControlOptions:{style:google.maps.NavigationControlStyle.SMALL}
    };
    var map=new google.maps.Map(document.getElementById("map_canvas"),myOptions);
    var marker=new google.maps.Marker({position:latlon,map:map,title:"You are here!"});
*/	
}

