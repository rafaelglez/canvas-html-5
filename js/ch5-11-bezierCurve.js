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
	var p0 = {x:60, y:10};
	var p1 = {x:70, y:200};
	var p2 = {x:125, y:295};
	var p3 = {x:350, y:350};
	var ball = {x:0, y:0, speed:.01, t:0};
	var tx, ty;
	var bcPoints = Array();
	bcPoints.push({x:60, y:10});
	// Add event listener to keyword
	document.addEventListener("keydown",keyDownListener,false);
	
	function gameLoop() {
		loop = window.setTimeout(gameLoop, 20);
		drawScreen();
	}
	gameLoop();

	function drawScreen () {	
		if (bcPoints.length <= 101){
		update();
		}
		render();
	}
	
	function update() {
		var	t = ball.t;
		var cx = 3 * (p1.x - p0.x)
		var bx = 3 * (p2.x - p1.x) - cx;
		var ax = p3.x - p0.x - cx - bx;
		var cy = 3 * (p1.y - p0.y);
		var by = 3 * (p2.y - p1.y) - cy;
		var ay = p3.y - p0.y - cy - by;
		xt = Math.floor(ax*(t*t*t) + bx*(t*t) + cx*t + p0.x);
		yt = Math.floor(ay*(t*t*t) + by*(t*t) + cy*t + p0.y)
			ball.t += ball.speed;
		if (ball.t > 1) {
			ball.t = 1;
		}
		if (bcPoints.length <= 101)
			bcPoints.push({x:xt, y:yt});
		Debugger.log("t: " + ball.t);
	}
	
	function render() {
		context.fillStyle = '#fff';
		context.fillRect(0, 0, canvas.width, canvas.height);
		//Box
		context.strokeStyle = '#000';
		context.strokeRect(1, 1, canvas.width-2, canvas.height-2);
		//draw the points
		context.font ="10px sans";
		context.fillStyle = "#FF0000";
		context.beginPath();
		context.arc(p0.x,p0.y,8,0,Math.PI*2,true);
		context.closePath();
		context.fill();
		context.fillStyle = "#FFFFFF";
		context.fillText("0",p0.x-2,p0.y+2);
		context.fillStyle = "#FF0000";
		context.beginPath();
		context.arc(p1.x,p1.y,8,0,Math.PI*2,true);
		context.closePath();
		context.fill();
		context.fillStyle = "#FFFFFF";
		context.fillText("1",p1.x-2,p1.y+2);
		context.fillStyle = "#FF0000";
		context.beginPath();
		context.arc(p2.x,p2.y,8,0,Math.PI*2,true);
		context.closePath();
		context.fill();
		context.fillStyle = "#FFFFFF";
		context.fillText("2",p2.x-2, p2.y+2);
		context.fillStyle = "#FF0000";
		context.beginPath();
		context.arc(p3.x,p3.y,8,0,Math.PI*2,true);
		context.closePath();
		context.fill();
		context.fillStyle = "#FFFFFF";
		context.fillText("3",p3.x-2, p3.y+2);
		//Draw circle moving
		if(ball.t < 1){
			context.fillStyle = "#000000";
			context.beginPath();
			context.arc(xt,yt,5,0,Math.PI*2,true);
			context.closePath();
			context.fill();
		}
		else{
			context.fillStyle = "#000000";
			context.beginPath();
			context.arc(xt,yt,5,0,Math.PI*2,true);
			context.closePath();
			context.fill();
		}
	}
		
	
//Event handlers
	function keyDownListener(e){
		var key = e.keyCode;
		Debugger.log(e.keyCode);
		if (key == 83){
		clearInterval(loop);
		Debugger.log(bcPoints);
		}
	}
}