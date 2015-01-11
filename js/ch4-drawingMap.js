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
/*	var tileMap = [
		[32,31,31,31,1,31,31,31,31,32]
		, [1,1,1,1,1,1,1,1,1,1]
		, [32,1,26,1,26,1,26,1,1,32]
		, [32,26,1,1,26,1,1,26,1,32]
		, [32,1,1,1,26,26,1,26,1,32]
		, [32,1,1,26,1,1,1,26,1,32]
		, [32,1,1,1,1,1,1,26,1,32]
		, [1,1,26,1,26,1,26,1,1,1]
		, [32,1,1,1,1,1,1,1,1,32]
		, [32,31,31,31,1,31,31,31,31,32]
		];				
	var mapIndexOffset = -1; //se usa por que necesitamos usar los tiles desde 0 a 31, otra solución es restar 1 a cada elemento del array tile map
	*/
	var tileMap = [
		[31,30,30,30,0,30,30,30,30,31]
		, [0,0,0,0,0,0,0,0,0,0]
		, [31,0,25,0,25,0,25,0,0,31]
		, [31,25,0,0,25,0,0,25,0,31]
		, [31,0,0,0,25,25,0,25,0,31]
		, [31,0,0,25,0,0,0,25,0,31]
		, [31,0,0,0,0,0,0,25,0,31]
		, [0,0,25,0,25,0,25,0,0,0]
		, [31,0,0,0,0,0,0,0,0,31]
		, [31,30,30,30,0,30,30,30,30,31]
		];
		var mapIndexOffset = 0;
	var mapRows = 10;
	var mapCols = 10;
	var frameIndex = 0;
	var rotation = 90;
	var x = 0; 
	var y = 32;
	var dx = 1; 
	var dy = 0;
	
	startUp();
	
	function drawScreen() {
		context.fillStyle = "#aaaaaa";
		context.fillRect(0,0,500,500);
		for (var rowCtr=0;rowCtr<mapRows;rowCtr++) {
			for (var colCtr=0;colCtr<mapCols;colCtr++){
				//var tileId = tileMap[rowCtr][colCtr]+mapIndexOffset;
				var tileId = tileMap[rowCtr][colCtr];
				var sourceX = Math.floor(tileId % 8) *32;
				var sourceY = Math.floor(tileId / 8) *32;
				context.drawImage(tileSheet, sourceX,
				sourceY,32,32,colCtr*32,rowCtr*32,32,32);
			}
		}
		context.save();
		context.setTransform(1,0,0,1,0,0);
		context.translate(x+16,y+16);
		var sourceX = Math.floor(animationFrames[frameIndex] % 8) *32;
		var sourceY = Math.floor(animationFrames[frameIndex] / 8) *32;
		y = y+dy;
	    x = x+dx;
		
		var angleInRadians = rotation * Math.PI / 180;
		context.rotate(angleInRadians);
		context.drawImage(tileSheet, sourceX, sourceY,32,32,-16,-16,32,32);
		context.restore();
		Debugger.log("frameIndex: "+frameIndex+" sX: "+sourceX+" sY: "+sourceY);
		frameIndex++;
		if (frameIndex == animationFrames.length) { 
			frameIndex = 0;
		}
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