var counter = 0;
var tileSheet = new Image();
tileSheet.addEventListener('load', eventSheetLoaded , false);
tileSheet.src = "./img/tanks_sheet.png";

function eventSheetLoaded() {
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
	var animationFrames = [1,2,3,4,5,6,7,8];
	var frameIndex = 0;
	var x = 50; 
	var y = 300;
	var dx = 0; 
	var dy = -1;
	
	startUp();
	
	function drawScreen() {
		context.fillStyle = "#aaaaaa";
		context.fillRect(0,0,500,500);
		var sourceX = Math.floor(animationFrames[frameIndex] % 8) *32;
		var sourceY = Math.floor(animationFrames[frameIndex] / 8) *32;
		y = y+dy;
	    x = x+dx;
		context.drawImage(tileSheet, sourceX, sourceY,32,32,x,y,64,64);
		Debugger.log("frameIndex: "+frameIndex+" sX: "+sourceX+" sY: "+sourceY);
		frameIndex++;
		if (frameIndex == animationFrames.length) { 
			frameIndex = 0;
		}
		//context.drawImage(tileSheet, sourceX, sourceY+32,32,32,50,150,64,64);
		//Debugger.log("tile: "+tileSheet+" sX: "+sourceX+" sY: "+sourceY);
	}
	
	function startUp(){
		gameLoop();
	}
	
	function gameLoop() {
		window.setTimeout(gameLoop, 100);
		drawScreen();
	}
}