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
	var blueObject={};
	var redObject={};
	blueObject.x=0;
	blueObject.y=100;
	blueObject.dx=2;
	blueObject.width=48;
	blueObject.height=48;
	blueObject.image=new Image();
	blueObject.image.src="./img/blueplus.png";
	context.drawImage(blueObject.image, 0, 0);
	blueObject.blueImageData=context.getImageData(0, 0, blueObject.width,blueObject.height);
	context.clearRect(0,0,canvas.width, canvas.height);
	redObject.x=348;
	redObject.y=100;
	redObject.dx=-2;
	redObject.width=48;
	redObject.height=48;
	redObject.image=new Image();
	redObject.image.src="./img/redcircle.png";
	context.drawImage(redObject.image, 0, 0);
	redObject.redImageData=context.getImageData(0, 0, redObject.width,redObject.height);
	context.clearRect(0,0,canvas.width, canvas.height);
	

	
	
	function drawScreen() {
		blueObject.x+=blueObject.dx;
		redObject.x+=redObject.dx;
		context.clearRect(0,0,canvas.width, canvas.height);
		context.drawImage(blueObject.image, blueObject.x, blueObject.y);
		context.drawImage(redObject.image, redObject.x, redObject.y);
		//console.log("redObject.redImageData.data[3]=" +	redObject.redImageData.data[3]);
//		console.log("blueObject.blueImageData.data[3]=" + blueObject.blueImageData.data[3]);
		if (boundingBoxCollide(blueObject, redObject)){
			console.log("bounding box collide");
			console.log("redObject.redImageData.data[3]=" +	redObject.redImageData.data[3]);
			console.log("blueObject.blueImageData.data[3]=" + blueObject.blueImageData.data[3]);
			var xMin = Math.max( blueObject.x, redObject.x );
			var yMin = Math.max( blueObject.y, redObject.y );
			var xMax = Math.min( blueObject.x+blueObject.width,redObject.x+redObject.width );
			var yMax = Math.min( blueObject.y+blueObject.height,redObject.y+redObject.height );
			for ( var pixelX = xMin; pixelX < xMax; pixelX++ ) {
				for ( var pixelY = yMin; pixelY < yMax; pixelY++ ) {
					var bluepixel = ((pixelX-blueObject.x + pixelY-blueObject.y )*blueObject.width )*4 + 3 ;
					var redpixel = ((pixelX-redObject.x + pixelY-redObject.y)*redObject.width)*4 + 3 ;
					if (( blueObject.blueImageData.data [ bluepixel ] !== 0 ) && ( redObject.redImageData.data[ redpixel ] !== 0 )) {
						console.log("pixel collision");
						console.log("bluepixel " + bluepixel);
						console.log("redpixel " + redpixel);
						blueObject.dx=0;
						redObject.dx=0;
						window.clearInterval(startUp);
						break;
					}
				}
			}
		}
	}

	
	function boundingBoxCollide(object1, object2) {
		var left1 = object1.x;
		var left2 = object2.x;
		var right1 = object1.x + object1.width;
		var right2 = object2.x + object2.width;
		var top1 = object1.y;
		var top2 = object2.y;
		var bottom1 = object1.y + object1.height;
		var bottom2 = object2.y + object2.height;
		if (bottom1 < top2) return(false);
		if (top1 > bottom2) return(false);
		if (right1 < left2) return(false);
		if (left1 > right2) return(false);
		return(true);
	};
		
	function startUp() {
		window.setTimeout(startUp, 100);
		drawScreen();
	}	
	
	startUp();
	
}