/*
*
*
*	THIS DOCUMENT IS FOR PROTOTYPE JS ONLY
*
*	IF YOU WANT TO ADD A MAP STYLE OPTION VISIT THIS LINK
*	http://gmaps-samples-v3.googlecode.com/svn/trunk/styledmaps/wizard/index.html
*	
**************************************************/

function set_map_style(i) {
  var styledMap = new google.maps.StyledMapType(styles[i], {name: "Styled Map"});
  map.mapTypes.set('map_style', styledMap);
  map.setMapTypeId('map_style');
}

function set_bg(i, inverse) {
  $('body').removeAttr('class');
  $('body').addClass('bg'+i);
  if(inverse==1){
    $('header, footer, #footer-tab').addClass('navbar-inverse');
  } else {
    $('header, footer, #footer-tab').removeClass('navbar-inverse');
  }
}

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
