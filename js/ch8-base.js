window.addEventListener('load', canvasApp, false);

function canvasSupport () {
	return Modernizr.canvas;
}

function canvasApp(){

	var canvas = document.getElementById("canvas");
	var FRAME_RATE = 30;
	var intervalTime = 1000/FRAME_RATE;
	var loop;
	var shipState = 0; //canvasApp level variables //0 = static, 1 = thrust
	
	//Debugger.log(canvas);
	// Add event listener to keyword
	document.addEventListener("keydown",keyDownListener,false);

	if (!canvas || !canvas.getContext){
		return;
	}
	var context = canvas.getContext("2d");
	if (!context) {
	return;
	}
	
	gameLoop();
	
	function gameLoop() {
		loop = window.setTimeout(gameLoop, intervalTime);
		drawScreen();
	}
	
	function drawScreen() {
	
		//update the shipState
		shipState++;
		if (shipState >1) {
			shipState=0;
		}
	
		// draw background and text
		context.fillStyle = '#000000';
		context.fillRect(0, 0, 200, 200);
		context.fillStyle = '#ffffff';
		context.font = '20px sans-serif';
		context.textBaseline = 'top';
		context.fillText ("Player Ship - Static", 0, 180);
		//drawShip
		context.strokeStyle = '#ffffff';
		context.beginPath();
		context.moveTo(10,0);
		context.lineTo(19,19);
		context.lineTo(10,9);
		context.moveTo(9,9);
		context.lineTo(0,19);
		context.lineTo(9,0);
		if (shipState==1) {
			//draw thrust
			context.moveTo(8,13);
			context.lineTo(11,13);
			context.moveTo(9,14);
			context.lineTo(9,18);
			context.moveTo(10,14);
			context.lineTo(10,18);
		}
		
		context.stroke();
		context.closePath();
	}	
	
	//Event handlers
	function keyDownListener(e){
		var key = e.keyCode;
		Debugger.log(e.keyCode);
		if (key == 83){
		clearInterval(loop);
		}
	}

	
}