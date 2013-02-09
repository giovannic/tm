var map;
var xmlreq;
var markers;
var cities;
var geocoder;

function initialiseMap() {
<<<<<<< HEAD

	var point = new google.maps.LatLng(52.536273,13.623047);

	var mapOptions = {
		center: point,
		zoom: 4,
    		disableDefaultUI: true,
		mapTypeId: google.maps.MapTypeId.HYBRID
	};
	map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);

	geocoder = new google.maps.Geocoder();

	xmlreq = new XMLHttpRequest();
	var fileLocation = getBaseURL() + "resources/city_list.txt";
	xmlreq.open("GET", fileLocation, true);
	xmlreq.onreadystatechange = recieveCities;
	xmlreq.send();

	markers = new Array();
}

function recieveCities() {
	if (xmlreq.readyState === 4) {  // Makes sure the document is ready to parse.
		if (xmlreq.status === 200) {  // Makes sure it's found the file.
			var allText = xmlreq.responseText;
			cities = xmlreq.responseText.split("\n"); // Will separate each line into an array
			
			geocoder.geocode({'address' : cities[cities.length - 3]}, addMarker);
		}
	}
	
}

function addMarker(results,status) {
	if (status == google.maps.GeocoderStatus.OK) {
		var marker = new google.maps.Marker({
			map: map,
			position: results[0].geometry.location,
			title: results[0].formatted_address
		});
		markers.push(marker);

		cities.pop();
		geocoder.geocode({'address' : cities[cities.length - 3]}, addMarker);
	} else if (status === google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {    
		setTimeout(function() { geocoder.geocode({'address' : cities[cities.length - 3]}, addMarker); }, 200);
	} else {
		alert("Geocode was not successful for the following reason: " + status);
	}
}

function getBaseURL () {
   return location.protocol + "//" + location.hostname + 
      (location.port && ":" + location.port) + "/";
=======
    var myOptions={
    center: new google.maps.LatLng(30,30),zoom:4,
    mapTypeId:google.maps.MapTypeId.ROADMAP,
    mapTypeControl:false,
    navigationControlOptions:{style:google.maps.NavigationControlStyle.SMALL}
    };
    var map=new google.maps.Map(document.getElementById("map_canvas"),myOptions);
    //var marker=new google.maps.Marker({position:latlon,map:map,title:"You are here!"});
	
>>>>>>> 238ecda0b42bad9b72dcd4c7d1da0b8c9afbd7cf
}

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
