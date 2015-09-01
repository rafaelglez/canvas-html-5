window.addEventListener('load', eventWindowLoaded, false);
function eventWindowLoaded() {
	mordiscoApp();
}

function canvasSupport () {
	return Modernizr.canvas;
}

function mordiscoApp(){

	if (!canvasSupport()) {
		return;
	}
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");
	var speed = 3;
	var dx = 0;
	var dy = 0;
	var loop;
	var sqrWidth = 15;
	var sqrHeight = 15;
	var maxVelocity = 5;
	var sqrWidthOffset = sqrWidth/2
	var sqrHeightOffset = sqrHeight/2
	var y = (canvas.height/2) - sqrWidthOffset;
	var x = (canvas.width/2) - sqrHeightOffset;
	var xPrev = null;
	var yPrev = null;
	var maxVelocity = 5;
	var sqrArray = [];
	var number = 1;
	var sqrArrayLen = 0;
	const MIN_LENGTH = 2;
	
	document.addEventListener("keydown",keyDownListener,false);

	function drawScreen() {
		//Debugger.log("speed: " + speed + " dx: " + dx + " dy: " + dy);
		//Dibujar la pantalla
		context.fillStyle = '#00f';
		context.fillRect(0, 0, canvas.width, canvas.height);
		
		
		//modificamos el valor de x y y de acuerdo a lo solicitado por el usuario
		xPrev = x;
		yPrev = y;
		x = x + (speed * dx);
		y = y + (speed * dy); 
		
		
		// dibujamos un rectagulo en el centro de la pantalla
		context.fillStyle = "#FF0";
		context.beginPath();
		
		if(x != xPrev || y != yPrev){
			sqrArray.push([x,y,sqrWidth,sqrHeight]);
		}
		else{
			context.rect(x,y,sqrWidth,sqrHeight);
		}
		
		sqrArrayLen = sqrArray.length;
		if (sqrArrayLen > MIN_LENGTH){
			sqrArray = sqrArray.slice(sqrArray.length - (number + 1), sqrArray.length);
		}
		
		Debugger.log("array len"+sqrArray.length);
		Debugger.log("number "+number);
		
		
		for(var i = 0, len = sqrArray.length; i < len; i++){
			context.rect(sqrArray[i][0],sqrArray[i][1],sqrArray[i][2],sqrArray[i][3]);
		}

		context.closePath();
		context.fill();
		
		//identificamos centro del canvas
		// context.moveTo(0,canvas.height/2);
		// context.lineTo(canvas.width,canvas.height/2);
		// context.moveTo(canvas.width/2,0);
		// context.lineTo(canvas.width/2,canvas.height);
		// context.stroke();
		
	}
		
	function gameLoop() {
		drawScreen();
	}
	
	gameLoop();

	loop = setInterval(gameLoop,50);

	//Event handler
	function keyDownListener(e){
		var key = e.keyCode;
		Debugger.log(e.keyCode);
		if (key == 187){
			number = number + 20;
		}
		// stop
		if (key == 83){
			dy = 0;
			dx = 0;
			clearInterval(loop);
		}
		//up
		if (key == 38){
			dy = -1;
			dx = 0; 
		}
		//down
		if (key == 40){
			dy = 1;
			dx = 0;
		}
		//left
		if (key == 37){
			dx = -1;
			dy = 0;
		}
		//rigth
		if (key == 39){
			dx = 1;
			dy = 0;
		}	
	}
}