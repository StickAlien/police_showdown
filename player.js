function Player(){
	//Variablen
	var posX = mouseX-33;
	var posY = mouseY-36;
	this.show = false;
	
	
	//Funktionen
	this.repoCross = function(){
		posX = mouseX-40;
		posY = mouseY-40;
	}
	
	this.drawCross = function(){
		if(this.show){
			pen.drawImage(crosshair,posX,posY);
		}
	}
}