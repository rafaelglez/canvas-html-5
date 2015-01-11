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
		context.clearRect(0,0,canvas.width,canvas.height);
		var currentPath=context.beginPath();
		context.strokeStyle = "red"; //need list of available colors
		context.lineWidth=5;
		context.moveTo(0, 0+yOffset);
		context.lineTo(50, 0+yOffset);
		context.lineTo(50,50+yOffset);
		var isPoint1InPath1=context.isPointInPath(0, 0);
		var isPoint1InPath2=context.isPointInPath(10, 10);
		console.log("isPoint1InPath1=" + isPoint1InPath1);
		console.log("isPoint1InPath2=" + isPoint1InPath2);
		context.stroke();
		context.closePath();
		yOffset+=1;
		Debugger.log("currentPath: "+currentPath +" yOffset: "+yOffset);
	}
	
	function gameLoop() {
		if (yOffset > 60){
			;
		}
		else{
			window.setTimeout(gameLoop, 20);
		}
		drawScreen();
	}
	gameLoop();
	
	// function gameLoop() {
		// window.setInterval(gameLoop, 200);
		// drawScreen()
	// }
	
}