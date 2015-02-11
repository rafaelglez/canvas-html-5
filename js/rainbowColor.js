function RGB2Color(r,g,b){
  return '#' + byte2Hex(r) + byte2Hex(g) + byte2Hex(b);
}

function byte2Hex(n){
  var nybHexString = "0123456789ABCDEF";
  return String(nybHexString.substr((n >> 4) & 0x0F,1)) + nybHexString.substr(n & 0x0F,1);
}

function randomInt(min,max){
    return Math.floor(Math.random()*(max-(min+1))+(min+1));
}  


function getColor(){
var R,G,B;
var frequency = .085;
var amplitude = 127;
var center = 128;
var i = randomInt(1,100);
R = Math.floor(Math.sin(frequency*i + (0)) * amplitude + center);
G = Math.floor(Math.sin(frequency*i + (2*Math.PI/3)) * amplitude + center);
B = Math.floor(Math.sin(frequency*i + (4*Math.PI/3)) * amplitude + center);
	//console.log("rgb("+R+","+G+","+B+")");
	return RGB2Color(R,G,B);	
}