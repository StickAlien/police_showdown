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

var menuIcon = document.createElement("img");
menuIcon.src = "resource/texture/punktscaled.png";

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
var mainSong = document.createElement("audio");
mainSong.src = "resource/sound/mainSong.mp3"

var rainSound = document.createElement("audio");
rainSound.src = "resource/sound/rain.wav";

var drawSound = document.createElement("audio");
drawSound.src = "resource/sound/gunDraw.wav";

var shotSound = document.createElement("audio");
shotSound.src = "resource/sound/gunShot.wav";


//Variablen
var anzeige, hudHead, hudFoot, pen;
var lastTime, lastTimeMenu, intervalRain, intervalUpdate, pause, pauseMenu;
var switchFlag, stateRain, stateBack, over, menuScreen;
var mouseX, mouseY;
var karl, player;
var score, guiScore, reactionEnemy, guiReactionEnemy, reactionPlayer, guiReactionPlayer;


//Funktionen
function menu(){
	karl = new Gangster();
	player = new Player();
		
	anzeige = document.getElementById("anzeige");
	hudFoot = document.getElementById("hudFoot");
	hudHead = document.getElementById("hudHead");
	anzeige.addEventListener("mousemove",getCoord);
	anzeige.addEventListener("click",player.shoot);
	pen = anzeige.getContext("2d");
	
	mainSong.loop = true;
	mainSong.play();
	
	menuScreen = true;
	
	window.requestAnimationFrame(tickMenu);
}

function initialisieren(){
	stateRain = true;
	switchFlag = true;
	stateBack = false;
	over = false;
	
	menuScreen = false;
	player.setShow(false);
	mainSong.pause();
	
	pause = 0;
	lastTime = 0;
	intervalRain = 0;
	intervalUpdate = 0;
	
	score = 0;
	reactionEnemy = 2000;
	reactionPlayer = 0;
	
	rainSound.loop = true;
	rainSound.volume = 0.2;
	rainSound.play();
	
	guiScore = document.createElement("div");
	guiScore.className = "hudItem";
	guiScore.innerHTML = "SCORE:"+score;
	hudFoot.appendChild(guiScore);
	
	guiReactionPlayer = document.createElement("div");
	guiReactionPlayer.className = "hudItem";
	guiReactionPlayer.innerHTML = "TIME:"+reactionPlayer/1000;
	hudHead.appendChild(guiReactionPlayer);
	
	guiReactionEnemy = document.createElement("div");
	guiReactionEnemy.className = "hudItem";
	guiReactionEnemy.innerHTML = "ENEMY:"+reactionEnemy/1000;
	hudHead.appendChild(guiReactionEnemy);
	
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
	//console.log("X: "+mouseX+"		Y: "+mouseY);
}

function updateHud(){
	intervalUpdate += pause;
	if(intervalUpdate>=100){
		guiScore.innerHTML = "SCORE:"+score;
		guiReactionPlayer.innerHTML = "TIME:"+reactionPlayer/1000;
		intervalUpdate = 0;
	}
}

function repoMenuIcon(){
	if(mouseX>=115&&mouseX<=650&&mouseY>=145&&mouseY<=209){
		player.iconState = 1;
	}
	else if(mouseX>=115&&mouseX<=650&&mouseY>=210&&mouseY<=279){
		player.iconState = 2;
	}
	else if(mouseX>=115&&mouseX<=650&&mouseY>=280&&mouseY<=330){
		player.iconState = 3;
	}
	else{
		player.iconState = 0;
	}
}

function reactionTimer(){
	if(player.getShow()&&!over){
		reactionPlayer += pause;
	}
	if(reactionPlayer>=reactionEnemy&&!over){
		karl.win();
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

function drawMenu(){
	pen.clearRect(0,0,768,432);
	pen.font = "40pt pixel";
    pen.fillStyle = "white";
	pen.fillText("POLICE SHOWDOWN",115,100);
	
	pen.font = "25pt pixel";
	pen.fillText("Spiel starten",250,180);
	
	pen.fillText("Optionen",300,250);
	
	pen.fillText("Spiel beenden",250,320);
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
	
	//Ablauf aller Aufgaben
	animate();
	reactionTimer();
	player.repoCross();
	basic();
	
	karl.animateEnemy();
	karl.talkEnemy();
	
	raining();
	player.drawCross();
	
	karl.walkEnemy();
	karl.shootEnemy();
	
	updateHud();
	
	pause = 0;
	
	window.requestAnimationFrame(tick);
}

function tickMenu(){
	var time = new Date();
	pauseMenu = time.getTime() - lastTime;
	lastTimeMenu = time.getTime();
	
	drawMenu();
	
	player.repoCross();
	player.drawCross();
	repoMenuIcon();
	player.drawMenuIcon();
	
	if(menuScreen) window.requestAnimationFrame(tickMenu);
}


//Initialisierung
menu();