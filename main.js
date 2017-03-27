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
var anzeige, pen, stateRain, lastTime, karl, stateBack, intervalRain, switchFlag, pause;


//Funktionen
function initialisieren(){
	anzeige = document.getElementById("anzeige");
	pen = anzeige.getContext("2d");
	stateRain = true;
	switchFlag = true;
	lastTime = 0;
	stateBack = true;
	intervalRain = 0;
	pause = 0;
	karl = new Gangster();
	window.requestAnimationFrame(tick);
}

function animate(){
	intervalRain += pause;
	karl.interval += pause;
	if(intervalRain>=200){
		intervalRain = 0;
		stateRain = !stateRain;
	}
	
	if(karl.interval>=750){
		karl.interval = 0;
		if(karl.idle){
			if(switchFlag){
				karl.state = 0;
			}
			else{
				karl.state = 2;
			}
		}
		switchFlag = !switchFlag
	}
}

function basic(){
	pen.clearRect(0,0,768,432);
	switch(stateBack){
		case true: pen.drawImage(background,0,0); break;
		case false: pen.drawImage(backgroundTwo,0,0); break;
	}
}

function raining(){
	switch(stateRain){
		case true: pen.drawImage(rain,0,0); break;
		case false: pen.drawImage(rainTwo,0,0); break;
	}
}


function tick(){
	var time = new Date();
	pause = time.getTime() - lastTime;
	lastTime = time.getTime();
	animate();
	basic();
	karl.animateEnemy();
	raining();
	pause = 0;
	window.requestAnimationFrame(tick);
}

//Programmablauf
initialisieren();