const player = document.getElementById("player");
const pembatas = document.querySelector(".pembatas");
let x = 0;
let y = 0;
const speed = 2;
let moveRight = false;
let moveLeft = false;
let moveUp = false;
let moveDown = false;

document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowRight":
    case "d":
    case "D":
      moveRight = true;
      player.style.transform = "scaleX(-1)";
      break;
    case "ArrowLeft":
    case "a":
    case "A":
      moveLeft = true;
      player.style.transform = "scaleX(1)";
      break;
    case "ArrowUp":
    case "w":
    case "W":
      moveUp = true;
      break;
    case "ArrowDown":
    case "s":
    case "S":
      moveDown = true;
      break;
  }
});

document.addEventListener("keyup", (e) => {
  switch (e.key) {
    case "ArrowRight":
    case "d":
    case "D":
      moveRight = false;
      break;
    case "ArrowLeft":
    case "a":
    case "A":
      moveLeft = false;
      break;
    case "ArrowUp":
    case "w":
    case "W":
      moveUp = false;
      break;
    case "ArrowDown":
    case "s":
    case "S":
      moveDown = false;
      break;
  }
});

function updatePosition() {
  const pembatasRect = pembatas.getBoundingClientRect();
  const playerRect = player.getBoundingClientRect();
  const relativeX = x + speed;
  const relativeY = y + speed;

  if (moveRight && relativeX + playerRect.width <= pembatasRect.width) {
    x += speed;
  }
  if (moveLeft && x - speed >= 0) {
    x -= speed;
  }
  if (moveUp && y - speed >= 0) {
    y -= speed;
  }
  if (moveDown && relativeY + playerRect.height <= pembatasRect.height) {
    y += speed;
  }

  const pembatasHeight = pembatas.offsetHeight;

  // Batasi posisi Y agar tidak keluar dari area pembatas
  if (y >= 0 && y <= pembatasHeight - player.offsetHeight) {
    player.style.top = y + "px";
  }

  player.style.left = x + "px";

  requestAnimationFrame(updatePosition);
}

// Inisialisasi posisi awal
document.addEventListener("DOMContentLoaded", () => {
  x = window.innerWidth / 2 - player.offsetWidth / 2;
  y = window.innerHeight / 2 - player.offsetHeight / 2;
  player.style.left = x + "px";
  player.style.top = y + "px";
  updatePosition();
});
