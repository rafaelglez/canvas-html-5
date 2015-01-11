var counter = 0;
var tileSheet = new Image();
tileSheet.addEventListener('load', eventSheetLoaded , false);
tileSheet.src = "./img/ships.png";

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
	startUp();
	

	function drawScreen() {
		context.fillStyle = "#aaaaaa";
		context.fillRect(0,0,500,500);
		
		
		// Versión para rockies
		// counter++;
		// if (counter >1) {
			// counter = 0;
			
		// }
		
		counter ^= 1;  // XOR versión corta
		context.drawImage(tileSheet,32*counter,0,32,32,50,50,64,64);
		
	}
	
	function startUp(){
		gameLoop();
	}
	
	function gameLoop() {
		window.setTimeout(gameLoop, 100);
		drawScreen();
	}
}