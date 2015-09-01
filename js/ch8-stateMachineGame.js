window.addEventListener('load', canvasApp, false);

function canvasSupport () {
	return Modernizr.canvas;
}

function canvasApp(){

	if (!canvas || !canvas.getContext){
		return;
	}
	var context = canvas.getContext("2d");
	if (!context) {
		return;
	}

	//application states
	@const GAME_STATE_TITLE = 0;
	@const GAME_STATE_NEW_GAME = 1;
	@const GAME_STATE_NEW_LEVEL = 2;
	@const GAME_STATE_PLAYER_START = 3;
	@const GAME_STATE_PLAY_LEVEL = 4;
	@const GAME_STATE_PLAYER_DIE = 5;
	@const GAME_STATE_GAME_OVER = 6;
	var currentGameState = 0;
	var currentGameStateFunction = null;
	var loop;
	
	// Add event listener to keyword
	document.addEventListener("keydown",keyListener,false);
	document.addEventListener("keyup",keyListener,false);
	
	//** application start
	switchGameState(GAME_STATE_TITLE);

	//* application loop
	FRAME_RATE = 40;
	var intervalTime = 1000/FRAME_RATE;
	var frameRateCounter = new FrameRateCounter();
	
	gameLoop();

	function switchGameState(newState) {
		currentGameState = newState;
		switch (currentGameState){
		case GAME_STATE_TITLE:
			currentGameStateFunction = gameStateTitle;
		break;
		case GAME_STATE_PLAY_LEVEL:
			currentGameStateFunctionappStatePlayeLevel;
		break;
		case GAME_STATE_GAME_OVER:
			currentGameStateFunction = gameStateGameOver;
		break;
		}
	}

	function gameStateTitle() {
		//Debugger.log("appStateTitle");
		// draw background and text
		context.fillStyle = '#000000';
		context.fillRect(0, 0, 200, 200);
		context.fillStyle = '#ffffff';
		context.font = '20px sans-serif';
		context.textBaseline = 'top';
		context.fillText ("Title Screen", 50, 90);
	}

	function gameStatePlayLevel() {
		Debugger.log("appStateGamePlay");
	}

	function gameStateGameOver() {
		Debugger.log("appStateGameOver");
	}

	function runGame(){
		currentGameStateFunction();
	}

	
	function gameLoop() {
		runGame();
		loop = window.setTimeout(gameLoop, intervalTime);
	}
	
	function gameStatePlayLevel() {
		checkKeys();
		update();
		render();
	}
	
	function checkKeys() {
		// up arrow
		if (keyPressList[38]==true){
		//thrust
		var angleInRadians = rotation * Math.PI / 180;
		facingX = Math.cos(angleInRadians);
		facingY = Math.sin(angleInRadians);
		currentVelocity = Math.sqrt(movingX*movingX + movingY*movingY);
			//Only calculate if current velocity remains under max velocity
			//Debugger.log(currentVelocity);
			if (currentVelocity < maxVelocity) {
				movingX = movingX+thrustAcceleration*facingX;
				movingY = movingY+thrustAcceleration*facingY;
			}		
		}
		
		//left arrow
		if (keyPressList[37]==true) {
			//rotate counterclockwise
			rotation -= rotationalVelocity;
			movingX = 0;
			movingY = 0;
		}
	
		//right arrow
		if (keyPressList[39]==true) {
			//rotate clockwise
			angleInRadians = rotation * Math.PI / 180;
			rotation += rotationalVelocity;
			movingX = 0;
			movingY = 0;
		} 
	}
		
	function update() {
		x = x+movingX;
		y = y+movingY;
		frameRateCounter.countFrames();
	}
	
	function render(){
		//draw background and text
		context.fillStyle = '#000000';
		context.fillRect(0, 0, 200, 200);
		context.fillStyle = '#ffffff';
		context.font = '20px sans-serif';
		context.textBaseline = 'top';
		context.fillText ("render/update", 0, 180);
		//transformation
		var angleInRadians = rotation * Math.PI / 180;
		context.globalAlpha = alpha;
		context.save(); //save current state in stack
		context.setTransform(1,0,0,1,0,0); // reset to identity
		
		//translate the canvas origin to the center of the player
		//context.translate(x,y);
		context.translate(x+offsetX,y+offsetY);
		context.rotate(angleInRadians);
		context.strokeStyle = '#ffffff';
		context.beginPath();

		//facing right
		context.moveTo(0-offsetX,0-offsetY);
		context.lineTo(20-offsetX,10-offsetY);
		context.moveTo(20-offsetX,11-offsetY);
		context.lineTo(00-offsetX,20-offsetY);
		context.lineTo(11-offsetX,11-offsetY);
		context.moveTo(11-offsetX,9-offsetY);
		context.lineTo(0-offsetX,-offsetY);
		
		context.stroke();
		context.closePath();
		
		//restore context
		context.restore();
	
	}
	
	
	function initShip(){
		//add rotation until ship reaches 360 degrees & change alpha
		//Debugger.log("r = "+ rotation +" alpha "+alpha);
		if(rotation < 360){
			alpha = 0;
			rotation += 3;
			if(alpha < 1){
				alpha = alpha + 3/360;
			}
			else{
				alpha = 1;
			}
		}
	}	
	
	//Event handlers
	function keyListener(e){
		var key = e.keyCode;
		
		Debugger.log(key);
		if(e.type == "keydown"){
			if (key == 37 || key == 38 || key == 39){
				keyPressList[key] = true;
			}
		}	
		if(e.type == "keyup"){
			if (key == 38){
				keyPressList[key] = false;
			}
		}
		if(e.type == "keyup"){
			if (key == 37 ||key == 39){
				keyPressList[key] = false;
				
			}
		}
		
		if (key == 83){
		clearInterval(loop);
		}
		//Debugger.log(keyPressList);
	}


	//*** FrameRateCounter object prototype
	function FrameRateCounter() {
		this.lastFrameCount = 0;
		var dateTemp = new Date();
		this.frameLast = dateTemp.getTime();
		delete dateTemp;
		this.frameCtr = 0;
	}

	FrameRateCounter.prototype.countFrames=function() {
		var dateTemp = new Date();
		this.frameCtr++;
		if (dateTemp.getTime() >=this.frameLast+1000) {
		Debugger.log("frame event");
		this.lastFrameCount = this.frameCtr;
		this.frameLast = dateTemp.getTime();
		this.frameCtr = 0;
		}
		delete dateTemp;
	}


	
}