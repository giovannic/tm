// Global Map
var map;

// Global XML Requests
var xmlreq;
var xmlreq2;

// Global array of markers
var markers;

// Info on each city for heat map
var cities;
var scores;
var locations;
var city_locations = {}

// Global heatmap layer
var heatmap;

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
	var i = 0;
	for (i = 0; i < cities.length; i ++) {
		if (cities[i] == city) break;
	}
	scores[i] = score;

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
	for (var i = 0; i < cities.length; i++) {
		var cityLocation = locations[i];
		var longitude = cityLocation.lng();
		var latitude = cityLocation.lat();
		var latlong = { location : new google.maps.LatLng(latitude, longitude), weight : Math.max(0.01,scores[i]) };
		log(scores);
		heatmapData.push(latlong);
	}
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

function get_CityLocations(){
	$.getJSON(getBaseURL() + 'api/v1/citylocation/?format=json', function(stuff){
		var data = stuff.objects
		$.each(data, function(index, value) {
  			city_locations[value.name] = value
			});
	})
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
/*	xmlreq = new XMLHttpRequest();
	var fileLocation = getBaseURL() + "resources/city_list.txt";
	xmlreq.open("GET", fileLocation, true);
	xmlreq.onreadystatechange = recieveCities;
	xmlreq.send();*/
	get_CityLocations()
	paint_CityLocations()

}

function paint_CityLocations(){
	$.each(city_locations, function(index, value){
		console.log(index, value.latitude, value.longitude)
		var thing = new google.maps.LatLng(value.latitude,value.longitude);
		locations.push(thing);
		addMarker(value.longitude, value.latitude, index);
	});
}


/*
function recieveCities() {
	if (xmlreq.readyState == 4) {  // Makes sure the document is ready to parse.
		if (xmlreq.status == 200) {  // Makes sure it's found the file.
			var allText = xmlreq.responseText;
			cities = xmlreq.responseText.split("\n"); // Will separate each line into an array
			cities.pop();
			xmlreq2 = new XMLHttpRequest();
			fileLocation = getBaseURL() + "resources/city_longlats.txt";
			xmlreq2.open("GET", fileLocation, true);
			xmlreq2.onreadystatechange = recieveLLs;
			xmlreq2.send();
		}
	}
	
}

get_CityLocations()



function recieveLLs() {
	if (xmlreq2.readyState == 4) {  // Makes sure the document is ready to parse.
		if (xmlreq2.status == 200) {  // Makes sure it's found the file.
			var allText = xmlreq2.responseText;
			var LLs = xmlreq2.responseText.split("\n"); // Will separate each line into an array
			var heatmapData = new Array();
			for (var i = 0; i < LLs.length - 1; i++) {
				var LLArray = LLs[i].split(",");
				var latitude = parseFloat(LLArray[0]);
				var longitude = parseFloat(LLArray[1]);

				scores.push(i);
				var thing = new google.maps.LatLng(latitude,longitude);
				locations.push(thing);
				
				

			}
			updateHeatMap();
		}
	}
}*/

function addMarker(longitude, latitude, city) {
	var longandlat = new google.maps.LatLng(latitude, longitude);
	var marker = new google.maps.Marker({
		map: map,
		position: longandlat,
		title: city
	});
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

