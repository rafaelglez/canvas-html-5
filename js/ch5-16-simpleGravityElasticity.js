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
	var loop;
	var pointImage = new Image();
	pointImage.src = "./img/point.png";
	var speedCtrl = document.getElementById("speed");
	var speed = speedCtrl.value;
	var angle = 305;
	var radians = angle * Math.PI/ 180;
	var angleRev = 180 - angle;
	var radiansRev = angleRev * Math.PI/ 180;
	var angleBck = 360 - angle;
	var radiansBck = angleBck * Math.PI/ 180;
	var curRadians = radians;
	var radius = 15;
	var gravity = .1;
	var vx = Math.cos(curRadians) * speed;
	var vy = Math.sin(curRadians) * speed;
	var elasticity = .5;
	var p1 = {x:20,y:canvas.height-radius};
	var ball = {x:p1.x, y:p1.y, velocityx: vx, velocityy:vy, radius:radius, elasticity:elasticity};
	var points = new Array();
	
	// Add event listener to keyword
	document.addEventListener("keydown",keyDownListener,false);
	speedCtrl.addEventListener("change",speedCtrlSet,false);
	
	gameLoop();
	
	function gameLoop() {
		loop = window.setTimeout(gameLoop, 20);
		drawScreen();
	}
	
	function drawScreen () {	
		update();
		render();
	}
	
	function update(){	
		ball.velocityy += gravity;
		if (ball.y + ball.radius < canvas.height) {
			ball.velocityy += gravity * ball.elasticity;
		}
		if (ball.y > canvas.height - ball.radius) {
			curRadians = radians;
			ball.velocityy = Math.sin(curRadians) * speed;
			ball.velocityy += gravity * ball.elasticity;
		}
		if (ball.y < 0 + ball.radius) {
			curRadians = radiansBck;
			ball.velocityx = Math.cos(curRadians) * speed;
			ball.velocityy = Math.sin(curRadians) * speed;
			ball.velocityy += gravity * ball.elasticity;
		}		
		if (ball.x > canvas.width - ball.radius) {
			curRadians = radiansRev;
			ball.velocityx = Math.cos(curRadians) * speed;
			ball.velocityy = Math.sin(curRadians) * speed;
			ball.velocityy += gravity * ball.elasticity;
		}		
		if (ball.x < 0 + ball.radius) {
			curRadians = radians;
			ball.velocityx = Math.cos(curRadians) * speed;
			ball.velocityy = Math.sin(curRadians) * speed;
			ball.velocityy += gravity * ball.elasticity;
		}
		ball.y += ball.velocityy;
		ball.x += ball.velocityx;
		points.push({x:ball.x,y:ball.y});
	
	
	}
	
	function render() {
		context.fillStyle = '#eee';
		context.fillRect(0, 0, canvas.width, canvas.height);
		//Box
		context.strokeStyle = '#000';
		context.strokeRect(1, 1, canvas.width-2, canvas.height-2);
		//draw the points
		context.fillStyle = "#000000";
		context.beginPath();
		context.arc(ball.x,ball.y,ball.radius,0,Math.PI*2,true);
		context.closePath();
		context.fill();
		for (var i = 0; i< points.length; i++) {
			context.drawImage(pointImage, points[i].x, points[i].y,1,1);
		}
	}
		
	
//Event handlers
	function keyDownListener(e){
		var key = e.keyCode;
		Debugger.log(e.keyCode);
		if (key == 83){
		clearInterval(loop);
		}
	}
	
	function speedCtrlSet(){
		speed = speedCtrl.value;
		ball.velocityx = Math.cos(curRadians) * speed;
		ball.velocityy = Math.sin(curRadians) * speed;
	}
	
	
}

	