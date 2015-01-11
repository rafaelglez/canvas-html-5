window.addEventListener('load', eventWindowLoaded, false);
function eventWindowLoaded() {
	canvasApp();
}

function canvasSupport () {
	return Modernizr.canvas;
}


function canvasApp(){
	var colorStops = new Array(
		{color:"#FF0000", stopPercent:0},
		{color:"#FFFF00", stopPercent:.125},
		{color:"#00FF00", stopPercent:.375},
		{color:"#0000FF", stopPercent:.625},
		{color:"#FF00FF", stopPercent:.875},
		{color:"#FF0000", stopPercent:1});
	var message = "COLORS";
	var textBaseline = "middle";
	var textAlign = "center";
	var fontSize = "120";
	var fontFace = "Arial";
	var fontWeight = "normal";
	var fontStyle = "normal";


	if (!canvasSupport()) {
		return;
	}
		
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");
	var xPosition = canvas.width/2;
	var yPosition = canvas.height/2;

	drawScreen();
	gameLoop();


	function drawScreen() {
		
		var gradient = context.createLinearGradient(canvas.width/2,0,canvas.width/2,canvas.height);
		context.width = context.width;
		
		context.rect(0,0,canvas.width,canvas.height);
		context.stroke();
		for (var i=0; i < colorStops.length; i++) {
			var tempColorStop = colorStops[i];
			var tempColor = tempColorStop.color;
			var tempStopPercent = tempColorStop.stopPercent;
			gradient.addColorStop(tempStopPercent,tempColor);
			tempStopPercent += .015;
			if (tempStopPercent > 1) {
				tempStopPercent = 0;
			}
			tempColorStop.stopPercent = tempStopPercent;
			colorStops[i] = tempColorStop;
			//Debugger.log(colorStops[i]);
		}		
		context.textBaseline = textBaseline;
		context.textAlign = textAlign;
		context.font = fontWeight + " " + fontStyle + " " + fontSize + "px " + fontFace;
		context.fillStyle = gradient;
		context.fillText (message, xPosition ,yPosition);
	}
	
	function gameLoop() {
		window.setTimeout(gameLoop, 200);
		drawScreen();
	}
}