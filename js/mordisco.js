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
	var speed = 1;
	var maxSpeed = 50;
	var dx = 0;
	var dy = 0;
	var loop;
	var sqrWidth = 15;
	var sqrHeight = 15;
	var sqrWidthOffset = sqrWidth/2
	var sqrHeightOffset = sqrHeight/2
	var y = (canvas.height/2) - sqrWidthOffset;
	var x = (canvas.width/2) - sqrHeightOffset;
	var xPrev = 0;
	var yPrev = 0;
	var sqrArray = [];
	var number = 1;
	var changeNumber = true;
	var numberFactor = 1;
	var numberPosition = {};
	var sqrArrayLen = 0;
	var MIN_LENGTH = 2;
	var FRAME_RATE = 20;
	var rev = false;
	var color = "#ff0";
	var collided = false;
	var score = 0;
	
	init();
	
	function init(){
		document.addEventListener("keydown",keyDownListener,false);
		loop = setInterval(drawScreen,1000 / FRAME_RATE);
		//reset variables
		x = parseInt((canvas.height/2) - sqrWidthOffset);
	    y = parseInt((canvas.width/2) - sqrHeightOffset);
		color = "#ff0";
		sqrArray = [];
		rev = false;
		speed = 1;
		numberFactor = 10 * number;
		collided = false;
		
		
		//identificamos centro del canvas
		// context.moveTo(0,canvas.height/2);
		// context.lineTo(canvas.width,canvas.height/2);
		// context.moveTo(canvas.width/2,0);
		// context.lineTo(canvas.width/2,canvas.height);
		// context.stroke();
	}
	
	function render(){
		//draw game screen
		context.fillStyle = '#00f';
		context.fillRect(0, 0, canvas.width, canvas.height);
		
		// dibujamos el cuadrado inicial en el centro de la pantalla
		context.fillStyle = color;
		context.beginPath();
		context.rect(x,y,sqrWidth,sqrHeight);
		context.closePath();
		//draws mordisco's body
		sqrArrayLen = sqrArray.length;
		for(var i = 0; i < sqrArrayLen; i++){
			context.rect(sqrArray[i][0],sqrArray[i][1],sqrWidth,sqrHeight);
		}
		context.fill();
		
		//draws number
		drawNumber(number,numberPosition);
		//draws score
		drawScore();
	}
	
	function update(){
		//calculates x and y values according user input
		xPrev = x;
		yPrev = y;
		x = parseInt(x + (speed * dx) + (dx * sqrWidth));
		y = parseInt(y + (speed * dy) + (dy * sqrHeight)); 	
		
		// check if new number is needed
		if(changeNumber){
			numberPosition = getNumberPosition();
			changeNumber = false;
		}
		
		//save actual position
		if(x != xPrev || y != yPrev ){
			sqrArray.push([x,y]);
		}
		
		sqrArrayLen = sqrArray.length;
		
		//save mordisco´s body
		if (sqrArrayLen > MIN_LENGTH){
			sqrArray = sqrArray.slice(sqrArrayLen - numberFactor + 1);
		}
		
		//check if mordisco bites a number
		if(sqrArrayLen){
			var xn = parseInt(numberPosition.x);
			var yn = parseInt(numberPosition.y);
			var mordisco = collision(x,y,x + sqrWidth,y + sqrHeight, xn , yn, (xn + sqrWidth), (yn + sqrHeight));
			if(mordisco){
				changeNumber = true;
				number++;
				score = score + 10;
				numberFactor = 10 * number;
				if(number > 9){
					numberFactor = 1;
					score = score + 100;	
					number = 1;
					speed++;
				}	
			}
		}
		
		//check if a collision to wall has occurred 
		if(wallCollision(x,y)){
			collided = true;
		}
		
		if(selfCollision(x,y,sqrArray)){
			collided = true;
		}
		
		if(collided){
			dx = dy = 0;
			sqrArray = sqrArray.slice(0,sqrArrayLen-1);
			if(rev == false){
				sqrArray.reverse();
				rev = true;
			}
			color = "#f00";

			if(sqrArrayLen < 1){
				clearInterval(loop);
				init();
			}
		}		
	}

	function drawScreen() {
		update();
		render();		
	}
	
	//Event handler
	function keyDownListener(e){
		var key = e.keyCode;
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
	
	//calculates number's position, return place coordinates
	function getNumberPosition(){
		var tempX, tempY = null;
		var sqrNumber = []; //x, y, width, height
		var positionOK = false;
		var collisionDetected = false;
		while(!positionOK){
			tempX = Math.floor(Math.random()*(canvas.width - sqrWidth));
			tempY = Math.floor(Math.random()*(canvas.height - sqrHeight));
			//check if there is a collision
			for(var i = 0, len = sqrArray.length; i < len; i++){
				collisionDetected = collision(tempX,tempY, tempX+sqrWidth, tempY+sqrHeight,sqrArray[i][0], sqrArray[i][1], sqrArray[i][0] + sqrWidth, sqrArray[i][1] + sqrHeight);			
				if(collisionDetected){
					break;
				}
			}
			positionOK = !collisionDetected;
		}
		return {x:tempX,y:tempY};
		
				
	}
	
	function drawNumber(number,position){
		context.strokeStyle=getColor();
		context.strokeRect(numberPosition.x,numberPosition.y,sqrWidth,sqrHeight);
		context.font="15px Verdana bolder";
		context.textAlign="center";
		context.textBaseline="top";		
		context.fillStyle = "#FF0";
		//context.fillText(number,numberPosition.x + sqrWidthOffset,numberPosition.y+sqrHeight);
		context.fillText(number,numberPosition.x + sqrWidthOffset,numberPosition.y);
	}
	
	function drawScore(){
		context.strokeStyle="#f0f";
		context.font="25px arcade";
		context.textBaseline="top"; 
		context.textAlign="start";
		context.fillStyle = "#FF0";
		context.fillText("SCORE "+score,10,10);
	}
	
	
	//Detect collision with walls
	function wallCollision(x,y){
		if(x > canvas.width - sqrWidth || x < 0 || y > canvas.height - sqrHeight || y < 0){
			return true;
		}
	}
	
	//Detect self collision
	function selfCollision(x,y,arr){
		var res = false;
		for(var i = 0, len = arr.length -1; i < len; i++){
			res = collision(x,y,x + sqrWidth,y + sqrHeight, arr[i][0], arr[i][1], arr[i][0] + sqrWidth, arr[i][1] + sqrHeight)
			if(res){
				break;
			}
		}
		return res;
	}
	
	//Detect collisions
	function collision(x11,y11,x12,y12,x21,y21,x22,y22){
		var res = false;
		
		   xOverlap = Math.max(0, Math.min(x12,x22) - Math.max(x11,x21))
           yOverlap = Math.max(0, Math.min(y12,y22) - Math.max(y11,y21));
			if ( xOverlap * yOverlap ){
				res = true;
			}
		return res;
	}
	
	// Returns a random number between min (inclusive) and max (exclusive)
	function getRandomNumber(min, max) {
		return Math.random() * (max - min) + min;
	}	
}