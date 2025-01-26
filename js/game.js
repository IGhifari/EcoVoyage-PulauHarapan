let woodCount = 0;
let seedCount = 0;
const player = document.getElementById("player");
const tree = document.getElementById("tree");
const cutButton = document.getElementById("cutButton");
const woodDisplay = document.getElementById("woodCount");
const seedDisplay = document.getElementById("seedCount");

// Posisi awal player
let playerX = 0;
let playerY = 0;
const MOVE_SPEED = 5;

// Object untuk melacak tombol yang sedang ditekan
const keys = {
  w: false,
  a: false,
  s: false,
  d: false,
};

// Event listener untuk tombol ditekan
document.addEventListener("keydown", (e) => {
  switch (e.key.toLowerCase()) {
    case "w":
      keys.w = true;
      break;
    case "a":
      keys.a = true;
      break;
    case "s":
      keys.s = true;
      break;
    case "d":
      keys.d = true;
      break;
  }
});

// Event listener untuk tombol dilepas
document.addEventListener("keyup", (e) => {
  switch (e.key.toLowerCase()) {
    case "w":
      keys.w = false;
      break;
    case "a":
      keys.a = false;
      break;
    case "s":
      keys.s = false;
      break;
    case "d":
      keys.d = false;
      break;
  }
});

// Fungsi untuk menggerakkan player
function movePlayer() {
  if (keys.w) {
    playerY -= MOVE_SPEED;
  }
  if (keys.s) {
    playerY += MOVE_SPEED;
  }
  if (keys.a) {
    playerX -= MOVE_SPEED;
    player.style.transform = "scaleX(-1)"; // Menghadap kiri
  }
  if (keys.d) {
    playerX += MOVE_SPEED;
    player.style.transform = "scaleX(1)"; // Menghadap kanan
  }

  // Batasi area pergerakan
  playerX = Math.max(0, Math.min(window.innerWidth - player.offsetWidth, playerX));
  playerY = Math.max(0, Math.min(window.innerHeight - player.offsetHeight, playerY));

  // Update posisi player
  player.style.left = playerX + "px";
  player.style.top = playerY + "px";

  // Periksa jarak dengan pohon setiap kali bergerak
  checkDistance();

  // Panggil fungsi ini lagi di frame berikutnya
  requestAnimationFrame(movePlayer);
}

// Mulai animasi pergerakan
movePlayer();

// Fungsi untuk mengecek jarak antara player dan pohon
function checkDistance() {
  const playerRect = player.getBoundingClientRect();
  const treeRect = tree.getBoundingClientRect();

  const distance = Math.sqrt(Math.pow(playerRect.left - treeRect.left, 2) + Math.pow(playerRect.top - treeRect.top, 2));

  // Jika player dalam jarak 100px dari pohon
  if (distance < 100 && tree.style.display !== "none") {
    cutButton.style.display = "block";
    cutButton.style.left = treeRect.left + "px";
    cutButton.style.top = treeRect.top - 40 + "px";
  } else {
    cutButton.style.display = "none";
  }
}

// Panggil checkDistance setiap kali player bergerak
document.addEventListener("keydown", checkDistance);
document.addEventListener("keyup", checkDistance);

// Fungsi untuk menebang pohon
cutButton.addEventListener("click", () => {
  // Tambah resource
  woodCount += 5;
  seedCount += 3;

  // Update tampilan
  woodDisplay.textContent = woodCount;
  seedDisplay.textContent = seedCount;

  // Hilangkan pohon
  tree.style.display = "none";
  cutButton.style.display = "none";

  // Tampilkan notifikasi
  alert("Kamu mendapatkan:\n5 Kayu\n3 Benih Pohon");
});
