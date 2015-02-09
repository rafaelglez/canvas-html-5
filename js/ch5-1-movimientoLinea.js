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
	
	speedCtrl.addEventListener("change",speedCtrlSet,false);
	dxCtrl.addEventListener("change",dxCtrlSet,false);
	dyCtrl.addEventListener("change",dyCtrlSet,false);

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
		window.setTimeout(gameLoop, 20);
		drawScreen()
	}
	gameLoop();

//Event handlers

function speedCtrlSet(){
	speed = speedCtrl.value;
}

function dxCtrlSet(){
	dx = dxCtrl.value;
}

function dyCtrlSet(){
	dy = dyCtrl.value;
}


}