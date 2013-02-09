function initialiseMap() {
	var mapOptions = {
		center: new google.maps.LatLng(52.536273,13.623047),
		zoom: 4,
		mapTypeId: google.maps.MapTypeId.HYBRID
	};
	var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
}
