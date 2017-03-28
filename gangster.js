function Gangster(){
	posX = 0;
	posY = 50;
	this.state = 0; //Stadien 0 = normal; 1 = laufend; 2 = idle; 3 = schießen; 4 = besiegt
	this.talk = 0; //Sprechblasen 0 = keine; 1 = FIRE!!; 2 = Game Over; 3 = You Won!!
	this.interval = 0;
	this.drawInterval = 0;
	this.idle = false;
	this.walk = true;
	this.drawTime = Math.round(Math.random()*6000-1000);

	this.animateEnemy = function(){
		switch(this.state){
			case 0: pen.drawImage(enemy,posX,posY); break;
			case 1: pen.drawImage(enemyMotion,posX,posY); break;
			case 2: pen.drawImage(enemyIdle,posX,posY); break;
			case 3: pen.drawImage(enemyShot,posX,posY); break;
			case 4: pen.drawImage(enemyDead,posX,posY); break;
		}
	}
	
	this.talkEnemy = function(){
		switch(this.talk){
			case 1: pen.drawImage(bubbleFire,400,30); break;
			case 2: pen.drawImage(bubbleGameOver,400,30); break;
			case 3: pen.drawImage(bubbleYouWon,400,30); break;
		}
	}
	
	this.walkEnemy = function(){
		if(this.interval>=500){
			karl.interval = 0;
			posX += 50;
		}
		if(posX==350&&this.walk){
			this.idle = true;
			this.walk = false;
			stateBack = true;
		}
	}
	
	this.shootEnemy = function(){
		if(this.drawInterval>=this.drawTime&&this.idle){
			this.state = 3;
			this.talk = 1;
			drawSound.play();
			this.idle = false;
		}
	}
}