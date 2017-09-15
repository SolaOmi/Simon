function flashYellow() {
    $("#yellow").css("background-color", "rgb(255,255,0)");
    setTimeout(function() {
        $("#yellow").css("background-color", "rgb(155,155,0)");
    }, 1000);
};

function flashBlue() {
    $("#blue").css("background-color", "rgb(0,0,255)");
    setTimeout(function() {
        $("#blue").css("background-color", "rgb(0,0,155)");
    }, 1000);
};

function flashRed() {
    $("#red").css("background-color", "rgb(255,0,0)");
    setTimeout(function() {
        $("#red").css("background-color", "rgb(155,0,0)");
    }, 1000);
};

function flashGreen() {
    $("#green").css("background-color", "rgb(0,255,0)");
    setTimeout(function() {
        $("#green").css("background-color", "rgb(0,155,0)");
    }, 1000);
};


$("#yellow").click(flashYellow);
$("#blue").click(flashBlue);
$("#red").click(flashRed);
$("#green").click(flashGreen);
