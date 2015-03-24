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
	var radiusInc = 1;
	var circle = {centerX:canvas.width/2, centerY:canvas.height/2, radius:radiusInc, angle:0}
	var ball = {x:0, y:0,speed:.08,color:getColor()};

	// Add event listener to keyword
	document.addEventListener("keydown",keyDownListener,false);
	
	
	
	function gameLoop() {
		loop = window.setTimeout(gameLoop, 20);
		drawScreen();
	}
	gameLoop();

	function drawScreen () {
		context.fillStyle = '#fff';
		context.fillRect(0, 0, canvas.width, canvas.height);
		//Box
		context.strokeStyle = '#000';
		context.strokeRect(1, 1, canvas.width-2, canvas.height-2);
		update();
		//testWalls();
		render();
	}
	
	function update() {
		circle.radius += radiusInc;
		ball.x = circle.centerX + Math.cos(circle.angle) * circle.radius;
		ball.y = circle.centerY + Math.sin(circle.angle) * circle.radius;
		circle.angle += ball.speed;
	}
	
	function render() {
		context.fillStyle = ball.color;
		context.beginPath();
		context.arc(ball.x,ball.y,5,0,Math.PI*2,true);
		context.closePath();
		context.fill();
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