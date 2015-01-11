window.addEventListener('load', eventWindowLoaded, false);
function eventWindowLoaded() {
	canvasApp();
}

function canvasSupport () {
	return Modernizr.canvas;
}


function canvasApp(){

	if (!canvasSupport()) {
		return;
		}else{
			var canvas = document.getElementById("canvas");
			var context = canvas.getContext("2d");
		}

	drawScreen();

	function drawScreen() {
	// Sample 1: round end, bevel join, at top left of canvas
	context.strokeStyle = "black";
	context.lineWidth = 10;
	context.lineJoin = 'bevel';
	context.lineCap = 'round';
	context.beginPath();
	context.moveTo(5, 5);
	context.lineTo(25, 5);
	context.lineTo(25,25);
	context.stroke();
	context.closePath();
	// Sample 2: round end, miter join, not at top or left of canvas
	context.lineJoin = 'miter';
	context.beginPath();
	context.moveTo(10, 50);
	context.lineTo(35, 50);
	context.lineTo(35,75);
	context.stroke();
	context.closePath();
	// Sample 3: flat end, round join, not at top or left of canvas
	context.lineJoin = 'round';
	context.lineCap = 'butt';
	context.beginPath();
	context.moveTo(10, 100);
	context.lineTo(35, 100);
	context.lineTo(35,125);
	context.stroke();
	context.closePath();

	}

}