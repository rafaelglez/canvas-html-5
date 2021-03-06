window.addEventListener("load", eventWindowLoaded, false);

function eventWindowLoaded () {
	canvasApp();
}

function canvasSupport () {
	return Modernizr.canvas;
}

function canvasApp () {
	if (!canvasSupport()) {
	return;
	}
	
	
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");
	var alpha = 0;
	var fadeIn = true;
	var helloWorldImage = new Image();
	var text = "Hello Animation";
	Debugger.log("Drawing Canvas");
	
	function drawScreen() {
	//background
	context.globalAlpha = 1;
	context.fillStyle = "#000000";
	context.fillRect(0, 0, 640, 480);
	//image
	context.globalAlpha = .25;
	helloWorldImage.src = "./img/html5bg.jpg";
	if (fadeIn) {
		alpha += .01;
		if (alpha >= 1) {
			alpha = 1;
			fadeIn = false;
		}
	} else {
		alpha -= .01;
		if (alpha < 0) {
			alpha = 0;
			fadeIn = true;
		}
	}
	context.globalAlpha = alpha;
	//Debugger.log(alpha);
	context.font = "72px Sans-Serif";
	context.textBaseline = "top";
	context.fillStyle = "#FFFFFF";
	context.fillText (text, 50,200);
	context.globalAlpha = Math.abs(1-alpha);
	context.drawImage(helloWorldImage, 0, 0);
}

	
	
function gameLoop() {
	window.setTimeout(gameLoop, 20);
	drawScreen();
	}
	
	gameLoop();
	
}



