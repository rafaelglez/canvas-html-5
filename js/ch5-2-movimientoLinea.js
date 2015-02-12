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
	var p1 = {x:20,y:250};
	var p2 = {x:480,y:250};
	var dx = p2.x - p1.x;
	var dy = p2.y - p1.y;
	var distance = Math.sqrt(dx*dx + dy*dy);
	var moves = distance/speed;
	var xunits = (p2.x - p1.x)/moves;
	var yunits = (p2.y - p1.y)/moves;
	var ball = {x:p1.x, y:p1.y};
	var points = new Array();
	var radio = 15;
	var loop;
	var pointImage = new Image();
	pointImage.src = "./img/star.png";
	// var dxCtrl = document.getElementById("dx");
	// var dyCtrl = document.getElementById("dy");
	// var dx = dxCtrl.value;
	// var dy = dyCtrl.value;
	
	speedCtrl.addEventListener("change",speedCtrlSet,false);
	// dxCtrl.addEventListener("change",dxCtrlSet,false);
	// dyCtrl.addEventListener("change",dyCtrlSet,false);

	function drawScreen() {
		Debugger.log("speed: " + speed + " dx: " + dx + " dy: " + dy);
		context.fillStyle = '#EEE';
		context.fillRect(0, 0, canvas.width, canvas.height);
		//Box
		context.strokeStyle = '#000';
		context.strokeRect(1, 1, canvas.width-2, canvas.height-2);
		// Create ball
		if (moves > 0 ) {
			moves--;
			ball.x += xunits;
			ball.y += yunits;
			Debugger.log(moves);
		}else{
			window.clearTimeout(loop);
		}
		
		//Draw points to illustrate path
		points.push({x:ball.x,y:ball.y});
		for (var i = 0; i< points.length; i++) {
			context.fillStyle = "#000";
			context.beginPath();
			context.arc(points[i].x,points[i].y,1,0,Math.PI*2,true);
			context.closePath();
			context.fill();
		}
		
		context.fillStyle = "#ccc";
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
}

// function dxCtrlSet(){
	// dx = dxCtrl.value;
// }

// function dyCtrlSet(){
	// dy = dyCtrl.value;
// }

}