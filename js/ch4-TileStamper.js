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
	var mouseX;
	var mouseY;
	var	totalRows = 8; //total rows number in our canvas
	var imageData = context.createImageData(32,32); //create 32x32 pixels image 
	var tileSheet = new Image();
	var offsetTop = canvas.offsetTop;
	var offsetLeft = canvas.offsetLeft;
	//otra forma
	//var offsetTop = parseInt(canvas.style.top);
	//var offsetLeft = parseInt(canvas.style.left);
	//Debugger.log("offsetTop: "+offsetTop+" offsetLeft: "+offsetLeft);

	tileSheet.addEventListener('load', eventSheetLoaded , false);
	tileSheet.src = "./img/tanks_sheet.png";

	function eventSheetLoaded() {
		startUp();
	}

	function onMouseMove(e) {
		mouseX = e.clientX - offsetLeft;
		mouseY = e.clientY - offsetTop;
		//Debugger.log("clientX: "+e.clientX+" clientY: "+e.clientY);
		Debugger.log("mouseX: "+mouseX+" mouseY: "+mouseY);
	}
	
	function onMouseClick(e) {
		if (mouseY < 128){
		//find tile to highlight
		var col = Math.floor(mouseX / 32);
		var row = Math.floor(mouseY / 32);
		var tileId = (row*totalRows-1) + (col+row);
		highlightTile(tileId,col*32,row*32)
		}else{
		var col = Math.floor(mouseX / 32);
		var row = Math.floor(mouseY / 32);
		context.putImageData(imageData,col*32,row*32);
		}
	}
	
	function highlightTile(tileId,x,y){
		var startX = Math.floor(tileId % totalRows) *32;
		var startY = Math.floor(tileId / totalRows) *32;
		context.fillStyle = "#aaa";
		context.fillRect(0,0,256,128);
		drawTileSheet();
		ImageData = context.getImageData(x,y,32,32);
		for (j=3; j< imageData.data.length; j+=4){
			imageData.data[j]=128;
		}
		context.strokeStyle = "red";
		context.strokeRect(startX,startY,32,32)
	}
	
	function drawTileSheet(){
		context.drawImage(tileSheet, 0, 0);
	}
	
	function startUp(){
		context.fillStyle = "#aaa";
		context.fillRect(0,0,256,256);
		drawTileSheet();
	}
	
	//Event handlers
	canvas.addEventListener("mousemove", onMouseMove, false);
	canvas.addEventListener("click", onMouseClick, false);	
	
	
}