var color = ["red","blue","green","yellow"];

var gamePattern = [];
var playerClickData = [];

var start = false;
var level = 0;

$(document).keydown(function(){
  if (start === false){
    $("h1").text("level " + level);
    gameProcess();
    start = true;
  }
})

$(".square").click(function() {

  var userChosenColour = $(this).attr("id");
  playerClickData.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);
  console.log("click"+playerClickData);
  console.log("click"+gamePattern);
  checkAnswer(playerClickData.length-1);
});

function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === playerClickData[currentLevel]) {
    console.log("testing" + currentLevel);
    if (playerClickData.length === gamePattern.length){
      setTimeout(function () {
        gameProcess();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("gameOver");
    $("h1").text("Game Over, Press Any Key to Restart");

    setTimeout(function () {
      $("body").removeClass("gameOver");
    }, 200);

    startOver();
  }
}

function gameProcess(){
  playerClickData = [];
  level++;
  $("h1").text("level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = color[randomNumber];
  gamePattern.push(randomChosenColour);
  $("." + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  console.log("gameProcess"+playerClickData);
  console.log("gameProcess"+gamePattern);
}

function playSound(name) {
  var audio = new Audio(name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("." + currentColor).addClass("pressed");
  setTimeout(function () {
    $("." + currentColor).removeClass("pressed");
  }, 100);
}

function startOver() {
  level = 0;
  gamePattern = [];
  start = false;
}
