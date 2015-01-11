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
		context.beginPath();
		context.strokeStyle = "black";
		context.lineWidth = 5;
		context.arc(100, 100, 20, (Math.PI/180)*0, (Math.PI/180)*270, false);
		context.lineTo(190,30)
		context.lineTo(120,100)
		
		context.stroke();
		
		context.closePath();
	}

}