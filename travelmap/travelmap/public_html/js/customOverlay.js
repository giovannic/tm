USGSOverlay.prototype = new google.maps.OverlayView();

function USGSOverlay(location, city, score, map) {

  // Now initialize all properties.
  this.location_ = location;
  this.city_ = city;
  this.score_ = score.toFixed(2)*100;
  this.map_ = map;

  inner_html = "<div class='cityOverlay'><h4>"+this.city_+"</h4><h3>"+this.score_+"%</h3><p>compatible</p></div>";

  // We define a property to hold the image's
  // div. We'll actually create this div
  // upon receipt of the add() method so we'll
  // leave it null for now.
  this.div_ = null;

  // Explicitly call setMap() on this overlay
  this.setMap(map);
}


USGSOverlay.prototype.onAdd = function() {

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

USGSOverlay.prototype.draw = function() {

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
  set_height = 90;
  set_width = 120;

  div.style.left = locationPx.x + 'px';
  div.style.top = (locationPx.y - set_height) + 'px';
  div.style.width = set_width + 'px';
  div.style.height = set_height + 'px';
}

USGSOverlay.prototype.onRemove = function() {
  this.div_.parentNode.removeChild(this.div_);
  this.div_ = null;
}
