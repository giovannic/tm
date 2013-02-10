$(document).ready(function() {
//Setup Map
	initialiseMap();
	sendOffData();

//ensure carousel doesn't run itself - is this my most shameless hack?
	window.setInterval(function() {$('#option-carousel').carousel('pause')}, 1000);


//initialise some bootstrap javascript
	$('.dropdown-toggle').dropdown();
	$('.carousel').carousel('pause');

	$('.option-select').click(function() {
		show_only();
		$('.option-select').removeClass('active');
		$(this).addClass('active');
		$('#option-carousel').carousel(parseInt($(this).attr("index")));
	});

	//submit button
	$('.update').click(function() {
		sendOffData();
		hide_only()
	});

	//show/hide trip options
	$('#show-hide-options').click(show_hide_options);

	$('body').click(function(event) {
	    if ($(event.target).closest('#app').length) {
	        hide_only();
	    };
	});

	function show_hide_options() {
		if($('#show-hide-options').hasClass('hide-mode')) {
			$('#option-carousel').fadeOut(400);
			$('#show-hide-options').addClass('show-mode');
			$('#show-hide-options').removeClass('hide-mode');
			$('#show-hide-options').html('<a href="#">Show Trip Options</a>');
			$('#app').removeClass('dialog-open');
		} else {
			$('#option-carousel').fadeIn(400);
			$('#show-hide-options').addClass('hide-mode');
			$('#show-hide-options').removeClass('show-mode');
			$('#show-hide-options').html('<a href="#">Hide Trip Options</a>');
			$('#app').addClass('dialog-open');
		}
	};

	function show_only() {
		if($('#show-hide-options').hasClass('show-mode')) {
			$('#option-carousel').fadeIn(400);
			$('#show-hide-options').addClass('hide-mode');
			$('#show-hide-options').removeClass('show-mode');
			$('#show-hide-options').html('<a href="#">Hide Trip Options</a>');
			$('#app').addClass('dialog-open');
		}
	}

	function hide_only() {
		if($('#show-hide-options').hasClass('hide-mode')) {
			$('#option-carousel').fadeOut(400);
			$('#show-hide-options').addClass('show-mode');
			$('#show-hide-options').removeClass('hide-mode');
			$('#show-hide-options').html('<a href="#">Show Trip Options</a>');
			$('#app').removeClass('dialog-open');
		}
	}

//sliders
	$( ".standard-slider" ).slider({
		value:50,
		min: 1,
		max: 100,
		slide: function( event, ui ) {
			$(this).parent().children('p').html(ui.value + '%');
			$(this).parent().children('p').attr({"data": ui.value});
		}
	});

	$("#hotel-rating-slider").slider({
		range: true,
		values: [ 2, 4 ],
		min: 1,
		max: 5,
		slide: function( event, ui ) {
			$(this).parent().children('p').html("Min: "+ui.values[0]+" <i class='icon-star'></i><br/>Max: "+ui.values[1]+" <i class='icon-star'></i>");
			$(this).parent().children('p').attr({"data-min": ui.values[0]});
			$(this).parent().children('p').attr({"data-max": ui.value[1]});
		}
	});

	$("#room-rate-slider").slider({
		range: true,
		values: [ 50, 200 ],
		min: 10,
		max: 800,
		slide: function( event, ui ) {
			$(this).parent().children('p').html("Min: &#163;"+ui.values[0]+"<br/>Max: &#163;"+ui.values[1]);
			$(this).parent().children('p').attr({"data-min": ui.values[0]});
			$(this).parent().children('p').attr({"data-max": ui.value[1]});
		}
	});

	$("#stay-dur-slider").slider({
		range: true,
		values: [ 3, 8 ],
		min: 1,
		max: 14,
		slide: function( event, ui ) {
			$(this).parent().children('p').html("Min: "+ui.values[0]+" days"+"<br/>Max: "+ui.values[1]+" days");
			$(this).parent().children('p').attr({"data-min": ui.values[0]});
			$(this).parent().children('p').attr({"data-max": ui.value[1]});
		}
	});

	$("#flight-price-slider").slider({
		range: true,
		values: [ 350, 1000 ],
		min: 150,
		max: 1500,
		step: 25,
		slide: function( event, ui ) {
			$(this).parent().children('p').html("Min: &#163;"+ui.values[0]+"<br/>Max: &#163;"+ui.values[1]);
			$(this).parent().children('p').attr({"data-min": ui.values[0]});
			$(this).parent().children('p').attr({"data-max": ui.value[1]});
		}
	});

	$("#flight-time-slider").slider({
		range: true,
		values: [ 2, 3 ],
		min: 1,
		max: 8,
		slide: function( event, ui ) {
			$(this).parent().children('p').html("Min: "+ui.values[0]+" hours<br/>Max: "+ui.values[1]+" hours");
			$(this).parent().children('p').attr({"data-min": ui.values[0]});
			$(this).parent().children('p').attr({"data-max": ui.value[1]});
		}
	});

});

function sendOffData() {

	var allprefs = {};
	
	var accom = {};
	var flights = {};
	var todo = {};

	$('#accom-prefs .tab-pane').each(function() {
		accom[$(this).children('div').attr("pref")+"-min"] = $(this).children('p').attr("data-min");
		accom[$(this).children('div').attr("pref")+"-max"] = $(this).children('p').attr("data-max");
	});

	$('#flight-prefs .tab-pane').each(function() {
		flights[$(this).children('div').attr("pref")+"-min"] = $(this).children('p').attr("data-min");
		flights[$(this).children('div').attr("pref")+"-max"] = $(this).children('p').attr("data-max");
	});

	$('#todo-prefs .tab-pane').each(function() {
		todo[$(this).children('div').attr("pref")] = $(this).children('p').attr("data");
	});

	allprefs[0] = accom;
	allprefs[1] = flights;
	allprefs[2] = todo;

	console.log(allprefs);

	//get_compatibilityScore(todo);

	update(allprefs);
}


