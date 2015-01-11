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
	var gr = context.createLinearGradient(0, 0, 100, 0);
	// Add the color stops.
	gr.addColorStop(0,'rgb(255,0,0)');
	gr.addColorStop(.5,'rgb(0,255,0)');
	gr.addColorStop(1,'rgb(255,0,0)');
	// Use the gradient for the fillStyle.
	context.strokeStyle = gr;
	context.strokeRect(0, 0, 100, 100);
	context.strokeRect(0, 100, 50, 100);
	context.strokeRect(0, 200, 200, 100);
	}

}