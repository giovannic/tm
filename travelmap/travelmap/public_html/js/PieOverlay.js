PieOverlay.prototype = new google.maps.OverlayView();

var thresholds = [95,95,85,80,70,60,40,20,10,0,0,0,0];
//var thresholds = [100,100,100,100,100,100,100,100,100,100,100,100];
//var thresholds = [0,0,0,0,0,0,0,0,0,0,0,0];

function PieOverlay(location, city, score, breakdown, map) {

	// Now initialize all properties.
	this.location_ = location;
	this.city_ = city;
	this.score_ = score.toFixed(2);
	this.breakdown_ = breakdown;
	this.map_ = map;
	this.threshold_ = thresholds[map.getZoom()];
	this.pie_ = null;
	this.dot_ = null;

	// We define a property to hold the image's
	// div. We'll actually create this div
	// upon receipt of the add() method so we'll
	// leave it null for now.
	this.div_ = null;

	// Explicitly call setMap() on this overlay
	this.setMap(map);
}


PieOverlay.prototype.onAdd = function() {

	// Note: an overlay's receipt of onAdd() indicates that
	// the map's panes are now available for attaching
	// the overlay to the map via the DOM.

	// Create the DIV and set some basic attributes.
	var pie = document.createElement('div');
	pie.style.position = "absolute";
	pie.style.display = "block";
	makePieChart(pie, this.breakdown_, (this.score_/3), (this.score_/3), (this.score_/3));

	var dot = document.createElement('img');
	dot.style.position = "absolute";
	dot.style.display = "block";
	dot.src = getBaseURL() + "static/img/maps-icons/redDot.svg";
	

	var containerDiv = document.createElement('div');
	containerDiv.style.position = "absolute";
	containerDiv.style.display = "block";
	
	containerDiv.appendChild(pie);
	containerDiv.appendChild(dot);

	// Set the overlay's div_ property to this DIV
	this.div_ = containerDiv;
	this.pie_ = pie;
	this.dot_ = dot;

	// We add an overlay to a map via one of the map's panes.
	// We'll add this overlay to the overlayImage pane.
	var panes = this.getPanes();
	panes.floatPane.appendChild(containerDiv);
}

PieOverlay.prototype.draw = function() {
	
	this.threshold_ = thresholds[map.getZoom()];
	if (this.score_ < this.threshold_) {
		this.pie_.style.visibility = 'hidden';
		this.dot_.style.visibility = 'visible';
	} else {
		this.pie_.style.visibility = 'visible';
		this.dot_.style.visibility = 'hidden';
	}
	var overlayProjection = this.getProjection();
	var locationPx = overlayProjection.fromLatLngToDivPixel(this.location_);

	// Resize the image's DIV to fit the indicated dimensions.
	set_height = this.score_ / 1.5;
	set_width = this.score_ / 1.5;

	var pie = this.pie_;
	pie.style.left = 0;
	pie.style.top = 0;
	pie.style.width = set_width + 'px';
	pie.style.height = set_height + 'px';

	var dot = this.dot_;
	dot.style.left = ((set_width/2) - 5) + 'px';
	dot.style.top = ((set_height/2) - 5) + 'px';
	dot.style.width = "10px";
	dot.style.height = "10px";

	var div = this.div_;
	div.style.left = (locationPx.x - (set_width/2)) + 'px';
	div.style.top = (locationPx.y - (set_height/2)) + 'px';
	div.style.width = set_width + 'px';
	div.style.height = set_height + 'px';
}

PieOverlay.prototype.onRemove = function() {
	this.div_.parentNode.removeChild(this.div_);
	this.div_ = null;
}