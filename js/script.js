// I borrowed the jquery $ syntax to differentiate between regular variables and
// DOM variables, but there is no jquery at all in this project.

// Game variables
var flashSpeed = 500;
var game = [];
var player = [];
var score = 0

// HTML elements
var $body  = document.getElementsByTagName("body")[0];
var $start = document.getElementById("start");
var $scoreText = document.getElementById("score");

// Boxes
var $yellowBox = document.getElementById("yellow");
var $blueBox   = document.getElementById("blue");
var $redBox    = document.getElementById("red");
var $greenBox  = document.getElementById("green");

// Sounds
// var yellowSound = document.getElementById("yellowSound");
// var blueSound   = document.getElementById("blueSound");
// var redSound    = document.getElementById("redSound");
// var greenSound  = document.getElementById("greenSound");

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

// Helper Functions

function flashYellow() {
    $yellowBox.style.backgroundColor = brightYellow;
    // yellowSound.play();
    setTimeout(function() {
        $yellowBox.style.backgroundColor = yellow;
    }, flashSpeed);
}

function flashBlue() {
    $blueBox.style.backgroundColor = brightBlue;
    // blueSound.play();
    setTimeout(function() {
        $blueBox.style.backgroundColor = blue;
    }, flashSpeed);
}

function flashRed() {
    $redBox.style.backgroundColor = brightRed;
    // redSound.play();
    setTimeout(function() {
        $redBox.style.backgroundColor = red;
    }, flashSpeed);
}

function flashGreen() {
    $greenBox.style.backgroundColor = brightGreen;
    // greenSound.play();
    setTimeout(function() {
        $greenBox.style.backgroundColor = green;
    }, flashSpeed);
}

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

function flash(color) {
  switch(color) {
    case "yellow":
      flashYellow();
      break;
    case "blue":
      flashBlue();
      break;
    case "red":
      flashRed();
      break;
    case "green":
      flashGreen();
      break;
  }
}

function playPattern() {
    var i = 0;
    var interval = setInterval(function() {
        flash(game[i]);
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
    $yellowBox.addEventListener("click", flashYellow);
    $blueBox.addEventListener("click", flashBlue);
    $redBox.addEventListener("click", flashRed);
    $greenBox.addEventListener("click", flashGreen);
    $yellowBox.addEventListener("click", checkInput);
    $blueBox.addEventListener("click", checkInput);
    $redBox.addEventListener("click", checkInput);
    $greenBox.addEventListener("click", checkInput);
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
        $yellowBox.removeEventListener("click", flashYellow);
        $blueBox.removeEventListener("click", flashBlue);
        $redBox.removeEventListener("click", flashRed);
        $greenBox.removeEventListener("click", flashGreen);
    } else {
        return;
    }
}

$start.addEventListener("click", startRound);
