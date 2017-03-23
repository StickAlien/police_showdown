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
var anzeige, pen, tickFlag, lastTime, karl, intervalRain, intervalBasic;


//Funktionen
function initialisieren(){
	anzeige = document.getElementById("anzeige");
	pen = anzeige.getContext("2d");
	tickFlag = true;
	lastTime = 0;
	intervalRain = 0;
	intervalBasic = 0;
	karl = new Gangster();
	window.requestAnimationFrame(tick);
}

function basic(pause){
	intervalBasic += pause;
	if(intervalBasic>200){
		intervalBasic = 0;
		pen.clearRect(0,0,768,432);
		pen.drawImage(background,0,0);
	}
}

function raining(pause){
	intervalRain += pause;
	if(intervalRain>200){
		intervalRain = 0;
		if(tickFlag){
			tickFlag = false;
			pen.drawImage(rain,0,0);
		}
		else{
			tickFlag = true;
			pen.drawImage(rainTwo,0,0);
		}
	}
}


function tick(){
	var time = new Date();
	var pause = time.getTime() - lastTime;
	lastTime = time.getTime();
	basic(pause);
	karl.animateEnemy(pause);
	raining(pause);
	window.requestAnimationFrame(tick);
}

//Programmablauf
initialisieren();