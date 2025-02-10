const player = document.getElementById("player");
const pembatas = document.querySelector(".pembatas");
let x = 0;
let y = 0;
const speed = 5;
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
      break;
    case "ArrowLeft":
    case "a":
    case "A":
      moveLeft = true;
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
    player.style.transform = "scaleX(-1)";
  }
  if (moveLeft && x - speed >= 0) {
    x -= speed;
    player.style.transform = "scaleX(1)";
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

  // Add button visibility check
  checkButtonProximity();

  requestAnimationFrame(updatePosition);
}

function checkButtonProximity() {
  const btnKebun = document.querySelector('.buttonKebun');
  const btnCraft = document.querySelector('.buttonCraft');
  const btnRumah = document.querySelector('.buttonRumah');
  const playerRect = player.getBoundingClientRect();
  const proximityThreshold = 150; // Jarak dalam pixel

  // Set button positions
  btnKebun.style.left = '20%';
  btnKebun.style.bottom = '20%';
  btnCraft.style.left = '50%';
  btnCraft.style.bottom = '20%';
  btnRumah.style.right = '20%';
  btnRumah.style.bottom = '20%';

  // Get button positions
  const kebunRect = btnKebun.getBoundingClientRect();
  const craftRect = btnCraft.getBoundingClientRect();
  const rumahRect = btnRumah.getBoundingClientRect();

  // Calculate distances
  const distanceToKebun = Math.hypot(
    playerRect.left - kebunRect.left,
    playerRect.top - kebunRect.top
  );
  const distanceToCraft = Math.hypot(
    playerRect.left - craftRect.left,
    playerRect.top - craftRect.top
  );
  const distanceToRumah = Math.hypot(
    playerRect.left - rumahRect.left,
    playerRect.top - rumahRect.top
  );

  // Show/hide buttons based on proximity
  btnKebun.classList.toggle('visible', distanceToKebun < proximityThreshold);
  btnCraft.classList.toggle('visible', distanceToCraft < proximityThreshold);
  btnRumah.classList.toggle('visible', distanceToRumah < proximityThreshold);
}

updatePosition();
