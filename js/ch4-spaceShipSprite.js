var spaceShip = new Image();
spaceShip.addEventListener('load', eventSheetLoaded , false);
spaceShip.src = "./img/ship1.png"; //ruta relativa al archivo html que usa el objeto

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
		// placeShip(spaceShip, 0, 0);
		// placeShip(spaceShip, 50, 50);
		// placeShip(spaceShip, 50, 150,64,46);
		context.drawImage(spaceShip, 0, 0);
		context.drawImage(spaceShip, 0, 34,32,32);
		context.drawImage(spaceShip, 0, 68,64,64);
		context.drawImage(spaceShip, 0, 140,16,16);
	}
	
	function placeShip(obj, posX, posY, width, height) {
		if (width && height) {
		context.drawImage(obj, posX, posY, width, height);
		} else {
		context.drawImage(obj, posX, posY);
		}
	}

}