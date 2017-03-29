//Texturen laden
var background = document.createElement("img");
background.src = "resource/texture/background2scaled.png";

var backgroundTwo = document.createElement("img");
backgroundTwo.src = "resource/texture/backgroundscaled.png";

var rain = document.createElement("img");
rain.src = "resource/texture/rainphase1scaled.png";

var rainTwo = document.createElement("img");
rainTwo.src = "resource/texture/rainphase2scaled.png";

var crosshair = document.createElement("img");
crosshair.src = "resource/texture/crosshairscaled.png";

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
var anzeige, hudHead, hudFoot, pen;
var lastTime, intervalRain, pause;
var switchFlag, stateRain, stateBack;
var mouseX, mouseY;
var karl, player;
var score, guiScore, reactionEnemy, guiReactionEnemy, reactionPlayer, guiReactionPlayer;

//Funktionen
function initialisieren(){
	anzeige = document.getElementById("anzeige");
	hudFoot = document.getElementById("hudFoot");
	hudHead = document.getElementById("hudHead");
	anzeige.addEventListener("mousemove",getCoord);
	pen = anzeige.getContext("2d");
	
	stateRain = true;
	switchFlag = true;
	stateBack = false;
	
	pause = 0;
	lastTime = 0;
	intervalRain = 0;
	
	score = 0;
	reactionEnemy = 1300;
	reactionPlayer = 0;
	
	rainSound.loop = true;
	rainSound.play();
	
	guiScore = document.createElement("div");
	guiScore.className = "hudItem";
	guiScore.innerHTML = "SCORE:"+score;
	hudFoot.appendChild(guiScore);
	
	guiReactionPlayer = document.createElement("div");
	guiReactionPlayer.className = "hudItem";
	guiReactionPlayer.innerHTML = "YOUR TIME:"+reactionPlayer/1000;
	hudHead.appendChild(guiReactionPlayer);
	
	guiReactionEnemy = document.createElement("div");
	guiReactionEnemy.className = "hudItem";
	guiReactionEnemy.innerHTML = "ENEMY TIME:"+reactionEnemy/1000;
	hudHead.appendChild(guiReactionEnemy);
	
	karl = new Gangster();
	otto = new Player();
	
	window.requestAnimationFrame(tick);
}

function animate(){
	intervalRain += pause;
	if(karl.idle||karl.walk) karl.interval += pause;
	if(karl.idle) karl.drawInterval += pause;
	
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

function getCoord(e){
	var abstandX = anzeige.offsetLeft;
	var abstandY = anzeige.offsetTop;
	mouseX = e.clientX-abstandX;
	mouseY = e.clientY-abstandY;
}

function updateHud(){
	guiScore.innerHTML = "SCORE:"+score;
	guiReactionPlayer.innerHTML = "YOUR TIME:"+reactionPlayer/1000;
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
	otto.repoCross();
	basic();
	
	karl.animateEnemy();
	karl.talkEnemy();
	
	raining();
	otto.drawCross();
	
	karl.walkEnemy();
	karl.shootEnemy();
	
	updateHud();
	
	pause = 0;
	
	window.requestAnimationFrame(tick);
}


//Programmablauf
initialisieren();