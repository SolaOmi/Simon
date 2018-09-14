// I borrowed the jquery $ syntax to differentiate between regular javascript
// variables and DOM variables, but there is no jquery at all in this project.

// HTML elements
var $body  = document.getElementsByTagName("body")[0];
var $startBtn = document.getElementById("start");
var $scoreText = document.getElementById("score");
var $yellowBox = document.getElementById("yellow");
var $blueBox   = document.getElementById("blue");
var $redBox    = document.getElementById("red");
var $greenBox  = document.getElementById("green");

// Game variables
var flashSpeed = 500;
var game = [];
var player = [];
var score = 0;

// Sounds
var yellowSound = new Audio("beep1.ogg");
var blueSound   = new Audio("beep2.ogg");
var redSound    = new Audio("beep3.ogg");
var greenSound  = new Audio("beep4.ogg");

// Colors
var yellow       = "rgb(155,155,0)";
var blue         = "rgb(0,0,155)";
var red          = "rgb(155,0,0)";
var green        = "rgb(0,155,0)";
var brightYellow = "rgb(255,255,0)";
var brightBlue   = "rgb(0,0,255)";
var brightRed    = "rgb(255,0,0)";
var brightGreen  = "rgb(0,255,0)";
var white        = "rgb(255,255,255)";
var black        = "rgb(0,0,0)";

// Helper Object
var boxes = {
    yellow: [$yellowBox, yellow, brightYellow, yellowSound],
    blue:   [$blueBox, blue, brightBlue, blueSound],
    red:    [$redBox, red, brightRed, redSound],
    green:  [$greenBox, green, brightGreen, greenSound]
};

// Helper Functions
function flashColor(box) {
    box[0].style.backgroundColor = box[2];
    setTimeout(function() {
        box[0].style.backgroundColor = box[1];
        box[3].play();
    }, flashSpeed);
}

function flashYellow() { flashColor(boxes.yellow); }
function flashBlue() { flashColor(boxes.blue); }
function flashRed() { flashColor(boxes.red); }
function flashGreen() { flashColor(boxes.green); }

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max-min)) + min;
}

function changeBackgroundColor() {
    var rValue = getRandomInt(0, 256);
    var gValue = getRandomInt(0, 256);
    var bValue = getRandomInt(0, 256);
    $body.style.backgroundColor = "rgb(" + rValue + "," + gValue + "," + bValue + ")";
}

function playPattern() {
    var i = 0;
    var interval = setInterval(function() {
        flashColor(boxes[game[i]]);
        i++;
        if (i >= game.length) {
            clearInterval(interval);
        }
    }, 600);
}

function randomColor() {
    var colors = ["red", "yellow", "blue", "green"];
    return colors[Math.floor(Math.random()*4)];
}

// Gameplay functions
function startRound() {
    game.push(randomColor());
    playPattern();
    player = game.slice(0);
    boxes.yellow[0].addEventListener("click", flashYellow);
    boxes.blue[0].addEventListener("click", flashBlue);
    boxes.red[0].addEventListener("click", flashRed);
    boxes.green[0].addEventListener("click", flashGreen);
    boxes.yellow[0].addEventListener("click", checkInput);
    boxes.blue[0].addEventListener("click", checkInput);
    boxes.red[0].addEventListener("click", checkInput);
    boxes.green[0].addEventListener("click", checkInput);
    $startBtn.disabled = true;
}

function checkInput(evt) {
    var actualResponse = player.shift();
    var inputResponse = evt.target.id;

    if (player.length === 0 && actualResponse === inputResponse) {
        setTimeout(changeBackgroundColor, 1000);
        setTimeout(startRound, 1000);
        score += 1;
        $scoreText.textContent = score;
    } else if (actualResponse !== inputResponse && game.length > 0) {
        setTimeout(function() {
            alert("Game Over!");
        }, 1000);
        game = [];
        score = 0;
        $scoreText.textContent = score;
        $body.style.backgroundColor = "rgb(0,0,0)";
        boxes.yellow[0].removeEventListener("click", flashYellow);
        boxes.blue[0].removeEventListener("click", flashBlue);
        boxes.red[0].removeEventListener("click", flashRed);
        boxes.green[0].removeEventListener("click", flashGreen);
        $startBtn.disabled = false;
    } else {
        return;
    }
}

$startBtn.addEventListener("click", startRound);
