window.addEventListener('load', eventWindowLoaded, false);

function eventWindowLoaded() {
	canvasApp();
}

function canvasSupport () {
	return Modernizr.canvas;
}

function canvasApp(){

var fillOrStroke = "fill";
var fontSize = "50";
var fontFace = "Arcade";
var fontWeight = "normal";
var fontStyle = "normal";
var message = "Hello World";
var textFillColor = "#A5A5AC";
var bgColor = $c.complement(textFillColor);
var textBaseline = "middle";
var textAlign = "center";
var textAlpha = 1;
var shadowX = 1;
var shadowY = 1;
var shadowBlur = 1;
var shadowColor = "#707070";

	
	if (!canvasSupport()) {
		return;
	}
			
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");
	var formElement = document.getElementById("textBox");
	formElement.addEventListener('keyup', textBoxChanged, false);
	formElement = document.getElementById("fillOrStroke");
	formElement.addEventListener('change', fillOrStrokeChanged, false);
	formElement = document.getElementById("textSize");
	formElement.addEventListener('change', textSizeChanged, false);
	formElement = document.getElementById("textFont");
	formElement.addEventListener('change', textFontChanged, false);
	formElement = document.getElementById("fontWeight");
	formElement.addEventListener('change', fontWeightChanged, false);
	formElement = document.getElementById("fontStyle");
	formElement.addEventListener('change', fontStyleChanged, false)
	formElement = document.getElementById("picker");
	formElement.addEventListener('change', textFillColorChanged, false);
	formElement = document.getElementById("textBaseline");
	formElement.addEventListener('change', textBaselineChanged, false);
	formElement = document.getElementById("textAlign");
	formElement.addEventListener('change', textAlignChanged, false);
	formElement = document.getElementById("textAlpha");
	formElement.addEventListener('change', textAlphaChanged, false);
	formElement = document.getElementById("canvasStyleWidth");
	formElement.addEventListener("change", canvasStyleSizeChanged, false);
	formElement = document.getElementById("canvasStyleHeight");
	formElement.addEventListener("change", canvasStyleSizeChanged, false);

	
	
	drawScreen();
		
	function drawScreen(){
	canvas.width = canvas.width;
	var xPosition = (canvas.width/2);
	var yPosition = (canvas.height/2);
	var metrics = context.measureText(message);
	var textWidth = metrics.width;

	//Background
	context.setTransform(1,0,0,1,0,0);
	context.globalAlpha = .3;
	context.fillStyle = bgColor;
	context.fillRect(0, 0, canvas.width, canvas.height);
	//Box
	context.strokeStyle = "#000"; 
	context.strokeRect(5,  5, canvas.width-10, canvas.height-10);
	//Referencia
	context.setTransform(1,0,0,1,0,0);
	context.globalAlpha = 1;
	context.moveTo(xPosition,yPosition-10)
	context.lineTo(xPosition,yPosition+10)
	context.moveTo(xPosition-10,yPosition)
	context.lineTo(xPosition+10,yPosition)
	context.stroke();
	//Text	
	context.textBaseline = textBaseline;
	context.textAlign = textAlign;
	context.font = fontWeight + " " + fontStyle + " " + fontSize + "px " + fontFace;
	context.setTransform(1,0,0,1,0,0);
	context.globalAlpha = textAlpha;
	Debugger.log("textFillColor "+ textFillColor+ " bgColor:"+bgColor);
	switch(fillOrStroke) {
		case "fill":
		context.fillStyle = textFillColor;
		context.fillText (message, xPosition,yPosition);
		break;
		case "stroke":
		context.strokeStyle = textFillColor;
		context.strokeText (message, xPosition,yPosition);
		break;
		case "both":
		context.fillStyle = textFillColor;
		context.fillText (message, xPosition,yPosition);
		context.strokeStyle = "#000000";
		context.strokeText (message, xPosition,yPosition);
		break;
	}
	//Debugger.log("Fuente: "+fontWeight + " " + fontStyle + " " + fontSize + "px " + fontFace);
	//Debugger.log("Mensaje: "+message + " xPosition: " + xPosition + " yPosition: " + yPosition);
	}
	
	
	function textBoxChanged(e) {
		var target = e.target;
		message = target.value;
		//var metrics = context.measureText(message);
		//var textWidth = metrics.width;
		//var xPosition = (canvas.width/2) - (textWidth/2);
		var xPosition = (canvas.width/2);
		var yPosition = (canvas.height/2);
		drawScreen();
	}
	
	function fillOrStrokeChanged(e) {
		var target = e.target;
		fillOrStroke = target.value;
		drawScreen();
	}
	
	function textSizeChanged(e) {
		var target = e.target;
		fontSize = target.value;
		drawScreen();
	}
	
	function textFontChanged(e) {
		var target = e.target;
		fontFace = target.value;
		drawScreen();
	}
	
	function fontWeightChanged(e) {
		var target = e.target;
		fontWeight = target.value;
		drawScreen();
	}
	
	function fontStyleChanged(e) {
		var target = e.target;
		fontStyle = target.value;
		drawScreen();
	}	

	function textFillColorChanged(e) {
		var target = e.target;
		textFillColor = "#" + target.value;
		bgColor = $c.complement(textFillColor);
		drawScreen();
	}
	
	function textBaselineChanged(e) {
		var target = e.target;
		textBaseline = target.value;
		drawScreen();
	}
	
	function textAlignChanged(e) {
		var target = e.target;
		textAlign = target.value;
		drawScreen();
	}
	
	function textAlphaChanged(e) {
		var target = e.target;
		textAlpha = target.value;
		drawScreen();
	}
	
	function canvasStyleSizeChanged(e){
		var styleHeight = document.getElementById("canvasStyleHeight");
		var styleWidth = document.getElementById("canvasStyleWidth");
		//método 1 
		// var styleValue = "width:" + styleWidth.value + "px; height:" + styleHeight.value +"px;";
		// canvas.setAttribute("style", styleValue );
		
		// segundo método, my way
		canvas.style.width = styleWidth.value + "px";
		canvas.style.height = styleHeight.value + "px";
		drawScreen();
	}
}