//Texturen laden
var background = document.createElement("img");
background.src = "resource/texture/background2scaled.png";

var backgroundTwo = document.createElement("img");
backgroundTwo.src = "resource/texture/backgroundscaled.png";

var rain = document.createElement("img");
rain.src = "resource/texture/rainphase1scaled.png";

var rainTwo = document.createElement("img");
rainTwo.src = "resource/texture/rainphase2scaled.png";

var enemy = document.createElement("img");
enemy.src = "resource/texture/gangster1scaled.png";

var enemyDead = document.createElement("img");
enemyDead.src = "resource/texture/gangster1deadscaled.png";

var enemyIdle = document.createElement("img");
enemyIdle.src = "resource/texture/gangster1idlescaled.png";

var enemyMotion = document.createElement("img");
enemyMotion.src = "resource/texture/gangster1movescaled.png";

var enemyShot = document.createElement("img");
enemyShot.src = "resource/texture/gangster1shootscaled.png";


//Variablen
var anzeige, pen, tickFlag;


//Funktionen
function initialisieren(){
	anzeige = document.getElementById("anzeige");
	pen = anzeige.getContext("2d");
	tickFlag = true;
	requestAnimationFrame(tick);
}

function drawStateOne(){
	pen.drawImage(background,0,0);
	pen.drawImage(rain,0,0);
}

function drawStateTwo(){
	pen.drawImage(background,0,0);
	pen.drawImage(rainTwo,0,0);
}

function tick(){
	requestAnimationFrame(tick);
	pen.clearRect(0,0,432,768);
	if(tickFlag){
		tickFlag = false
		drawStateOne();
	}
	else{
		tickFlag = true;
		drawStateTwo();
	}
}


initialisieren();