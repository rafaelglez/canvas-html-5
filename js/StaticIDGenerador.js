//static version of IDGenerator

function IDGenerator(){
};

IDGenerator.getRandomInt = function( min, max ) {
			return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
}
		 
IDGenerator.generate = function() {
			 var timestamp = Date.now().toString();
			 var length = 8;
			 var partimestamp = timestamp.split( "" ).reverse();
			 var id = "";
			 
			 for( var i = 0; i < length; ++i ) {
				var index = this.getRandomInt( 0, partimestamp.length - 1 );
				id += partimestamp[index];	 
			 }			 
			 return id;
}