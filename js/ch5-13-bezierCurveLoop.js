//http://www.chiark.greenend.org.uk/~sgtatham/puzzles/
window.addEventListener('load', eventWindowLoaded, false);

var bullseye = new Image();
function eventWindowLoaded() {
	bullseye.src = "./img/bullseye.png"
  	bullseye.addEventListener('load', eventAssetsLoaded, false);
}


function eventAssetsLoaded() {
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
	var p0 = {x:150, y:440};
	var p1 = {x:450, y:10};
	var p2 = {x:50, y:10};
	var p3 = {x:325, y:450};
		var spd =  0.005
	var npoints = Math.floor(1/spd);   //speed = 1/npoints
	var player = {x:0, y:0, speed:1/npoints, t:0};
	var points = new Array();
	var tx, ty;
	
	// Add event listener to keyword
	document.addEventListener("keydown",keyDownListener,false);
	
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
		var t = player.t;
		var cx = 3 * (p1.x - p0.x)
		var bx = 3 * (p2.x - p1.x) - cx;
		var ax = p3.x - p0.x - cx - bx;
		var cy = 3 * (p1.y - p0.y);
		var by = 3 * (p2.y - p1.y) - cy;
		var ay = p3.y - p0.y - cy - by;
		var xt = ax*(t*t*t) + bx*(t*t) + cx*t + p0.x;
		var yt = ay*(t*t*t) + by*(t*t) + cy*t + p0.y;
		player.t += player.speed;
		if (player.t > 1) {
		player.t = 1;
		}
		points.push({x:xt,y:yt});
		player.x = xt-bullseye.width/2;
		player.y = yt-bullseye.height/2;
	//Debugger.log("bcPoints: "+ "["+i+"]"+ bcPoints[i].x +" "+bcPoints[i].y);
	
	}
	
	function render() {
		context.fillStyle = '#eee';
		context.fillRect(0, 0, canvas.width, canvas.height);
		//Box
		context.strokeStyle = '#000';
		context.strokeRect(1, 1, canvas.width-2, canvas.height-2);
		//draw the points
		context.font = "10px sans";
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
		for (var i = 0; i< points.length; i++) {
			context.drawImage(pointImage, points[i].x, points[i].y,1,1);
		}
		context.closePath();
		context.drawImage(bullseye,player.x,player.y);
		
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