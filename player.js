function Player(){
	//Variablen
	var posX = mouseX-33;
	var posY = mouseY-36;
	var show = true;
	var empty = false;
	
	
	//Funktionen
	this.repoCross = function(){
		posX = mouseX-33;
		posY = mouseY-36
	}
	
	this.drawCross = function(){
		if(show){
			pen.drawImage(crosshair,posX,posY);
		}
	}
	
	function win(){
		over = true;
		
		karl.state = 4;
		karl.talk = 3;
		score += 500;
	}	
	
	this.shoot = function(e){
		if(!empty&&show){
			shotSound.play();
			empty = true;
			
			var abstandX = anzeige.offsetLeft;
			var abstandY = anzeige.offsetTop;
			var shootX = e.clientX-abstandX;
			var shootY = e.clientY-abstandY;
			if(shootX>350&&shootX<443&&shootY>50&&shootY<261) win();
		}
	}
	
	this.getShow = function(){
		return show;
	}
	
	this.setShow = function(val){
		show = val;
	}
}