function Player(){
	//Variablen
	var posX = mouseX-33;
	var posY = mouseY-36;
	var show = true;
	var empty = false;
	this.iconState = 0; //Iconposition 0 = nicht da; 1 = Spiel starten; 2 = Optionen; 3 = Spiel beenden
	
	
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
	
	this.drawMenuIcon = function(){
		switch(this.iconState){
			case 1: pen.drawImage(menuIcon,180,160); break;
			case 2: pen.drawImage(menuIcon,180,230); break;
			case 3: pen.drawImage(menuIcon,180,300); break;
		}
	}
	
	function win(){
		over = true;
		
		karl.state = 4;
		karl.talk = 3;
		score += 500;
	}	
	
	this.shoot = function(e){
		if(!empty&&show&&!menuScreen){
			shotSound.play();
			empty = true;
			
			var abstandX = anzeige.offsetLeft;
			var abstandY = anzeige.offsetTop;
			var shootX = e.clientX-abstandX;
			var shootY = e.clientY-abstandY;
			if(shootX>350&&shootX<443&&shootY>50&&shootY<261) win();
		}
		else if(show&&menuScreen){
			switch(player.iconState){
				case 1: initialisieren(); break;
				case 2: ; break;
				case 3: ; break;
			}
		}
	}
	
	this.getShow = function(){
		return show;
	}
	
	this.setShow = function(val){
		show = val;
	}
}