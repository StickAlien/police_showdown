function Player(){
	//Variablen
	posiX = mouseX-33;
	posiY = mouseY-36;
	
	
	//Funktionen
	this.repoCross = function(){
		posiX = mouseX-40;
		posiY = mouseY-40;
	}
	
	this.drawCross = function(){
		pen.drawImage(crosshair,posiX,posiY);
	}
}