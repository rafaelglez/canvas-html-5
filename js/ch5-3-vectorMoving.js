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
	var speedCtrl = document.getElementById("speed");
	var speed = speedCtrl.value;
	var p1 = {x:20,y:20};
	var angle = 45;
	var radians = angle * (Math.PI/180);
	var xunits = Math.cos(radians) * speed;
	var yunits = Math.sin(radians) * speed;
	var ball = {x:p1.x, y:p1.y};
	var points = new Array();
	var radio = 15;
	var loop;
	speedCtrl.addEventListener("change",speedCtrlSet,false);
	document.addEventListener("keydown",keyDownListener,false);
	function drawScreen() {
		//Debugger.log("speed: " + speed + " dx: " + dx + " dy: " + dy);
		context.fillStyle = '#EEE';
		context.fillRect(0, 0, canvas.width, canvas.height);
		//Box
		context.strokeStyle = '#000';
		context.strokeRect(1, 1, canvas.width-2, canvas.height-2);
		// Create ball
		ball.x += xunits;
		ball.y += yunits;
		Debugger.log("xunits : "+xunits+" yunits: "+yunits);
		
		//Draw points to illustrate path
		points.push({x:ball.x,y:ball.y});
		for (var i = 0; i< points.length; i++) {
			context.fillStyle = getColor();
			context.beginPath();
			context.arc(points[i].x,points[i].y,2,0,Math.PI*2,true);
			context.closePath();
			context.fill();
		}
		
		context.fillStyle = getColor();
		context.beginPath();
		context.arc(ball.x,ball.y,radio,0,Math.PI*2,true);
		context.closePath();
		context.fill();
	}
	
	function gameLoop() {
		loop = window.setTimeout(gameLoop, 20);
		drawScreen()
	}
	gameLoop();

//Event handlers
	function speedCtrlSet(){
		speed = speedCtrl.value;
		xunits = Math.cos(radians) * speed;
		yunits = Math.sin(radians) * speed;
	}
	
	function keyDownListener(e){
		var key = e.keyCode;
		Debugger.log(e.keyCode);
		if (key == 83){
		clearInterval(loop);
		}
	}

}