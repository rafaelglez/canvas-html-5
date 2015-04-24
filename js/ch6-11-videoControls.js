window.addEventListener('load', eventWindowLoaded, false);
var loadCount= 0;
var itemsToLoad = 2;
var videoElement;
var videoDiv;
var buttonSheet;
var buttonWait = 5;
var timeWaited = buttonWait;

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
	videoElement.addEventListener("canplay",itemLoaded,false);
	videoElement.setAttribute("src", "http://quiet.pcriot.com/video/blank." + videoType);
	buttonSheet = new Image();
	buttonSheet.onload = itemLoaded;
	buttonSheet.src = "./img/videobuttons.png";
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

function itemLoaded(){
	loadCount++;
	if (loadCount >= itemsToLoad){
		canvasApp();
	}
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
	//var startXOffset = 10;
	//var startYOffset = 10;
	var bW = 32;
	var bH = 32;
	var playX = 190;
	var playY = 300;
	var pauseX = 230;
	var pauseY = 300;
	var stopX = 270;
	var stopY = 300;
	var bottonPlay = false;
	var bottonPause = false;
	var bottonStop = false;
	
	
	// Add event listener to mouse
	document.addEventListener("mouseup",eventMouseUp, false);
	// Add event listener to keyword
	document.addEventListener("keydown",keyDownListener,false);
	
	gameLoop();
	
	function gameLoop(){
		loop = window.setTimeout(gameLoop, 20);
		drawScreen();
	}
	
	function drawScreen(){	
		update();
		render();
	}
	
	function update(){
	
	}
	
	function render(){
		//Background
		context.fillStyle = '#000';
		context.fillRect(0, 0, canvas.width, canvas.height);
		//Box
		context.strokeStyle = '#fff';
		context.strokeRect(5, 5, canvas.width-10, canvas.height-10);
		//video
		context.drawImage(videoElement, 85, 30);
		//Draw Buttons
		//Play
		if (bottonPlay) {
			context.drawImage(buttonSheet,64,64,bW,bH,playX,playY,bW,bH); //Play Down
			context.drawImage(buttonSheet,32,0,bW,bH,stopX,stopY,bW,bH); // Stop up
			context.drawImage(buttonSheet,0,0,bW,bH,pauseX,pauseY,bW,bH); // Pause up
			if (videoElement.paused) {
				videoElement.play();
				bottonPlay = false;
			}
		} 
		else {
			context.drawImage(buttonSheet,64,0,bW,bH,playX,playY,bW,bH); //Play up
		}
		if (bottonPause) {
			context.drawImage(buttonSheet,0,64,bW,bH,pauseX,pauseY,bW,bH); // Pause down
			context.drawImage(buttonSheet,64,0,bW,bH,playX,playY,bW,bH); //Play up
			context.drawImage(buttonSheet,32,0,bW,bH,stopX,stopY,bW,bH); // Stop up
			if (videoElement.paused) {
				videoElement.play();
				bottonPause = false;
			} 
			else {
				videoElement.pause();
				bottonPause = false;
			}
		}
		else {
			context.drawImage(buttonSheet,0,0,bW,bH,pauseX,pauseY,bW,bH); // Pause up
		}
		if (bottonStop) {
			videoElement.pause();
			videoElement.currentTime = 0;
			context.drawImage(buttonSheet,32,0,bW,bH,stopX,stopY,bW,bH); // Stop up
			//timer 
			//context.drawImage(buttonSheet,32,0,bW,bH,stopX,stopY,bW,bH); // Stop up
		}
		timeWaited++;
	}
	
//Event handlers
function eventMouseUp(event) {
	if (timeWaited >= buttonWait) {
		timeWaited = 0;
		var mouseX;
		var mouseY;
		var x;
		var y;
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
		//Hit Play
		if ( (mouseY >= playY) && (mouseY <= playY+bH) && (mouseX >= playX) && (mouseX <= playX+bW) ) {
			bottonPlay = true;
			bottonPause = false;
			bottonStop = false;
		}
		//Hit Stop
		if ( (mouseY >= stopY) && (mouseY <= stopY+bH) && (mouseX >= stopX) && (mouseX <= stopX+bW) ) {
			bottonStop = true;
			bottonPause = false;
			bottonPlay = false;
			
		}
		//Hit Pause
		if ( (mouseY >= pauseY) && (mouseY <= pauseY+bH) && (mouseX >= pauseX) && (mouseX <= pauseX+bW) ) {
			bottonStop = false;
			bottonPause = true;
			bottonPlay = false;
		}
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