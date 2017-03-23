function Gangster(){
	posX = 350;
	posY = 50;
	state = 0; //Stadien 0 = normal; 1 = laufend; 2 = idle; 3 = schießen; 4 = besiegt
	intervalEnemy = 0;
	
	this.animateEnemy = function(pause){
		this.intervalEnemy += pause;
		if(this.intervalEnemy>500){
			this.intervalEnemy = 0;
			switch(state){
				case 0: pen.drawImage(enemy,posX,posY);; break;
				case 1: pen.drawImage(enemyMotion,posX,posY);; break;
				case 2: pen.drawImage(enemyIdle,posX,posY);; break;
				case 3: pen.drawImage(enemyShot,posX,posY);; break;
				case 4: pen.drawImage(enemyDead,posX,posY);; break;
			}
		}
	}
}