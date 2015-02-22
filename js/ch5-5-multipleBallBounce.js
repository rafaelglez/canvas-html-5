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
	var numBalls = 20;
	var maxSize = 10;
	var minSize = 5;
	var maxSpeed = maxSize+minSize;
	var balls = new Array();
	var tempBall;
	var tempX;
	var tempY;
	var tempSpeed;
	var tempAngle;
	var tempRadius;
	var tempRadians;
	var tempXunits;
	var tempYunits;
	var tempColor;
	var ball;

// Create balls	
		for (var i = 0; i < numBalls; i++) {
			tempRadius = Math.floor(Math.random()*maxSize)+minSize;
			tempX = (tempRadius*2) + (Math.floor(Math.random()*canvas.width)-tempRadius*2);
			tempY = (tempRadius*2) + (Math.floor(Math.random()*canvas.height)-tempRadius*2);
			//sprinkle balls from center
			//tempX = canvas.width/2;
//			tempY = canvas.height/2;	
			tempSpeed = maxSpeed-tempRadius;
			tempAngle = Math.floor(Math.random()*360);
			tempRadians = tempAngle * (Math.PI/180);
			tempXunits = Math.cos(tempRadians) * tempSpeed;
			tempYunits = Math.sin(tempRadians) * tempSpeed;
			tempColor = getColor();
			tempBall = {x:tempX,y:tempY,radius:tempRadius, speed:tempSpeed, angle:tempAngle,
			xunits:tempXunits, yunits:tempYunits, color:tempColor}
			balls.push(tempBall);
		}

	document.addEventListener("keydown",keyDownListener,false);
	
	function drawScreen() {
		context.fillStyle = '#EEE';
		context.fillRect(0, 0, canvas.width, canvas.height);
		//Box
		context.strokeStyle = '#000';
		context.strokeRect(1, 1, canvas.width-2, canvas.height-2);
		//Place balls
		for (var i = 0; i <balls.length; i++) {
			ball = balls[i];
			ball.x += ball.xunits;
			ball.y += ball.yunits;
			context.fillStyle = ball.color;
			context.beginPath();
			context.arc(ball.x,ball.y,ball.radius,0,Math.PI*2,true);
			context.closePath();
			context.fill();
			if (ball.x > canvas.width - ball.radius || ball.x < 0 + ball.radius ) {
				ball.angle = 180 - ball.angle;
				updateBall(ball);
			} else if (ball.y > canvas.height - ball.radius || ball.y < 0 + ball.radius ) {
				ball.angle = 360 - ball.angle;
				updateBall(ball);
			}
		}
	}
	
	function gameLoop() {
		loop = window.setTimeout(gameLoop, 20);
		drawScreen()
	}
	gameLoop();

	function updateBall(ball) {
		ball.radians = ball.angle * (Math.PI/180);
		ball.xunits = Math.cos(ball.radians) * ball.speed;
		ball.yunits = Math.sin(ball.radians) * ball.speed;
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