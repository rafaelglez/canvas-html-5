window.addEventListener('load', eventWindowLoaded, false);
function eventWindowLoaded() {
	canvasApp();
}

function canvasSupport () {
	return Modernizr.canvas;
}


function canvasApp(){
	var yOffset=0;
	
	if (!canvasSupport()) {
		return;
		}else{
			var canvas = document.getElementById("canvas");
			var context = canvas.getContext("2d");
		}

	function drawScreen() {
		context.font = "50px serif"
		context.fillStyle = "Olive";
		context.fillText ("Hello World", 100, 80);
	}
	
	drawScreen();
}