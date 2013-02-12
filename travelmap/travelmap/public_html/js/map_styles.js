/*
*
*
*	THIS DOCUMENT IS FOR HOLDING MAP STYLES ONLY
*	IT ALSO DEFINES THE FUNCTION REQUIRED FOR
*	CHANGING THE STYLES
*
*
**************************************************/


styles = new Array();

styles[0] = [{}];
styles[1] = [
	  {
	    "featureType": "water",
	    "stylers": [
	      { "visibility": "on" },
	      { "color": "#0c0b45" },
	      { "weight": 0.1 }
	    ]
	  },{
	    "featureType": "landscape.natural.landcover",
	    "stylers": [
	      { "visibility": "on" },
	      { "color": "#c9ccd0" }
	    ]
	  },{
	    "featureType": "road.highway",
	    "stylers": [
	      { "visibility": "on" },
	      { "lightness": 54 },
	      { "saturation": -58 },
	      { "color": "#4a2680" },
	      { "gamma": 7.87 }
	    ]
	  },{
	    "featureType": "landscape.man_made",
	    "elementType": "geometry.stroke",
	    "stylers": [
	      { "color": "#001b50" },
	      { "visibility": "simplified" }
	    ]
	  },{
	    "featureType": "road",
	    "elementType": "labels",
	    "stylers": [
	      { "visibility": "off" }
	    ]
	  },{
	    "featureType": "road.arterial",
	    "stylers": [
	      { "visibility": "off" }
	    ]
	  },{
	    "featureType": "administrative",
	    "elementType": "labels.icon",
	    "stylers": [
	      { "visibility": "off" }
	    ]
	  },{
	    "elementType": "labels.text.fill",
	    "stylers": [
	      { "visibility": "on" },
	      { "invert_lightness": true },
	      { "color": "#9d009a" },
	      { "lightness": 37 },
	      { "gamma": 1.33 }
	    ]
	  },{
	    "elementType": "labels.text.stroke",
	    "stylers": [
	      { "gamma": 7.24 },
	      { "color": "#020001" },
	      { "weight": 1.6 },
	      { "invert_lightness": true },
	      { "visibility": "on" }
	    ]}];

function set_map_style(i) {
	var styledMap = new google.maps.StyledMapType(styles[i], {name: "Styled Map"});
	map.mapTypes.set('map_style', styledMap);
	map.setMapTypeId('map_style');
}