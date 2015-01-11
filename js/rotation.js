window.addEventListener('load', eventWindowLoaded, false);
function eventWindowLoaded() {
	canvasApp();
}

function canvasSupport () {
	return Modernizr.canvas;
}


function canvasApp(){

	if (!canvasSupport()) {
		return;
		}else{
			var canvas = document.getElementById("canvas");
			var context = canvas.getContext("2d");
		}

	drawScreen();

	function drawScreen() {
		var angleInRadians = 35 * Math.PI / 180;
		context.strokeRect(0,0,canvas.width,canvas.height);
		for(var i = 100; i<canvas.width; i+=100){
			context.strokeRect(0,i,5,2);
		}
		for(var i = 100; i<canvas.height; i+=100){
			context.strokeRect(i,0,3,5);
		}
		context.fillStyle = "black";
		context.fillRect(100,100,50,50);
		context.setTransform(1,0,0,1,0,0);
		context.globalAlpha = .5;
		context.rotate(angleInRadians);
		context.fillStyle = "red";
		context.fillRect(100,100,50,50);
		
	}

}