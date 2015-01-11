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
	// vertical gradient values must remain 0
	var gr = context.createLinearGradient(0, 0, 0, 300);
	// Add the color stops.
	gr.addColorStop(0,'rgb(255,0,0)');
	gr.addColorStop(.25,'rgb(0,255,0)');
	gr.addColorStop(.5,'rgb(0,0,255)');
	gr.addColorStop(.55,'rgb(255,0,0)');
	gr.addColorStop(1,'rgb(0,255,0)');
	// Use the gradient for the fillStyle.
	context.fillStyle = gr;
	context.fillRect(0, 0,200,100);
	context.fillRect(0, 100, 50, 100);
	context.fillRect(0, 200, 200, 100);
	}

}