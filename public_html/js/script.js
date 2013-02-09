$(document).ready(function() {

//initialise some bootstrap javascript
	$('.dropdown-toggle').dropdown();
	$('.carousel').carousel('pause');


	$('.option-select').click(function() {
		$('.option-select').removeClass('active');
		$(this).addClass('active');

		$('#option-carousel').carousel(parseInt($(this).attr("index")));

		

	});



})