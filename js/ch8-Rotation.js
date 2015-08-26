window.addEventListener('load', canvasApp, false);

function canvasSupport () {
	return Modernizr.canvas;
}

function canvasApp(){

	var canvas = document.getElementById("canvas");
	var FRAME_RATE = 30;
	var intervalTime = 1000/FRAME_RATE;
	var loop;
	var shipState = 0; //canvasApp level variables //0 = static, 1 = thrust
	var rotation = 0;
	var x = 50;
	var y = 50;
	var width = 20;
	var height = 20;
	var offsetX = width / 2 ;
	var offsetY = height / 2 ;
	var alpha = 0.2;
	
	//Debugger.log(canvas);
	// Add event listener to keyword
	document.addEventListener("keydown",keyDownListener,false);

	if (!canvas || !canvas.getContext){
		return;
	}
	var context = canvas.getContext("2d");
	if (!context) {
	return;
	}
	
	gameLoop();
	
	function gameLoop() {
		loop = window.setTimeout(gameLoop, intervalTime);
		drawScreen();
	}
	
	function drawScreen() {
		// draw background and text
		context.globalAlpha = 1;
		context.fillStyle = '#000000';
		context.fillRect(0, 0, 200, 200);
		context.fillStyle = '#ffffff';
		context.font = '20px sans-serif';
		context.textBaseline = 'top';
		context.fillText ("Player Ship - rotate", 0, 180);
		//transformation
		var angleInRadians = rotation * Math.PI / 180;
		context.globalAlpha = alpha;
		context.save(); //save current state in stack
		context.setTransform(1,0,0,1,0,0); // reset to identity
		
		
		//translate the canvas origin to the center of the player
		//context.translate(x,y);
		context.translate(x+offsetX,y+offsetY);
		context.rotate(angleInRadians);
		
		//drawShip
		/* context.strokeStyle = '#ffffff';
		context.beginPath();
		context.moveTo(10,0);
		context.lineTo(19,19);
		context.lineTo(10,9);
		context.moveTo(9,9);
		context.lineTo(0,19);
		context.lineTo(9,0); 
		*/
		
		//using the width and height to calculate
		context.strokeStyle = '#ffffff';
		context.beginPath();
		context.moveTo(10-offsetX,0-offsetY);
		context.lineTo(19-offsetX,19-offsetY);
		context.lineTo(10-offsetX,9-offsetY);
		context.moveTo(9-offsetX,9-offsetY);
		context.lineTo(0-offsetX,19-offsetY);
		context.lineTo(9-offsetX,0-offsetY);
		
		
		//draw thrust
		/* context.moveTo(8,13);
		context.lineTo(11,13);
		context.moveTo(9,14);
		context.lineTo(9,18);
		context.moveTo(10,14);
		context.lineT	o(10,18); */
		
		context.stroke();
		context.closePath();
		
		//restore context
		context.restore(); //pop old state on to screen
		//add rotation until ship reaches 360 degrees
		Debugger.log("r = "+ rotation +" alpha "+alpha);
		if(rotation < 360){
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
	function keyDownListener(e){
		var key = e.keyCode;
		Debugger.log(e.keyCode);
		if (key == 83){
		clearInterval(loop);
		}
	}

	
}