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

var bubbleFire = document.createElement("img");
bubbleFire.src = "resource/texture/sprechblaseFire.png";

var bubbleGameOver = document.createElement("img");
bubbleGameOver.src = "resource/texture/sprechblaseGameOver.png";

var bubbleYouWon = document.createElement("img");
bubbleYouWon.src = "resource/texture/sprechblaseYouWon.png";

//Sound laden
var rainSound = document.createElement("audio");
rainSound.src = "resource/sound/rain.wav";

var drawSound = document.createElement("audio");
drawSound.src = "resource/sound/gunDraw.wav";


//Variablen
var anzeige, pen, stateRain, lastTime, karl, stateBack, intervalRain, switchFlag, pause;


//Funktionen
function initialisieren(){
	anzeige = document.getElementById("anzeige");
	pen = anzeige.getContext("2d");
	stateRain = true;
	switchFlag = true;
	lastTime = 0;
	stateBack = false;
	intervalRain = 0;
	pause = 0;
	rainSound.loop = true;
	rainSound.play();
	karl = new Gangster();
	window.requestAnimationFrame(tick);
}

function animate(){
	intervalRain += pause;
	if(karl.idle||karl.walk) karl.interval += pause;
	if(karl.idle) karl.drawInterval += pause;
	console.log(karl.drawInterval);
	
	if(intervalRain>=200){
		intervalRain = 0;
		stateRain = !stateRain;
	}
	
	if(karl.interval>=500){
		if(karl.idle){
			if(switchFlag){
				karl.state = 0;
			}
			else{
				karl.state = 2;
			}
			karl.interval = 0;
		}
		else if(karl.walk){
			if(switchFlag){
				karl.state = 0;
			}
			else{
				karl.state = 1;
			}
		}
		switchFlag = !switchFlag
	}
}

function toggleLight(){
	stateBack = !stateBack;
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
	karl.talkEnemy();
	raining();
	karl.walkEnemy();
	karl.shootEnemy();
	pause = 0;
	window.requestAnimationFrame(tick);
}

//Programmablauf
initialisieren();