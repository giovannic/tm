var svgns = "http://www.w3.org/2000/svg";

function makePieChart(containerDiv, values, x, y, radius) {
	var theSvg = makeSvg(containerDiv);
	var noOfSegments = Object.keys(values).length;
	var total = 0;
	for ( var key in values) {
		var percent = values[key];
		var segmentPositions = percentToPosition(total, total + percent, radius);
		var segmentPositions = translateTo(segmentPositions, x, y);
		drawSegment(theSvg, x, y, segmentPositions, radius, makeRandomColour(), percent);
		total += percent;
	}
	total = 0;
	for ( var key in values) {
		var percent = values[key];
		var segmentPositions = percentToPosition(total, total + percent, radius);
		var segmentPositions = translateTo(segmentPositions, x, y);
		if (percent > 15) drawLabel(theSvg, x, y, segmentPositions, radius, key, percent);
		total += percent;
	}
}

function makeRandomColour() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.round(Math.random() * 15)];
    }
    return color;
}

function makeSvg(containerDiv) {
	var mySvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	mySvg.setAttribute("version", "1.2");
	mySvg.setAttribute("baseProfile", "tiny");
	containerDiv.appendChild(mySvg);
	return mySvg;
}

function translateTo(segmentPosition, x, y) {
	var result = { "startX" : 0 , "startY" : 0 , "endX" : 0 , "endY" : 0, "labelX" : 0, "labelY" : 0};

	result.startX = segmentPosition.startX + x;
	result.startY = segmentPosition.startY + y;

	result.endX = segmentPosition.endX + x;
	result.endY = segmentPosition.endY + y;

	result.labelX = segmentPosition.labelX + x;
	result.labelY = segmentPosition.labelY + y;

	return result;
}

function percentToPosition(startPercent, endPercent, radius) {
	var startRadian = (startPercent / 100) * 2 * Math.PI + 0.5*Math.PI;
	var endRadian = (endPercent / 100) * 2 * Math.PI + 0.5*Math.PI;
	var labelRadian = (startRadian + endRadian) / 2;

	var result = { "startX" : 0 , "startY" : 0 , "endX" : 0 , "endY" : 0, "labelX" : 0, "labelY" : 0};

	result.startX = radius * Math.cos(startRadian);
	result.startY = -radius * Math.sin(startRadian);

	result.endX = radius * Math.cos(endRadian);
	result.endY = -radius * Math.sin(endRadian);

	result.labelX = (radius/2) * Math.cos(labelRadian);
	result.labelY = -(radius/2) * Math.sin(labelRadian);

	return result;	
}

function drawSegment(theSvg, x, y, segPositions, radius, colour, percent) {
	var segment = document.createElementNS("http://www.w3.org/2000/svg", "path");
	var long = 0;
	if (percent > 50) long = 1; 
	segment.setAttribute("d","M " + x + " " + y + " " + // First move to center of pie
	"L " + segPositions.startX + " " + segPositions.startY + " " + // Draw a line to the start of the arc
		"A " + radius + " " + radius + " " + // Draw arc with same x and y radius
		" 0 " + long + " 0 " + // no rotation, large arc, no sweep
		segPositions.endX + " " + segPositions.endY + " " + // Draw until end point
		"Z"); // Draw a line back to centre
	segment.setAttribute("fill", colour);
	theSvg.appendChild(segment);
}

function drawLabel(theSvg, x, y, segPositions, radius, text, percent) {
	var segment = document.createElementNS("http://www.w3.org/2000/svg", "path");
	var long = 0;
	if (percent > 50) long = 1; 
	segment.setAttribute("d","M " + x + " " + y + " " + // First move to center of pie
	"L " + segPositions.startX + " " + segPositions.startY + " " + // Draw a line to the start of the arc
		"A " + radius + " " + radius + " " + // Draw arc with same x and y radius
		" 0 " + long + " 0 " + // no rotation, large arc, no sweep
		segPositions.endX + " " + segPositions.endY + " " + // Draw until end point
		"Z"); // Draw a line back to centre

	
	// Calculate text width
	var width = $('<span></span>').css({display:'none',whiteSpace:'nowrap',fontSize:'10'}).appendTo($('body')).text(text).width();
	var height = $('<span></span>').css({display:'none',whiteSpace:'nowrap',fontSize:'10'}).appendTo($('body')).text(text).height();
	
	var bbox = segment.getBBox();
	var labelx = segPositions.labelX - (width/4);
	var labely = segPositions.labelY - (height/4);
	var percenty = labely + (height/2); 

	var label = document.createElementNS("http://www.w3.org/2000/svg", "text");
	label.setAttribute("x", labelx);
	label.setAttribute("y", labely);
	label.setAttribute("font-size", 10);
	label.textContent = text;
	theSvg.appendChild(label);

	var percentLbl = document.createElementNS("http://www.w3.org/2000/svg", "text");
	percentLbl.setAttribute("x", labelx);
	percentLbl.setAttribute("y", percenty);
	percentLbl.setAttribute("font-size", 10);
	percentLbl.textContent = percent + "%";
	theSvg.appendChild(percentLbl);	
	
}
