function Gangster(){
	this.posX = 0;
	this.posY = 50;
	this.state = 0; //Stadien 0 = normal; 1 = laufend; 2 = idle; 3 = schießen; 4 = besiegt
	this.interval = 0;
	this.idle = false;
	this.walk = true; 

	this.animateEnemy = function(){
		switch(this.state){
			case 0: pen.drawImage(enemy,this.posX,this.posY); break;
			case 1: pen.drawImage(enemyMotion,this.posX,this.posY); break;
			case 2: pen.drawImage(enemyIdle,this.posX,this.posY); break;
			case 3: pen.drawImage(enemyShot,this.posX,this.posY); break;
			case 4: pen.drawImage(enemyDead,this.posX,this.posY); break;
		}
	}
	
	this.walkEnemy = function(){
		
	}
}