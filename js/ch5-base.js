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

	function drawScreen() {
		context.fillStyle = '#EEEEEE';
		context.fillRect(0, 0, canvas.width, canvas.height);
		//Box
		context.strokeStyle = '#000000';
		context.strokeRect(1, 1, canvas.width-2, canvas.height-2);
	}
	
	function gameLoop() {
		window.setTimeout(gameLoop, 20);
		drawScreen()
	}
	gameLoop();

}