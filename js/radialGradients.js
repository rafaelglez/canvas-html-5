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
	// radial gradient values must remain 0
	var gr = context.createRadialGradient(50,50,25,50,50,100);
	// Add the color stops.
	gr.addColorStop(0,'rgb(255,0,0)');
	gr.addColorStop(.25,'rgb(0,255,0)');
	gr.addColorStop(.5,'rgb(0,0,255)');
	gr.addColorStop(.55,'rgb(255,0,0)');
	gr.addColorStop(1,'rgb(0,255,0)');
	// Use the gradient for the fillStyle.
context.fillStyle = gr;
context.fillRect(0, 0, 150, 150);
	}

}