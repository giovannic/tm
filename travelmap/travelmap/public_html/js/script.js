$(document).ready(function() {
//Setup Map
	initialiseMap();

//ensure carousel doesn't run itself - is this my most shameless hack?
	window.setInterval(function() {$('#option-carousel').carousel('pause')}, 1000);


//initialise some bootstrap javascript
	$('.dropdown-toggle').dropdown();
	$('.carousel').carousel('pause');

	$('.option-select').click(function() {
		$('.option-select').removeClass('active');
		$(this).addClass('active');
		$('#option-carousel').carousel(parseInt($(this).attr("index")));
	});

//sliders
	$( ".standard-slider" ).slider({
		value:50,
		min: 0,
		max: 100,
		slide: function( event, ui ) {
			$(this).parent().children('p').html(ui.value + '%');
			$(this).parent().children('p').attr({"data": ui.value});
		}
	});

	$( ".range-slider" ).slider({
		range: true,
		values: [ 350, 1000 ],
		min: 150,
		max: 1500,
		slide: function( event, ui ) {
			$(this).parent().children('p').html("Min: &#163;"+ui.values[0]+"<br/>Max: &#163;"+ui.values[1]);
			$(this).parent().children('p').attr({"data-min": ui.values[0]});
			$(this).parent().children('p').attr({"data-max": ui.value[1]});
		}
	});

//submit button
	$('.update').click(function() {
		var allprefs = {};
		
		var type = {};


		var flights = {};


		var todo = {};

		$('#todo-prefs .tab-pane').each(function() {
			todo[$(this).children('div').attr("pref")] = $(this).children('p').attr("data");
		});

		$('#todo-prefs .tab-pane').each(function() {
			todo[$(this).children('div').attr("pref")] = $(this).children('p').attr("data");
		});

		$('#todo-prefs .tab-pane').each(function() {
			todo[$(this).children('div').attr("pref")] = $(this).children('p').attr("data");
		});

		console.log(todo);

		allprefs[0] = type;
		allprefs[1] = flights;
		allprefs[2] = todo;

		console.log(allprefs);

		update(allprefs);


	})

});
