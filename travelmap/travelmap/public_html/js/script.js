//global vars

i = 2; //image source index for front page slide show

$(document).ready(function() {
//Setup Map if the relvant canvas is in the DOM
	if($('#map_canvas').length > 0){
		resize_map();
		initialiseMap();
	}
//neccessary layout javascript
	align_carousel();
//dynamically resize map height on viewport resize
	$(window).resize(resize_map);
	$(window).resize(align_carousel);

//ensure carousel doesn't run itself - is this my most shameless hack?
/*	
*	I BELIEVE THIS HORRIBLE HACK IS NO LONGER REQUIRED
*	I'M COMMENTING IT OUT FOR NOW - IF YOU FIND THE UI
*	STARTS RUNNING AWAY WITH ITSELF UNCOMMENT IT
*
*/
//	window.setInterval(function() {$('#option-carousel').carousel('pause'); console.log(99)}, 1000);

	window.setInterval(cycleSfImg, 5000);

//initialise some bootstrap javascript
	$('.dropdown-toggle').dropdown();
	$('.carousel').carousel();
	$('.sf-carousel').carousel({
		interval : 2000
	});

	$('.option-select').click(function() {
		show_only();
		$('.option-select').removeClass('active');
		$(this).addClass('active');
		$('#option-carousel').carousel(parseInt($(this).attr("index")));
		$('#option-carousel').carousel('pause'); //somewhat less hacky...
	});

/*
*
*
*
***** homepage js event handlers *****/

	$('#signup-prompt').click(function(){
		$('body,html').animate({
			scrollTop: 730
		}, 300);
	})



/*
*
*
*
***** app js event handlers *****/

	//submit button
	$('.update').click(function() {
		updatePieCharts();		
		sendOffData();
		hide_only()
	});

	$('body').click(function(event) {
	    if ($(event.target).closest('#app').length) {
	        hide_only();
	    };
	});

//map theme select
	$('.theme-select').click(function() {
		set_map_style($(this).attr('theme-index'));
	});

//background select
	$('.bg-select').click(function() {
		set_bg($(this).attr('index'), $(this).attr('inverse'));
	});

//footer UI
	$('footer#app-bottom-nav').mouseenter(footerTabHide);
	$('footer#app-bottom-nav').mouseleave(footerTabShow);


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

}); //end of document ready

//UI javascript

function align_carousel() {
	$('#option-carousel').css('left', function() {
		return ($('body').width() - $('#option-carousel').width())/2;
	});
}

function show_hide_options() {
		if(show_only() == 0) {
			hide_only();
		}
	};

function show_only() {
	if($('#option-carousel').hasClass('showing')) {
		$('#option-carousel').fadeIn(400);
		$('#show-hide-options').toggleClass('hide-mode show-mode');
		$('#show-hide-options').html('<a href="#">Hide Trip Options</a>');
		$('#app').addClass('dialog-open');
		return 1;
	} else {return 0}
}

function hide_only() {
	if($('#show-hide-options').hasClass('showing')==0) {
		$('#option-carousel').fadeOut(400);
		$('#show-hide-options').toggleClass('hide-mode show-mode');
		$('#show-hide-options').html('<a href="#">Show Trip Options</a>');
		$('#app').removeClass('dialog-open');
	}
}

function footerTabHide() {
	$('#footer-tab').animate({left:'-110px'}, 400);
}

function footerTabShow() {
	$('#footer-tab').animate({left:'-60px'}, 400);
}

//Map javascript

function resize_map() {
	k = 0.95; //fraction of remaining height given over to map
	o = 80; //offset from top (amount of window height taken up by top nave bar)
	$('#app').height( k*($('body').height()-o) + 'px')
}

//server interation javascript

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

	get_compatibilityScore(todo);

	//update(allprefs);
}

//Homepage Javascript

cycleSfImg = function() {
	$('.sf-inner').fadeOut(800, function() {
	    $('.sf-img').attr("src", './img/shop-imgs/map'+i%9+'.jpg');
	    $('.sf-inner').fadeIn(800);
	});
	i++;
}

