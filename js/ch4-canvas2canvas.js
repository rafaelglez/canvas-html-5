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
	}
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");
	var canvas2 = document.getElementById("canvas2");
	var context2 = canvas2.getContext("2d");
	
	var tileSheet = new Image();
	tileSheet.addEventListener('load', eventSheetLoaded , false);
	tileSheet.src="img/tanks_sheet.png";
	//Debugger.log(tileSheet.src);
	function eventSheetLoaded() {
	startUp();
	}
	
	function startUp(){
		context.drawImage(tileSheet, 0, 0);
		context2.drawImage(canvas,32,0,32,32,0,0,32,32);
		
	}
}