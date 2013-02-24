var items = {} 

function itinerary_add(uri) {
  $.getJSON(getBaseURL() + uri.substr(1), function(data){
        if (data)
  {
  	items[uri] = data;
  	itinerary_update();
  }
  });
}

function itinerary_remove(uri){
  delete items[uri];
}

function itinerary_update(){
  //fix the ui
}

ItinOverlay.prototype = new google.maps.OverlayView();

function ItinOverlay(location, item, type, map) {

  // Now initialize all properties.
  this.location_ = location;
  this.item_ = item;
  this.map_ = map;
  this.type_ = type;

  if (type = "flight")
  {
    inner_html = "<div class='cityOverlay'><p>flight to" + 
    "</p><h4>" + 
    cities[item.country].name +
    "</h4><p>costs</p><h3>&pound;" +
    item.cost +
    "</h3>" + 
    "<p><a onclick=itinerary_add('" + item.resource_uri + "')>add</a></p>" + 
    "</div>";
  }

  if (type = "hotel")
  {
    inner_html = "<div class='cityOverlay'><p>hotel in" + 
    "</p><h4>" + 
    cities[item.city].name +
    "</h4><p>costs</p><h3>&pound;" +
    item.rate +
    "</h3>" + 
    "<p><a onclick=itinerary_add('" + item.resource_uri + "')>add</a></p>" + 
    "</div>";
  }
  // We define a property to hold the image's
  // div. We'll actually create this div
  // upon receipt of the add() method so we'll
  // leave it null for now.
  this.div_ = null;

  // Explicitly call setMap() on this overlay
  this.setMap(map);
}


ItinOverlay.prototype.onAdd = function() {

  // Note: an overlay's receipt of onAdd() indicates that
  // the map's panes are now available for attaching
  // the overlay to the map via the DOM.

  // Create the DIV and set some basic attributes.
  var div = document.createElement('div');
  
  $(div).addClass("popover top cityOverlayContainer");
  div.style.position = "absolute";
  div.style.display = "block";
  $(div).html(inner_html);


  // Set the overlay's div_ property to this DIV
  this.div_ = div;

  // We add an overlay to a map via one of the map's panes.
  // We'll add this overlay to the overlayImage pane.
  var panes = this.getPanes();
  panes.floatPane.appendChild(div);
}

ItinOverlay.prototype.draw = function() {

  // Size and position the overlay. We use a southwest and northeast
  // position of the overlay to peg it to the correct position and size.
  // We need to retrieve the projection from this overlay to do this.
  var overlayProjection = this.getProjection();

  // Retrieve the southwest and northeast coordinates of this overlay
  // in latlngs and convert them to pixels coordinates.
  // We'll use these coordinates to resize the DIV.
  var locationPx = overlayProjection.fromLatLngToDivPixel(this.location_);

  // Resize the image's DIV to fit the indicated dimensions.
  var div = this.div_;
  set_height = 130;
  set_width = 120;

  div.style.left = locationPx.x + 'px';
  div.style.top = (locationPx.y - set_height) + 'px';
  div.style.width = set_width + 'px';
  div.style.height = set_height + 'px';
}

ItinOverlay.prototype.onRemove = function() {
  this.div_.parentNode.removeChild(this.div_);
  this.div_ = null;
}
