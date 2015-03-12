//http://www.robertpenner.com/easing/
window.addEventListener('load', eventWindowLoaded, false);

var shipImage;

function eventWindowLoaded() {
	shipImage = new Image();
	shipImage.src = "./img/ship.png"
  	shipImage.addEventListener('load', eventAssetsLoaded, false);
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
	var p1 = {x:240,y:470};
	var easeValue = .03;
	var tempSpeed = .5;
	var tempAngle = 270 ;
	var tempRadians = tempAngle * Math.PI/ 180;
	var tempvelocityx = Math.cos(tempRadians) * tempSpeed;
	var tempvelocityy = Math.sin(tempRadians) * tempSpeed;
	var ship = {x:p1.x, y:p1.y, velocityx:tempvelocityx, velocityy:tempvelocityy};
	var points = Array();
	var shipOffsetX = shipImage.width/2;
	var shipOffsetY = shipImage.height/2;
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
		ship.velocityx = ship.velocityx + (ship.velocityx * easeValue);
		ship.velocityy = ship.velocityy + (ship.velocityy * easeValue)
		ship.x += ship.velocityx;
		ship.y += ship.velocityy;
		if(ship.y+shipImage.height < 0){
			clearInterval(loop);
			ship.velocityx = 0;
			ship.velocityy = 0;
		}
		points.push({x:ship.x, y:ship.y});
	}
	
	function render() {
		context.fillStyle = '#000';
		context.fillRect(0, 0, canvas.width, canvas.height);
		//Box
		context.strokeStyle = '#fff';
		context.strokeRect(1, 1, canvas.width-2, canvas.height-2);
		//draw the points
		for (var i = 0; i< points.length; i++) {
			context.beginPath();
			context.arc(points[i].x, (points[i].y + shipImage.height), 3, Math.PI, 0, false);
			  context.fillStyle = '#fff';
			  context.stroke();
		}
		context.drawImage(shipImage,ship.x - shipOffsetX, ship.y);
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