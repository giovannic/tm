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

// Global heatmap layer
var heatmap;

function setScoreForCity(city, score) {
	var i = 0;
	for (i = 0; i < cities.length; i ++) {
		if (cities[i] == city) break;
	}
	scores[i] = score;

}

function update(mult) {
    $.getJSON(getBaseURL() + 'api/v1/cityscores/?format=json', function(data) {
        $.each(data, function(city, scores) {
            var heat = 0;
            $.each(scores, function(name, value) {
                heat += value * mult;
            });
            setScoreForCity(city, heat);
        });
	    updateHeatMap();
    });
}

function updateHeatMapForZoomLevel(zoom) {
	var heatmapData = new Array();
	var temp = Math.pow(0.5,zoom);
	for (var i = 0; i < cities.length; i++) {
		var cityLocation = locations[i];
		var longitude = cityLocation.lng();
		var latitude = cityLocation.lat();
		makeCircumference(longitude, latitude, temp*scores[i], heatmapData);
	}
    if (heatmap) {
        heatmap.setMap(null);
        delete heatmap;
    }
	heatmap = new google.maps.visualization.HeatmapLayer({ data: heatmapData });
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
    		disableDefaultUI: true,
		mapTypeId: google.maps.MapTypeId.HYBRID
	};
	map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);

	google.maps.event.addListener(map, 'zoom_changed', function() { updateHeatMap() });

	xmlreq = new XMLHttpRequest();
	var fileLocation = getBaseURL() + "resources/city_list.txt";
	xmlreq.open("GET", fileLocation, true);
	xmlreq.onreadystatechange = recieveCities;
	xmlreq.send();
}

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
				
				//addMarker(longitude, latitude, cities[i]);

			}
			updateHeatMap();
		}
	}
}

function makeCircumference(cx,cy, rTemp, array) {
	var r = 0.05;
	while ( r < rTemp ) {
		for (var i = 0; i < 40; i++) {
			var a = (Math.PI / 20) * i;
			var x = cx + r * Math.cos(a);
			var y = cy + r * Math.sin(a);
			var latlong = new google.maps.LatLng(y, x);
			array.push(latlong);
		}
		r = r + 0.05
	}
}

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

