window.addEventListener('load', eventWindowLoaded, false);
var videoElement;
var videoDiv;

function eventWindowLoaded() {
	videoElement = document.createElement("video");
	videoDiv = document.createElement('div');
	document.body.appendChild(videoDiv);
	videoDiv.appendChild(videoElement);
	videoDiv.setAttribute("style", "display:none;");
	var videoType = supportedVideoFormat(videoElement);
	if (videoType == "") {
		alert("no video support");
	return;
	}
	videoElement.addEventListener("canplaythrough",videoLoaded,false);
	videoElement.setAttribute("src", "mundoMaya." + videoType);
}

function supportedVideoFormat(video) {
	var returnExtension = "";
	if (video.canPlayType("video/webm") == "probably" || video.canPlayType("video/webm") == "maybe") {
		returnExtension = "webm";
	} else if(video.canPlayType("video/mp4") == "probably" || video.canPlayType("video/mp4") == "maybe") {
		returnExtension = "mp4";
	} else if(video.canPlayType("video/ogg") =="probably" ||	video.canPlayType("video/ogg") == "maybe") {
		returnExtension = "ogg";
	}
	return returnExtension;
}

function videoLoaded() {
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
	var loop;
	var cols = rows = 4;
	var board = new Array();
	// Add event listener to keyword
	document.addEventListener("keydown",keyDownListener,false);
	
	gameLoop();
	
	function gameLoop() {
		loop = window.setTimeout(gameLoop, 20);
		drawScreen();
	}
	
	function drawScreen () {	
		update();
		render();
	}
	
	function update(){
		for (var c = 0; c < cols; c++) {
			for (var r = 0; r < rows; r++) {
				var tempPiece = board[c][r];
				var imageX = tempPiece.finalCol*partWidth;
				var imageY = tempPiece.finalRow*partHeight;
				var placeX = c*partWidth+c*xPad+startXOffset;
				var placeY = r*partHeight+r*yPad+startYOffset;
				context.drawImage(videoElement, imageX, imageY, partWidth, partHeight,	placeX, placeY, partWidth, partHeight);
				if (tempPiece.selected) {
					context.strokeStyle = '#FFFF00';
					context.strokeRect( placeX, placeY, partWidth, partHeight);
				}
			}
		}
	}
	
	function render() {
		//Background
		context.fillStyle = '#303030';
		context.fillRect(0, 0, canvas.width, canvas.height);
		//Box
		context.strokeStyle = '#FFFFFF';
		context.strokeRect(5, 5, canvas.width-10, canvas.height-10);
	}
	
	function randomizeBoard(board) {
		var newBoard = new Array();
		var cols = board.length;
		var rows = board[0].length
		for (var i = 0; i < cols; i++) {
			newBoard[i] = new Array();
			for (var j =0; j < rows; j++) {
				var found = false;
				var rndCol = 0;
				var rndRow = 0;
				while (!found) {
					var rndCol = Math.floor(Math.random() * cols);
					var rndRow = Math.floor(Math.random() * rows);
					if (board[rndCol][rndRow] != false) {
						found = true;
					}
				}
			newBoard[i][j] = board[rndCol][rndRow];
			board[rndCol][rndRow] = false;
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