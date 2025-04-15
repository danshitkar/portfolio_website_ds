const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreDisplay = document.getElementById("score");
let score = 0;

const bird = {
  x: 50,
  y: canvas.height / 2,
  radius: 20,
  velocity: 0,
  gravity: 0.5,
  jumpForce: -10,
  draw: function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = "yellow";
    ctx.fill();
    ctx.closePath();
  },
  update: function () {
    this.velocity += this.gravity;
    this.y += this.velocity;
  },
  jump: function () {
    this.velocity = this.jumpForce;
  },
};

let pipes = [];
const pipeWidth = 50;
const pipeGap = 150;
const pipeSpeed = 2;
const groundHeight = 50; // Height of the ground

let highScore = 0;
let leaderboard = [];

const startButton = document.getElementById("startButton");

function gameLoop(timestamp) {
  update(timestamp);
  draw();
  animationFrameId = requestAnimationFrame(gameLoop);
}

function update(timestamp) {
  bird.update();

  // Keep bird within bounds
  if (bird.y + bird.radius > canvas.height - groundHeight) {
    gameOver();
    return; // Stop further updates after game over
  }

  // Move pipes
  for (let i = 0; i < pipes.length; i++) {
    pipes[i].x -= pipeSpeed;

    // Check for collision with pipes
    if (
      bird.x + bird.radius > pipes[i].x &&
      bird.x - bird.radius < pipes[i].x + pipeWidth &&
      (bird.y - bird.radius < pipes[i].top ||
        bird.y + bird.radius > canvas.height - pipes[i].bottom - groundHeight)
    ) {
      gameOver();
      return; // Stop further updates after game over
    }

    // Increase score when bird passes a pipe
    if (!pipes[i].passed && bird.x > pipes[i].x + pipeWidth) {
      score++;
      scoreDisplay.textContent = `Score: ${score}`;
      pipes[i].passed = true;
    }

    // Remove off-screen pipes
    if (pipes[i].x < -pipeWidth) {
      pipes.splice(i, 1);
      i--;
    }
  }

  // Add new pipes periodically
  if (timestamp - lastPipeTime > 2000) {
    // Add a pipe every 2 seconds
    addPipe();
    lastPipeTime = timestamp;
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  bird.draw();
  for (const pipe of pipes) {
    drawPipe(pipe);
  }

  // Draw the ground
  ctx.fillStyle = "#654321"; // Brown color for the ground
  ctx.fillRect(0, canvas.height - groundHeight, canvas.width, groundHeight);
}

function drawPipe(pipe) {
  ctx.fillStyle = "green";
  // Top pipe
  ctx.fillRect(pipe.x, 0, pipeWidth, pipe.top);
  // Bottom pipe
  ctx.fillRect(
    pipe.x,
    canvas.height - pipe.bottom - groundHeight,
    pipeWidth,
    pipe.bottom
  );
}

function addPipe() {
  const topHeight = Math.random() * (canvas.height / 2) + 50;
  const bottomHeight = canvas.height - topHeight - pipeGap - groundHeight;
  pipes.push({
    x: canvas.width,
    top: topHeight,
    bottom: bottomHeight,
    passed: false,
  });
}

document.addEventListener("mousedown", () => {
  bird.jump();
});

document.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    bird.jump();
  }
});

let gameFrame = 0;
let lastPipeTime = 0;

function startGame() {
  bird.x = 50;
  bird.y = canvas.height / 2;
  bird.velocity = 0;
  score = 0;
  scoreDisplay.textContent = `Score: ${score}`;
  pipes = [];
  lastPipeTime = 0;
  gameFrame = 0;
  nameForm.style.display = "none"; // Hide the name form
  startButton.style.display = "none"; // Hide the start button
  animationFrameId = requestAnimationFrame(gameLoop);
}

function gameOver() {
  console.log("Game Over!");
  cancelAnimationFrame(animationFrameId); // Stop the game loop
  alert("Game Over! Your score: " + score); // Display a game over message
  updateHighScore(); // Check if the score is a new high score
  startButton.style.display = "block"; // Show the start button
}

// Update the high score and leaderboard
function updateHighScore() {
  if (score > highScore) {
    highScore = score;
    document.getElementById(
      "highScore"
    ).textContent = `High Score: ${highScore}`;
    document.getElementById("nameForm").style.display = "block"; // Show the name form
  }
}

// Submit the player's name and update the leaderboard
document
  .getElementById("nameForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const playerName = document.getElementById("playerName").value;
    leaderboard.push({ name: playerName, score: highScore });
    leaderboard.sort((a, b) => b.score - a.score); // Sort by score in descending order
    updateLeaderboard();
    document.getElementById("nameForm").style.display = "none"; // Hide the name form
    document.getElementById("playerName").value = ""; // Clear the input field
  });

// Update the leaderboard display
function updateLeaderboard() {
  const leaderboardList = document.getElementById("leaderboardList");
  leaderboardList.innerHTML = ""; // Clear the current leaderboard
  leaderboard.forEach((entry) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${entry.name}: ${entry.score}`;
    leaderboardList.appendChild(listItem);
  });
}

startButton.addEventListener("click", startGame);

let animationFrameId = requestAnimationFrame(gameLoop); // Start the game loop
