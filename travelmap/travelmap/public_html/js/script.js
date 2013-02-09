$(document).ready(function() {
//Setup Map
	initialiseMap();

//Declare global array to store preferences in


//initialise some bootstrap javascript
	$('.dropdown-toggle').dropdown();
	$('.carousel').carousel('pause');

	$('.option-select').click(function() {
		$('.option-select').removeClass('active');
		$(this).addClass('active');
		$('#option-carousel').carousel(parseInt($(this).attr("index")));
	});

//sliders
	$( ".slider" ).slider({
		value:50,
		min: 00,
		max: 100,
		slide: function( event, ui ) {
			//console.log($(this).parent().children('p'));
			$(this).parent().children('p').html(ui.value + '%');
			$(this).parent().children('p').attr({"data": ui.value});
		}
	});

//submit button
	$('#submit').click(function() {
		var allprefs = {};
		
		var type = {};
		var flights = {};
		var todo = {};

		$('#todo-prefs .tab-pane').each(function() {
			todo[$(this).children('div').attr("pref")] = $(this).children('p').attr("data");
		});

		console.log(todo);

		allprefs[0] = type;
		allprefs[1] = flights;
		allprefs[2] = todo;

		console.log(allprefs);
	})

});
