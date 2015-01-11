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
		context.moveTo(0,0);
		context.quadraticCurveTo(100,25,0,50);
		context.moveTo(150,0);
		context.bezierCurveTo(0,125,300,175,150,300);
		context.moveTo(0,0);
		context.bezierCurveTo(0,canvas.height/2,300,canvas.height/2,canvas.width,canvas.height);
		context.stroke();
		
	}

}