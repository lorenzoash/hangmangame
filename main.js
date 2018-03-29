/*----- constants -----*/
var nba = [
    'HAWKS', 'CELTICS', 'NETS', 'BOBCATS', 'BULLS', 'CAVALIERS',
    'MAVERICKS', 'NUGGETS', 'PISTONS', 'WARRIORS', 'ROCKETS', 'PACERS', 'CLIPPERS',
    'LAKERS', 'GRIZZLIES', 'HEAT', 'BUCKS', 'TIMBERWOLVES', 'HORNETS', 'KNICKS', 'THUNDER',
    'MAGICS', 'SIXERS', 'SUNS', 'BLAZERS', 'KINGS', 'SPURS', 'RAPTORS', 'JAZZ', 'WIZARDS', 'CHARLES BARKLEY',
    'ELGIN BAYLOR', 'REGGIE MILLER', 'KEVIN DURANT', 'DIRK NOWITZKI', 'JOHN STOCKTON', 'KARL MALONE', 'DRAYMOND GREEN',
    'GIANNIS ANTETOKOUNMPO', 'ANTHONY DAVIS', 'CHRIS PAUL', 'RUSSELL WESTBROOK', 'JAMES HARDEN', 'KAWHI LEONARD', 'STEPHEN CURRY',
    'LEBRON JAMES', 'MICHAEL JORDAN', 'KOBE BRYANT', 'KYRIE IRVING', 'LAVAR BALL', 'LONZO BALL', 'BRANDON INGRAM', 'KYLE KUZMA',
    'JULIUS RANDLE', 'KAREEM ABDULJABBAR', 'SHAQUILLE ONEAL', 'TIM DUNCAN', 'MAGIC JOHNSON', 'BILL RUSSELL', 'WILT CHAMBERLAIN',
    'LARRY BIRD', 'HAKEEM OLAJUWON', 'OSCAR ROBERTSON', 'JULIUS ERVING', 'JUMP SHOT', 'CROSS OVER', 'SLAM DUNK', 'DRIBBLING', 'LAYUP',
    'ALL STAR', 'HALL OF FAME', 'BACKBOARD', 'BOUNCE PASS', 'FLASHY PASS', 'BASKETBALL', 'PLAYMAKER', 'DEFENDER', 'BLOCK SHOT', 'POSTERIZE',
    'TRIANGLE OFFENSE', 'MID RANGE', 'BALL HANDLING', 'POST OFFENSE', 'LATERAL QUICKNESS', 'STEALS', 'BLOCKS', 'POST HOOK', 'POST FADEAWAY',
    'CONTACT DUNK', 'OFF DRIBBLE', 'ROOKIE', 'SHOT CONTEST', 'NIKOLA VUCEVIC', 'DEVIN BOOKER', 'TRISTAN THOMPSON', 'ANDRE IGUODALA', 'JOEL EMBIID',

];

/*----- app's state (variables) -----*/
var shots; // amount of bad guess lefts
var word;
var guess; // Underscores based off of word
var badGuesses;
var allGuesses;

/*----- cached element references -----*/
var guessEl = document.getElementById('guess');
var letterEls = document.querySelectorAll('.letter');
var winPopup = document.getElementById('win-popup');
var losePopup = document.getElementById('lose-popup');

/*----- event listeners -----*/
resetButton = document.getElementById('reset-btn').addEventListener('click', initialize);

document.getElementById('letters').addEventListener('click', handleClick);

/*----- functions -----*/

initialize();

function handleClick(e) {
    var letter = e.target.textContent;
    if (!letter || allGuesses.includes(letter) || guess === word || !shots) return;
    allGuesses.push(letter);
    if (!word.includes(letter)) {
        shot--;
        badGuesses.push(letter);
    }
    guess = guess.split('').map((char, idx) => word.charAt(idx) === letter ? letter : char).join('');
    render();
}

function initialize() {
    shots = 6;
    word = nba[Math.floor(Math.random() * nba.length)];
    guess = '_'.repeat(word.length);
    var wordArr = word.split('');
    var guessArr = guess.split('');
    wordArr.forEach(function (char, idx) {
        if (char === " ") {
            guessArr[idx] = " ";
        }
    });
    winPopup.classList.remove('popup');
    losePopup.classList.remove('popup1');
    guess = guessArr.join("");
    allGuesses = [];
    badGuesses = [];
    render();
}

function render() {
    guessEl.textContent = guess;
    document.getElementById('showShots').innerHTML = `You have ${shots} Shots`;
    letterEls.forEach(function (td) {
        td.style.opacity = allGuesses.includes(td.textContent) ? 0.5 : 1;
        td.style.color = badGuesses.includes(td.textContent) ? 'red' : 'white';
    });

    for (var i = 1; i < 7; i++) {
        var div = document.getElementById('img' + i);
        div.style.backgroundImage = i >= shots+1 ? `url(images/img${i}.png)` : '';
    }

    if (shots === 0) {
        losePopup.classList.add('popup1');
    } 
    
    if (guess === word) {
        winPopup.classList.add('popup');
    }
}

var music = document.getElementById("music");
var playButton = document.getElementById("play");
var pauseButton = document.getElementById("pause");
var playhead = document.getElementById("elapsed");
var timeline = document.getElementById("slider");
var timer = document.getElementById("timer");
var duration;
pauseButton.style.visibility = "hidden";

var timelineWidth = timeline.offsetWidth - playhead.offsetWidth;
music.addEventListener("timeupdate", timeUpdate, false);

function timeUpdate() {
	var playPercent = timelineWidth * (music.currentTime / duration);
	playhead.style.width = playPercent + "px";

	var secondsIn = Math.floor(((music.currentTime / duration) / 3.5) * 100);
	if (secondsIn <= 9) {
		timer.innerHTML = "0:0" + secondsIn;
	} else {
		timer.innerHTML = "0:" + secondsIn;
	}
}

playButton.onclick = function() {
	music.play();
	playButton.style.visibility = "hidden";
	pause.style.visibility = "visible";
}

pauseButton.onclick = function() {
	music.pause();
	playButton.style.visibility = "visible";
	pause.style.visibility = "hidden";
}

music.addEventListener("canplaythrough", function () {
	duration = music.duration;
}, false);