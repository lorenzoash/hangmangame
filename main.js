/*----- constants -----*/
var nba = [
    'HAWKS', 'CELTICS', 'NETS', 'BOBCATS', 'BULLS', 'CAVALIERS',
    'MAVERICKS', 'NUGGETS','PISTONS', 'WARRIORS', 'ROCKETS', 'PACERS', 'CLIPPERS', 
    'LAKERS','GRIZZLIES', 'HEAT', 'BUCKS', 'TIMBERWOLVES', 'HORNETS','KNICKS', 'THUNDER',
    'MAGICS', 'SIXERS', 'SUNS', 'BLAZERS', 'KINGS', 'SPURS', 'RAPTORS', 'JAZZ', 'WIZARDS', 'CHARLES BARKLEY',
    'ELGIN BAYLOR', 'REGGIE MILLER', 'KEVIN DURANT', 'DIRK NOWITZKI', 'JOHN STOCKTON', 'KARL MALONE', 'DRAYMOND GREEN',
    'GIANNIS ANTETOKOUNMPO', 'ANTHONY DAVIS', 'CHRIS PAUL', 'RUSSELL WESTBROOK', 'JAMES HARDEN', 'KAWHI LEONARD', 'STEPHEN CURRY',
    'LEBRON JAMES', 'MICHAEL JORDAN', 'KOBE BRYANT', 'KYRIE IRVING', 'LAVAR BALL', 'LONZO BALL', 'BRANDON INGRAM', 'KYLE KUZMA',
    'JULIUS RANDLE', 'KAREEM ABDULJABBAR', 'SHAQUILLE ONEAL', 'TIM DUNCAN', 'MAGIC JOHNSON', 'BILL RUSSELL', 'WILT CHAMBERLAIN', 
    'LARRY BIRD', 'HAKEEM OLAJUWON', 'OSCAR ROBERTSON', 'JULIUS ERVING', 'JUMP SHOT', 'CROSS OVER', 'SLAM DUNK', 'DRIBBLING', 'LAYUP',
    'ALL STAR', 'HALL OF FAME', 'BACKBOARD','BOUNCE PASS'
];

/*----- app's state (variables) -----*/
var shots = 6
var word;
var guess;
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
    if (shots === 0) return;
    var letter = e.target.textContent;
    if (!letter || allGuesses.includes(letter)) return;
    allGuesses.push(letter);
    var found = false;
    var wordArr = word.split('');
    var guessArr = guess.split('');
    wordArr.forEach(function(char, idx) {
        if (char === letter) {
            found = true;
            guessArr[idx] = letter; 
        }
    });
    if (!found) badGuesses.push(letter);
    guess = guessArr.join("");
    render();
}

function initialize() {
    word = nba[Math.floor(Math.random() * nba.length)];
    guess = '_'.repeat(word.length);
    var wordArr = word.split('');
    var guessArr = guess.split('');
    wordArr.forEach(function(char, idx) {
        if (char === " ") {
            guessArr[idx] = " "; 
        }
    });
    winPopup.classList.remove('popup');
    losePopup.classList.remove('popup1');
    guess = guessArr.join("");
    badGuesses = [];
    allGuesses = [];
    render();
}

function render() {
    guessEl.textContent = guess;
    document.getElementById('showShots').innerHTML = "You have " + (shots - badGuesses.length) + " Shots";
    letterEls.forEach(function(td){
        td.style.opacity = allGuesses.includes(td.textContent) ? 0.5 : 1;
    });
    for (var i = 1; i < 7; i++) {
        var div = document.getElementById('img' + i);
        div.style.backgroundImage = i <= badGuesses.length ? `url(images/img${i}.png)` : '';
    }
    if (guess === word) {
        winPopup.classList.add('popup');
    } else if(badGuesses.length === 6) {
        losePopup.classList.add('popup1');
    }
}



