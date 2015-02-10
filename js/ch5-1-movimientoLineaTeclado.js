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
	var y = 10;
	var x = 250;
	var speedCtrl = document.getElementById("speed");
	var dxCtrl = document.getElementById("dx");
	var dyCtrl = document.getElementById("dy");
	var speed = speedCtrl.value;
	var dx = dxCtrl.value;
	var dy = dyCtrl.value;
	var loop;
	
	document.addEventListener("keydown",keyDownListener,false);

	function drawScreen() {
		Debugger.log("speed: " + speed + " dx: " + dx + " dy: " + dy);
		context.fillStyle = '#EEEEEE';
		context.fillRect(0, 0, canvas.width, canvas.height);
		//Box
		context.strokeStyle = '#000000';
		context.strokeRect(1, 1, canvas.width-2, canvas.height-2);
		// Create ball
		y = y + (speed * dy);
		x = x + (speed * dx);
		context.fillStyle = "#000000";
		context.beginPath();
		context.arc(x,y,15,0,Math.PI*2,true);
		context.closePath();
		context.fill();
	}
	
	function gameLoop() {
		loop = window.setTimeout(gameLoop,20);
		drawScreen()
	}
	gameLoop();

	//Event handler
	function keyDownListener(e){
		var key = e.keyCode;
		Debugger.log(e.keyCode);
		if (key == 83){
			dy = dyCtrl.value = 0;
			dx = dxCtrl.value =0;
			window.clearTimeout(loop);
		}
		if (key == 38){
			dy = dyCtrl.value = -1;
			dx = 0; 
		}
		if (key == 40){
			dy = dyCtrl.value = 1;
			dx = 0;
		}
		if (key == 37){
			dx = dxCtrl.value = -1;
			dy = 0;
		}
		if (key == 39){
			dx = dxCtrl.value = 1;
			dy = 0;
		}
		
	}


}