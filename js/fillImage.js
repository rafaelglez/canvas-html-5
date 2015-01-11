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
	var fillImg = new Image();
	fillImg.src = './img/fill_20x20.gif';
		fillImg.onload = function(){
			var fillPattern = context.createPattern(fillImg,'repeat');
			var fillPattern1 = context.createPattern(fillImg,'no-repeat');
			var fillPattern2 = context.createPattern(fillImg,'repeat-x');
			var fillPattern3 = context.createPattern(fillImg,'repeat-y');
			context.fillStyle = fillPattern1;
			context.fillRect(0,0,100,100);
			context.fillStyle = fillPattern3;
			context.fillRect(0,220,100,100);
			context.translate(0,110);
			context.fillStyle = fillPattern2;
			context.fillRect(0,0,200,20);
			context.fillStyle = fillPattern;
			context.fillRect(0,300,200,200);
		}
	}
}