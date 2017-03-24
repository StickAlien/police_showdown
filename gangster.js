function Gangster(){
	posX = 350;
	posY = 50;
	this.state = 0; //Stadien 0 = normal; 1 = laufend; 2 = idle; 3 = schießen; 4 = besiegt
	this.interval = 0;
	
	this.animateEnemy = function(){
		switch(this.state){
			case 0: pen.drawImage(enemy,posX,posY); break;
			case 1: pen.drawImage(enemyMotion,posX,posY); break;
			case 2: pen.drawImage(enemyIdle,posX,posY); break;
			case 3: pen.drawImage(enemyShot,posX,posY); break;
			case 4: pen.drawImage(enemyDead,posX,posY); break;
		}
	}
}