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
		//draw a big box on the screen
		context.fillStyle = "#ccc"; //
		context.globalAlpha = .5;
		context.fillRect(10, 10, 200, 200);
		//leave globalCompositeOperation as is now draw a red square
		context.globalAlpha = 1;
		context.fillStyle = "red";
		context.fillRect(1, 1, 50, 50);
		//now set it to source-over
		context.globalCompositeOperation = "source-over";
		//draw a red square next to the other one
		context.fillRect(60, 1, 50, 50); //now set to destination-atop	
		context.globalCompositeOperation = "destination-over";
		context.fillRect(1, 60, 50, 50);
		//now set globalAlpha
		context.globalAlpha = .3;
		//now set to source-atop
		context.globalCompositeOperation = "source-atop";
		context.fillRect(60, 60, 50, 50);
	}

}