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
	videoElement.setAttribute("src", "./video/muirbeach." + videoType);
	videoElement.setAttribute("width", 320);
	videoElement.setAttribute("height", 240);
}

function supportedVideoFormat(video){
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

function canvasSupport() {
	return Modernizr.canvas;
}

function canvasApp(){
	if (!canvasSupport()) {
		return;
	}
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");
	var loop;
	var cols = 4;
	var rows = 4;
	var board = new Array();
	var boardids = new Array();
	var idgen = new IDGenerator();
	var xPad = 10;
	var yPad = 10;
	var startXOffset = 10;
	var startYOffset = 10;
	var partWidth = videoElement.width / cols;
	var partHeight = videoElement.height / rows;
	var complete = false;
	
	
	//Initialize Board
	for (var i = 0; i < cols; i++) {
		board[i] = new Array();
		boardids[i] = new Array();
		for (var j =0; j < rows; j++) {
		boardids[i][j] = idgen.generate();
		board[i][j] = {
			finalCol:i,
			finalRow:j,
			selected:false,
			imageX:null, 
			imageY:null, 
			placeX:null, 
			placeY:null,
			id:boardids[i][j] 
			};
		}
	}
	//Debugger.log(board);
	//Debugger.log(boardids);
	//return false;
	board = randomizeBoard(board);	
	
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
		return newBoard;
	}
	
	// Add event listener to mouse
	document.addEventListener("mouseup",eventMouseUp, false);
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
				tempPiece.imageX = tempPiece.finalCol * partWidth;
				tempPiece.imageY = tempPiece.finalRow * partHeight;
				tempPiece.placeX = c*partWidth + c*xPad + startXOffset;
				tempPiece.placeY = r*partHeight + r*yPad + startYOffset;				
				board[c][r] = tempPiece;
				//Debugger.log(imageX+", "+imageY+", "+partWidth+", "+partHeight+", "+placeX+", "+placeY+", "+partWidth+", "+partHeight);
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
		
		for (var c = 0; c < cols; c++){
			for (var r = 0; r < rows; r++) {
				var tempPiece = board[c][r];
				context.drawImage(videoElement, tempPiece.imageX, tempPiece.imageY, partWidth, partHeight, tempPiece.placeX, tempPiece.placeY, partWidth, partHeight);
				if (tempPiece.selected) {
					context.strokeStyle = '#FFFF00';
					context.strokeRect(tempPiece.placeX, tempPiece.placeY, partWidth, partHeight);
				}
			}
		}		
	}
	
//Event handlers
function eventMouseUp(event) {
	var mouseX;
	var mouseY;
	var pieceX;
	var pieceY;
	var x;
	var y;
	var selectedList= new Array();
	
	if (event.pageX || event.pageY) {
		x = event.pageX;
		y = event.pageY;
	} 
	else {
		x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
		y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
	}
	//Debugger.log("scroll Left :"+document.body.scrollLeft +" "+ document.documentElement.scrollLeft);
	//Debugger.log("scroll Top:"+document.body.scrollTop +" "+ document.documentElement.scrollTop);
	x -= canvas.offsetLeft;
	y -= canvas.offsetTop;
	mouseX=x;
	mouseY=y;
	
	for (var c = 0; c < cols; c++) {
		for (var r = 0; r < rows; r++) {
			if(board[c][r] == boardids[c][r]){
				complete = true;
			}
			else{
				complete = false;	
			}
			pieceX = c*partWidth + c*xPad + startXOffset;
			pieceY = r*partHeight + r*yPad + startYOffset;
			if ((mouseY >= pieceY) && (mouseY <= pieceY+partHeight) && (mouseX >= pieceX) && (mouseX <= pieceX+partWidth)) {
				if ( board[c][r].selected) {
					board[c][r].selected = false;
				} else {
					board[c][r].selected = true;
				}
			}	
			if (board[c][r].selected) {
				selectedList.push({col:c,row:r})
			}
		}
	}

	if (selectedList.length == 2) {
		var selected1 = selectedList[0];
		var selected2 = selectedList[1];
		var tempPiece1 = board[selected1.col][selected1.row];
		board[selected1.col][selected1.row] = board[selected2.col][selected2.row];
		board[selected2.col][selected2.row] = tempPiece1;
		board[selected1.col][selected1.row].selected = false;
		board[selected2.col][selected2.row].selected = false;
	}
	
	if (complete == true){
		videoElement.play();
	}
}

	function keyDownListener(e){
		var key = e.keyCode;
		//Debugger.log(e.keyCode);
		if (key == 83){
		clearInterval(loop);
		videoElement.pause();
		}
	}
}