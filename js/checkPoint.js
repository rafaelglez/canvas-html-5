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
	context.strokeStyle = "red";
	context.lineWidth=5;
	context.moveTo(0, 0);
	context.lineTo(50, 0);
	context.lineTo(50,50);
	context.stroke();
	var isPoint1InPath1=context.isPointInPath(0, 0);
	var isPoint1InPath2=context.isPointInPath(10, 10);
	console.log("isPoint1InPath1=" + isPoint1InPath1);
	console.log("isPoint1InPath2=" + isPoint1InPath2);
	context.closePath();
		
	}
	
	
}