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
	videoElement.addEventListener("canplay",videoLoaded,false);
	videoElement.setAttribute("src", "http://quiet.pcriot.com/video/bailar" + "." + videoType);
	videoElement.setAttribute("width", 640);
	videoElement.setAttribute("height", 360);
	
		//Debugger.log(videoElement.buffered);
	
}

function isFirefox(){
    var str = navigator.userAgent;
    var patt = new RegExp("Firefox");
    var res = patt.test(str);
	return res;
}


function supportedVideoFormat(video){
	var returnExtension = "";
	//if(isFirefox() && (video.canPlayType("video/ogg") =="probably" || video.canPlayType("video/ogg") == "maybe")) {
	if(video.canPlayType("video/ogg") =="probably" || video.canPlayType("video/ogg") == "maybe") {
		returnExtension = "ogv";
	}
	 else if(video.canPlayType("video/mp4") == "probably" || video.canPlayType("video/mp4") == "maybe") {
		returnExtension = "mp4";
	} else if (video.canPlayType("video/webm") == "probably" || video.canPlayType("video/webm") == "maybe") {
		returnExtension = "webm";
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
	else{
	
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");
	var difficultyCtrl = document.getElementById("difficulty");
	var cols = rows = difficultyCtrl.value;
	var videoCtrl = document.getElementById("imagecontainer");
	var loop;
	var board = new Array();
	var boardids = new Array();
	var completeAr = new Array();
	var idgen = new IDGenerator();
	var startXOffset = 10;
	var startYOffset = 10;
	var partWidth = videoElement.width / cols;
	var partHeight = videoElement.height / rows;
	var divCols = cols - 1;
	var divRows = rows - 1;
	var xPad = (canvas.width - ((partWidth * cols) + (2*startXOffset))) / divCols;
	var yPad = (canvas.height - ((partHeight * cols) + (2*startYOffset))) / divRows;
	var animationFrame = new AnimationFrame();
	var complete = false;
	var fPosXOffset = (divCols * xPad)/2;
	var fPosYOffset = (divRows * yPad)/2;
	var curPosXOffset = 0;
	var curPosYOffset = 0;
	
	init();
	}
	//return false;
	
	
	//Initialize Board
	function init(){
		complete = false;
		 //Debugger.log("Dura "+videoElement.duration);
		// Debugger.log(" Fin "+videoElement.buffered.end(0));
		// Debugger.log(" Inicio "+videoElement.buffered.start(0));
		board = new Array();
		boardids = new Array();
		completeAr = new Array();
		partWidth = videoElement.width / cols;
		partHeight = videoElement.height / rows;
		divCols = cols - 1;
		divRows = rows - 1;
		xPad = (canvas.width - ((partWidth * cols) + (2*startXOffset))) / divCols;
		yPad = (canvas.height - ((partHeight * cols) + (2*startYOffset))) / divRows;
		fPosXOffset = (divCols * xPad)/2;
		fPosYOffset = (divRows * yPad)/2;
		curPosXOffset = 0;
		curPosYOffset = 0;
	
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
			completeAr.push(false);
			}
		}
		
		board = randomizeBoard(board);	
		// Add event listener to mouse
		canvas.addEventListener("mouseup",eventMouseUp, false);
		// Add event listener to keyword
		document.addEventListener("keydown",keyDownListener,false);
		// Add event listener to video Element
		videoElement.addEventListener("ended",videoEnded,false);
		// Add event listener to slider Element
		difficultyCtrl.addEventListener("change",difficultyCtrlSet,false);
		// Add event listener to check image video selected
		videoCtrl.addEventListener("click",videoCtrlSet,false);
		
		drawScreen();
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
		return newBoard;
	}
	
	function drawScreen() {		
		loop = animationFrame.request(drawScreen);
		update();
		render();
	}
	
	function update(){
	Debugger.log("complete: "+complete);
		if (complete == false){
		var count = 0;
		for (var c = 0; c < cols; c++) {
			for (var r = 0; r < rows; r++) {
				var tempPiece = board[c][r];
				tempPiece.imageX = tempPiece.finalCol * partWidth;
				tempPiece.imageY = tempPiece.finalRow * partHeight;
				tempPiece.placeX = c*partWidth + c*xPad + startXOffset;
				tempPiece.placeY = r*partHeight + r*yPad + startYOffset;				
				board[c][r] = tempPiece;
				
				if(tempPiece.id == boardids[c][r]){
					completeAr[count++] = true;
				}
				else{
					completeAr[count++] = false;	
				}
			}
		}
		complete = completeAr.reduce(function(previous, current) {
			return previous && current;
		});
		
		}
		
		//Debugger.log("complete reduce "+complete);
		if (complete == false && !videoElement.paused){
			videoElement.pause();
		}
		else if(complete == true && videoElement.paused){ //Just play and cancel event mouseUp lister
			canvas.removeEventListener("mouseup",eventMouseUp, false);
			videoElement.play();
		}
		else if(complete == true && !videoElement.paused){ //puzzle complete 
			if(curPosXOffset < fPosXOffset){
				curPosXOffset = curPosXOffset + 0.1;
			}
			if(curPosYOffset < fPosYOffset){
				curPosYOffset = curPosYOffset + 0.1;
			}
			//Debugger.log("fPosXOffset "+fPosXOffset);
			//Debugger.log("curPosXOffset "+curPosXOffset);
				for (var c = 0; c < cols; c++) {
					for (var r = 0; r < rows; r++) {
						var tempPiece = board[c][r];
						tempPiece.imageX = tempPiece.finalCol * partWidth;
						tempPiece.imageY = tempPiece.finalRow * partHeight;
						tempPiece.placeX = c*partWidth + startXOffset + curPosXOffset;
						tempPiece.placeY = r*partHeight + startYOffset + curPosYOffset;
						board[c][r] = tempPiece;
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
		context.strokeRect(startXOffset/2, startXOffset/2, canvas.width-startXOffset, canvas.height-startYOffset);
		
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
	
	function getTarget(e) {
        return e.srcElement || e.target;
    }
	
	function preventDefault(e) {
        e = e || window.event;
        if (e.preventDefault) {
				e.preventDefault();
        } else {
            e.returnValue = false;
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
	x -= canvas.offsetLeft;
	y -= canvas.offsetTop;
	mouseX=x;
	mouseY=y;
	
	for (var c = 0; c < cols; c++) {
		for (var r = 0; r < rows; r++) {			
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
}

	function keyDownListener(e){
		var key = e.keyCode;
		//Debugger.log(e.keyCode);
		if (key == 83){
		animationFrame.cancel(loop);
		videoElement.pause();
		}
	}
	
	function videoEnded(e){
		animationFrame.cancel(loop);
		videoElement.pause();
	}
	
	function difficultyCtrlSet(){
		// remove event listeners
		canvas.removeEventListener("mouseup",eventMouseUp, false);
		document.removeEventListener("keydown",keyDownListener,false);
		videoElement.removeEventListener("ended",videoEnded,false);
		animationFrame.cancel(loop);
		videoElement.pause();
		complete = false;
		cols = rows = difficultyCtrl.value;
		init();
	}
	
	function videoCtrlSet(e){
		var target;
		preventDefault(e);
        target = getTarget(e);
		Debugger.log(target.alt);
		videoSel = target.alt;
		canvas.removeEventListener("mouseup",eventMouseUp, false);
		document.removeEventListener("keydown",keyDownListener,false);
		videoElement.removeEventListener("ended",videoEnded,false);
		videoElement.removeEventListener("canplay",videoLoaded,false);
		animationFrame.cancel(loop);
		videoElement.pause();
		complete = false;
		var videoType = supportedVideoFormat(videoElement);
		videoElement.setAttribute("src", "http://quiet.pcriot.com/video/" + videoSel + "." + videoType);
		videoElement.addEventListener("canplay",init,false);
	}
	
}