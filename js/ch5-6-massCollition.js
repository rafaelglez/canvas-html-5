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
	var numBalls = 10;
	var maxSize = 12;
	var minSize = 3;
	var maxSpeed = maxSize+minSize;
	var friction = .01;
	var balls = new Array();
	var tempBall;
	var tempX;
	var tempY;
	var tempSpeed = 4;
	var tempAngle;
	var tempRadius;
	var tempRadians;
	var tempvelocityX;
	var tempvelocityY;
	var tempColor;
	var ball;


	// Add event listener to keyword
	document.addEventListener("keydown",keyDownListener,false);
	
	for (var i = 0; i<numBalls; i++){
		var placeOK = false;
		// Create balls	
		while(!placeOK) {
			tempX = (tempRadius*3) + (Math.floor(Math.random()*canvas.width)-tempRadius*3);
			tempY = (tempRadius*3) + (Math.floor(Math.random()*canvas.height)-tempRadius*3);
			tempRadius = Math.floor(Math.random()*maxSize)+minSize;
			tempAngle = Math.floor(Math.random()*360);
			tempRadians = tempAngle * (Math.PI/180);
			tempvelocityX = Math.cos(tempRadians) * tempSpeed;
			tempvelocityY = Math.sin(tempRadians) * tempSpeed;
			tempColor = getColor();
			tempBall = {x:tempX,y:tempY,nextX:tempX,nextY:tempY,radius:tempRadius,speed:tempSpeed,angle:tempAngle,velocityX:tempvelocityX,velocityY:tempvelocityY,mass:tempRadius,color:tempColor};
			placeOK = canStartHere(tempBall);
		}
		balls.push(tempBall);
	}
	
	
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
		testWalls();
		collide();
		render();
	}
	
	function update() {
		for (var i = 0; i <balls.length; i++) {
			ball = balls[i];
			//Friction
			ball.velocityx = ball.velocityx - ( ball.velocityx*friction);
			ball.velocityy = ball.velocityy - ( ball.velocityy*friction);
			ball.nextX = (ball.x += ball.velocityX);
			ball.nextY = (ball.y += ball.velocityY);
		}
	}
	
	function testWalls() {
		var ball;
		var testBall;
		for (var i = 0; i <balls.length; i++) {
			ball = balls[i];
			if (ball.nextX + ball.radius > canvas.width) {
				ball.velocityX = ball.velocityX* -1;
				ball.nextX = canvas.width - ball.radius; 
			}
			else if (ball.nextX-ball.radius < 0 ) {
				ball.velocityX = ball.velocityX* -1;
				ball.nextX = ball.radius;
			} else if (ball.nextY+ball.radius > canvas.height ) {
				ball.velocityY = ball.velocityY* -1;
				ball.nextY = canvas.height - ball.radius;
			} else if(ball.nextY-ball.radius < 0) {
				ball.velocityY = ball.velocityY* -1;
				ball.nextY = ball.radius;
			}
		}
	}
	
	function render() {
		var ball;
		for (var i = 0; i <balls.length; i++) {
		ball = balls[i];
		ball.x = ball.nextX;
		ball.y = ball.nextY;
		context.fillStyle = ball.color;
		context.beginPath();
		context.arc(ball.x,ball.y,ball.radius,0,Math.PI*2,true);
		context.closePath();
		context.fill();
		}
	}
	
	function collide() {
		var ball;
		var testBall;
		for (var i = 0; i < balls.length; i++) {
			ball = balls[i];
			for (var j = i+1; j < balls.length; j++) {
				testBall = balls[j];
				if (hitTestCircle(ball,testBall)) {
				collideBalls(ball,testBall);
				}
			}
		}
	}
	
	function hitTestCircle(ball1,ball2) {
		var retval = false;
		var dx = ball1.nextX - ball2.nextX;
		var dy = ball1.nextY - ball2.nextY;
		var distance = (dx * dx + dy * dy);
		if (distance <= (ball1.radius + ball2.radius) * (ball1.radius + ball2.radius) ) {
			retval = true;
		}
		return retval;
	}
	
	function collideBalls(ball1,ball2) {
		var dx = ball1.nextX - ball2.nextX;
		var dy = ball1.nextY - ball2.nextY;
		var collisionAngle = Math.atan2(dy, dx);
		var speed1 = Math.sqrt(ball1.velocityX * ball1.velocityX + ball1.velocityY * ball1.velocityY);
		var speed2 = Math.sqrt(ball2.velocityX * ball2.velocityX + ball2.velocityY * ball2.velocityY);
		var direction1 = Math.atan2(ball1.velocityY, ball1.velocityX);
		var direction2 = Math.atan2(ball2.velocityY, ball2.velocityX);
		var velocityX_1 = speed1 * Math.cos(direction1 - collisionAngle);
		var velocityY_1 = speed1 * Math.sin(direction1 - collisionAngle);
		var velocityX_2 = speed2 * Math.cos(direction2 - collisionAngle);
		var velocityY_2 = speed2 * Math.sin(direction2 - collisionAngle);
		var final_velocityX_1 = ((ball1.mass - ball2.mass) * velocityX_1 + (ball2.mass + ball2.mass) * velocityX_2) / (ball1.mass + ball2.mass);
		var final_velocityX_2 = ((ball1.mass + ball1.mass) * velocityX_1 + (ball2.mass - ball1.mass) * velocityX_2) / (ball1.mass + ball2.mass);
		var final_velocityY_1 = velocityY_1;
		var final_velocityY_2 = velocityY_2;
		ball1.velocityX = Math.cos(collisionAngle) * final_velocityX_1 + Math.cos(collisionAngle + Math.PI/2) * final_velocityY_1;
		ball1.velocityY = Math.sin(collisionAngle) * final_velocityX_1 + Math.sin(collisionAngle + Math.PI/2) * final_velocityY_1;
		ball2.velocityX = Math.cos(collisionAngle) * final_velocityX_2 + Math.cos(collisionAngle + Math.PI/2) * final_velocityY_2;
		ball2.velocityY = Math.sin(collisionAngle) * final_velocityX_2 + Math.sin(collisionAngle + Math.PI/2) * final_velocityY_2;
		ball1.nextX = (ball1.nextX += ball1.velocityX);
		ball1.nextY = (ball1.nextY += ball1.velocityY);
		ball2.nextX = (ball2.nextX += ball2.velocityX);
		ball2.nextY = (ball2.nextY += ball2.velocityY);
	}
		
	function canStartHere(ball) {
		var retval = true;
			for (var i = 0; i <balls.length; i++) {
				if (hitTestCircle(ball, balls[i])) {
					retval = false;
				}
			}
		return retval;
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