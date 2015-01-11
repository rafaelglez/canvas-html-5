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
	}
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");
	
	drawScreen();

	function drawScreen() {
	context.fillStyle = '#aaaaaa';
	context.fillRect(0, 0, 200, 200);
	context.fillStyle = '#000000';
	context.font = '20px sans-serif';
	context.textBaseline = 'top';
	context.fillText ("Canvas!", 0, 0);
	}

}