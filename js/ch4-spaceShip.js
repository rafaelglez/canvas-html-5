var tileSheet = new Image();
spaceShip.addEventListener('load', eventSheetLoaded , false);
spaceShip.src = "./img/ships.png"; //ruta relativa al archivo html que usa el objeto

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
	
	drawScreen();

	function drawScreen() {
		context.fillStyle = '#aaaaaa';
		context.fillRect(0, 0, 200, 200);
		context.fillStyle = "#aaaaaa";
		context.fillRect(0,0,500,500);
		context.drawImage(tileSheet, 32, 0,32,32,50,50,64,64);
	}
	
	function placeShip(obj, posX, posY, width, height) {
		if (width && height) {
		context.drawImage(obj, posX, posY, width, height);
		} else {
		context.drawImage(obj, posX, posY);
		}
	}

}