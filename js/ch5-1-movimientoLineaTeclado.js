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
	var y = canvas.height/2;
	var x = canvas.width/2;
	var speedCtrl = document.getElementById("speed");
	var dxCtrl = document.getElementById("dx");
	var dyCtrl = document.getElementById("dy");
	var speed = speedCtrl.value;
	var dx = dxCtrl.value;
	var dy = dyCtrl.value;
	var loop;
	var maxVelocity = 2;
	
	document.addEventListener("keydown",keyDownListener,false);

	function drawScreen() {
		Debugger.log("speed: " + speed + " dx: " + dx + " dy: " + dy);
		context.fillStyle = '#000';
		context.fillRect(0, 0, canvas.width, canvas.height);
		//Box
		context.strokeStyle = '#000000';
		context.strokeRect(1, 1, canvas.width-2, canvas.height-2);
		// Create ball
		y = y + (speed * dy);
		x = x + (speed * dx);
		context.fillStyle = getColor();
		context.beginPath();
		context.arc(x,y,15,0,Math.PI*2,true);
		context.closePath();
		context.fill();
	}
	
	drawScreen();
	
	/*function gameLoop() {
		drawScreen();
	}*/
	
	//gameLoop();
	//loop = window.setTimeout(gameLoop,50);
	//loop = setInterval(drawScreen,50);

	//Event handler
	function keyDownListener(e){
		var key = e.keyCode;
		Debugger.log(e.keyCode);
		if (key == 83){
			dy = dyCtrl.value = 0;
			dx = dxCtrl.value = 0;
			//window.clearTimeout(loop);
			clearInterval(loop);
		}
		if (key == 38){
			if(dx == 0 && dy == 0){
				loop = setInterval(drawScreen,50);
			}
			dy = dyCtrl.value = -1;
			dx = 0; 
		}
		if (key == 40){
			if(dx == 0 && dy == 0){
				loop = setInterval(drawScreen,50);
			}
			dy = dyCtrl.value = 1;
			dx = 0;
		}
		if (key == 37){
			if(dx == 0 && dy == 0){
				loop = setInterval(drawScreen,50);
			}
			dx = dxCtrl.value = -1;
			dy = 0;
		}
		if (key == 39){
			if(dx == 0 && dy == 0){
				loop = setInterval(drawScreen,50);
			}
			dx = dxCtrl.value = 1;
			dy = 0;
		}	
	}
}