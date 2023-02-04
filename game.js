// Define global variables
let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = []; // array to store the pattern of colours that the game generates
let userClickedPattern = []; // array to store the pattern of colours that the user clicks on
let gameStarted = false; // flag to track if the game has started
let level = 0; // the current level of the game

// Event handler for button clicks
$(".btn").click(function() {
  // Get the color of the button that was clicked
  let userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  // Play the sound and animate the button press
  playSound(userChosenColour);
  animatePress(userChosenColour);

  // Check if the answer is correct
  checkAnswer(userClickedPattern.length - 1);
});

// Generates the next sequence of colors
function nextSequence() {
  level++;

  // Pick a random color from the buttonColours array
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  // Animate the selected color
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

  // Update the level display
  $("h1").text("Level " + level);
};

// Play a sound when a color is clicked or generated
function playSound(name) {
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// Animate a button press
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

// Start the game when a key is pressed
$(document).keypress(function() {
  if (!gameStarted) {
    gameStarted = true;
    $("h1").text("Level 0");
    nextSequence();
  }
});

// Check if the user's answer is correct
function checkAnswer(currentLevel) {
  // Compare the current color in the game pattern to the current color in the user's pattern
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    // If the entire pattern has been matched
    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function () {
        nextSequence();
      }, 1000);

      // Clear the user's pattern and start the next sequence
      userClickedPattern = [];
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
    userClickedPattern = [];
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  gameStarted = false;
}
