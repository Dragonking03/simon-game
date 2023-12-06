var buttonColors=["red","blue","green","yellow"];

var gamePattern=[];
var userClickedpattern=[];
var started=false;
var level=0;

$(document).keypress(function() {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
})

function nextSequence(){
    userClickedpattern=[];
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
    audio.play();
    }

$(".btn").click(function(){
    var userChosenColor=$(this).attr("id");
    userClickedpattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedpattern.length-1);
})

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100);
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedpattern[currentLevel]){
        if(userClickedpattern.length===gamePattern.length){
        setTimeout(function(){
            nextSequence();
        },1000);
    }
}
    else{
        var wrong = new Audio("sounds/wrong.mp3");
        wrong.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text("Game Over, Press Any Key To Restart");
        startOver();
    }
}

function startOver(){
    gamePattern=[];
    userClickedpattern=[];
    level=0;
    started=false;
}