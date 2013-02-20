/*
*
*
*	THIS DOCUMENT IS FOR HOLDING MAP STYLES ONLY
*	IT ALSO DEFINES THE FUNCTION REQUIRED FOR
*	CHANGING THE STYLES
*
*	IF YOU WANT TO ADD A STYLE OPTION VISIT THIS LINK
*	http://gmaps-samples-v3.googlecode.com/svn/trunk/styledmaps/wizard/index.html
*
*	YOU'LL ALSO HAVE TO ADD A DROPDOWN OPTION IN index.html
*	JUST COPY PASTE FROM THE PREVIOUS ONES AND UPDATE THE THEME-INDEX ATTRIBUTE
*	
**************************************************/


styles = new Array();

styles[0] = [{}]; //default styles
styles[1] = [
  {
    "elementType": "labels",
    "stylers": [
      { "visibility": "off" }
    ]
  },{
  }]
styles[2] = [
  {
    "featureType": "landscape.natural",
    "stylers": [
      { "visibility": "simplified" },
      { "color": "#3ebbe2" },
      { "gamma": 6.43 }
    ]
  },{
    "featureType": "water",
    "stylers": [
      { "visibility": "on" },
      { "color": "#363737" }
    ]
  },{
    "featureType": "road.highway",
    "stylers": [
      { "visibility": "simplified" },
      { "color": "#fdf9c9" }
    ]
  },{
    "featureType": "road.arterial",
    "stylers": [
      { "visibility": "simplified" },
      { "saturation": -71 }
    ]
  }];
styles[3] = [
  {
    "featureType": "landscape.natural",
    "stylers": [
      { "visibility": "simplified" },
      { "color": "#3ebbe2" },
      { "gamma": 6.43 }
    ]
  },{
    "featureType": "water",
    "stylers": [
      { "visibility": "on" },
      { "color": "#363737" }
    ]
  },{
    "featureType": "road.highway",
    "stylers": [
      { "visibility": "simplified" },
      { "color": "#fdf9c9" }
    ]
  },{
    "featureType": "road.arterial",
    "stylers": [
      { "visibility": "simplified" },
      { "saturation": -71 }
    ]
  },{
  },{
    "elementType": "labels",
    "stylers": [
      { "visibility": "off" }
    ]
  },{
    "featureType": "landscape",
    "elementType": "labels",
    "stylers": [
      { "visibility": "on" }
    ]
  }];


function set_map_style(i) {
	var styledMap = new google.maps.StyledMapType(styles[i], {name: "Styled Map"});
	map.mapTypes.set('map_style', styledMap);
	map.setMapTypeId('map_style');
}