const player = document.getElementById("player");
const pembatas = document.querySelector(".pembatas");

let x = 100; // Mulai dari posisi default
let y = 0;
const speed = 2;
let moveRight = false;
let moveLeft = false;
let moveUp = false;
let moveDown = false;

// Event Listener untuk menangkap tombol ditekan
document.addEventListener("keydown", (e) => {
  switch (e.key.toLowerCase()) {
    case "arrowright":
    case "d":
      moveRight = true;
      break;
    case "arrowleft":
    case "a":
      moveLeft = true;
      break;
    case "arrowup":
    case "w":
      moveUp = true;
      break;
    case "arrowdown":
    case "s":
      moveDown = true;
      break;
  }
});

// Event Listener untuk menangkap tombol dilepas
document.addEventListener("keyup", (e) => {
  switch (e.key.toLowerCase()) {
    case "arrowright":
    case "d":
      moveRight = false;
      break;
    case "arrowleft":
    case "a":
      moveLeft = false;
      break;
    case "arrowup":
    case "w":
      moveUp = false;
      break;
    case "arrowdown":
    case "s":
      moveDown = false;
      break;
  }
});

// Fungsi untuk memperbarui posisi pemain
function updatePosition() {
  const pembatasRect = pembatas.getBoundingClientRect();
  const playerRect = player.getBoundingClientRect();

  // Cek batas agar karakter tidak keluar dari area pembatas
  if (moveRight && playerRect.right + speed < pembatasRect.right) {
    x += speed;
    player.style.transform = "scaleX(-1)"; // Menghadap ke kanan
  }
  if (moveLeft && playerRect.left - speed > pembatasRect.left) {
    x -= speed;
    player.style.transform = "scaleX(1)"; // Menghadap ke kiri
  }
  if (moveUp && playerRect.top - speed > pembatasRect.top) {
    y -= speed;
  }
  if (moveDown && playerRect.bottom + speed < pembatasRect.bottom) {
    y += speed;
  }

  // Update posisi di layar
  player.style.left = x + "px";
  player.style.top = y + "px";

  checkButtonProximity();
  requestAnimationFrame(updatePosition); // Jalankan terus fungsi updatePosition
}

// Jalankan fungsi update posisi
updatePosition();

function checkButtonProximity() {
  const player = document.querySelector('.player');
  const garden2Btn = document.querySelector('.kebun2');
  
  if (!player || !garden2Btn) return;
  
  const garden2Unlocked = localStorage.getItem("garden2Unlocked") === "true";
  
  if (!garden2Unlocked) return;

  const playerRect = player.getBoundingClientRect();
  const btnRect = garden2Btn.getBoundingClientRect();
  
  const distance = Math.hypot(
      (playerRect.left + playerRect.width/2) - (btnRect.left + btnRect.width/2),
      (playerRect.top + playerRect.height/2) - (btnRect.top + btnRect.height/2)
  );

  const proximityThreshold = 200;
  
  if (distance < proximityThreshold) {
      garden2Btn.classList.add('visible');
  } else {
      garden2Btn.classList.remove('visible');
  }
}
