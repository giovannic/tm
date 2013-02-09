var map;
var xmlreq;
var xmlreq2;
var markers;
var cities;

function log(msg) {
    setTimeout(function() {
        throw new Error(msg);
    }, 0);
}

function initialiseMap() {

	var point = new google.maps.LatLng(52.536273,13.623047);

	var mapOptions = {
		center: point,
		zoom: 4,
    		disableDefaultUI: true,
		mapTypeId: google.maps.MapTypeId.HYBRID
	};
	map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);

	markers = new Array();

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
			for (var i = 0; i < LLs.length; i++) {
				var LLArray = LLs[i].split(",");
				var latitude = LLArray[0];
				var longitude = LLArray[1];

				addMarker(longitude, latitude, cities[i]);
			}
		}
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

/*
function updateMap() {
    myOptions={
    center: latlon,zoom:10,
    mapTypeId:google.maps.MapTypeId.ROADMAP,
    mapTypeControl:false,
    navigationControlOptions:{style:google.maps.NavigationControlStyle.SMALL}
    };
    var map=new google.maps.Map(document.getElementById("map_canvas"),myOptions);
    var marker=new google.maps.Marker({position:latlon,map:map,title:"You are here!"});
	
}
*/
