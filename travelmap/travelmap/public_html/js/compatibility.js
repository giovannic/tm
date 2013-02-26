function getUserPreferences() {
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

	allprefs = jsonConcat(flights, accom);
	allprefs = jsonConcat(allprefs, todo);

	return allprefs;
}

function jsonConcat(o1, o2) {
 for (var key in o2) {
  o1[key] = o2[key];
 }
 return o1;
}

function getOverallScore(cityData, userData) {
	var hotelScore = getHotelScore(cityData, userData);
	var flightScore = getFlightScore(cityData, userData);
	var foodScore = getFoodScore(cityData, userData);
	var artScore = getArtScore(cityData, userData);
	var outdoorScore = getOutdoorScore(cityData, userData);
	var shoppingScore = getShoppingScore(cityData, userData);
	var nightlifeScore = getNightlifeScore(cityData, userData);

	var overallScore = 	(hotelScore + flightScore + 
								foodScore + artScore + outdoorScore + shoppingScore + nightlifeScore) / 5;

	return overallScore;
}

function getPercentageScores(cityData, userData) {

	var scale = 100/getOverallScore(cityData, userData);

	var hotelScore = (getHotelScore(cityData, userData) / 5) * scale;
	var flightScore = (getFlightScore(cityData, userData) / 5) * scale;
	var foodScore = (getFoodScore(cityData, userData) / 5) * scale;
	var artScore = (getArtScore(cityData, userData) / 5) * scale;
	var outdoorScore = (getOutdoorScore(cityData, userData) / 5) * scale;
	var shoppingScore = (getShoppingScore(cityData, userData) / 5) * scale;
	var nightlifeScore = (getNightlifeScore(cityData, userData) / 5) * scale;

	var percentScore = {	"Hotels": hotelScore,
									"Flights": flightScore,
									"Food": foodScore,
									"Arts and Entertainment": artScore,
									"Outdoor": outdoorScore,
									"Shopping": shoppingScore,
									"Nightlife": nightlifeScore
									};
	return percentScore;
}

function getHotelScore(cityData, userData) {
	var hotelScore;
	var cityHotelCost = cityData.averageHotelCostPerNight;
	var userHotelMin = userData["hotel-price-min"];
	var userHotelMax = userData["hotel-price-max"];
	if (cityHotelCost <= userHotelMax && cityHotelCost >= userHotelMin) {
		hotelScore = 100;
	} else if (cityHotelCost < userHotelMin) {
		hotelScore = (cityHotelCost / userHotelMin) * 100;
	} else {
		if (cityHotelCost > 2 * userHotelMax) {
			hotelScore = 0;
		} else {
			hotelScore = (userHotelMax - cityHotelCost / userHotelMax) * 100;
		}
	}
	return hotelScore;
}


function getFlightScore(cityData, userData) {
	var flightScore;
	var cityFlightCost = cityData.flightCostFromCurrentLocation;
	var userFlightMin = userData["flight-price-min"];
	var userFlightMax = userData["flight-price-max"];
	if (cityFlightCost <= userFlightMax && cityFlightCost >= userFlightMin) {
		flightScore = 100;
	} else if (cityFlightCost < userFlightMin) {
		flightScore = (cityFlightCost / userFlightMin) * 100;
	} else {
		if (cityFlightCost > 2 * userFlightMax) {
			flightScore = 0;
		} else {
			flightScore = (userFlightMax - cityFlightCost / userFlightMax) * 100;
		}
	}
	
	return flightScore;
}

function getFoodScore(cityData, userData) {
	var foodScore;
	var cityFood = cityData["Food"];
	var userFood = userData.food;
	if (cityFood > userFood) foodScore = 100;
	else foodScore = (cityFood / userFood) * 100;
	return foodScore;
}

function getArtScore(cityData, userData) {
	var artScore;
	var cityArt = cityData["Arts & Entertainment"];
	var userArt = userData.arts;
	if (cityArt > userArt) artScore = 100;
	else artScore = (cityArt / userArt) * 100;
	return artScore;
}

function getOutdoorScore(cityData, userData) {
	var outdoorScore;
	var cityOutdoor = cityData["Outdoors & Recreation"];
	var userOutdoor = userData.outdoor;
	if (cityOutdoor > userOutdoor) outdoorScore = 100;
	else outdoorScore = (cityOutdoor / userOutdoor) * 100;
	return outdoorScore;
}

function getShoppingScore(cityData, userData) {
	var shoppingScore;
	var cityShopping = cityData["Shop & Service"];
	var userShopping = userData.shopping;
	if (cityShopping > userShopping) shoppingScore = 100;
	else shoppingScore = (cityShopping / userShopping) * 100;
	return shoppingScore;
}

function getNightlifeScore(cityData, userData) {
	var nightlifeScore;
	var cityNightlife = cityData["Nightlife Spot"];
	var userNightlife = userData.nightlife;
	if (cityNightlife > userNightlife) nightlifeScore = 100;
	else nightlifeScore = (cityNightlife / userNightlife) * 100;
	return nightlifeScore;
}

