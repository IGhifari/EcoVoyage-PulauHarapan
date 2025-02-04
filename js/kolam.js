// Tambahkan variabel untuk tracking ikan
let fishElements = [];
const MAX_FISH = 20; // Maksimum jumlah ikan di kolam

// Tambahkan variabel untuk tracking kebersihan kolam
let isClean = true;
let cleanlinessTimer;
const CLEANING_INTERVAL = 60000 * 5; // 5 menit
const DIRTY_WARNING_TIME = 60000 * 4; // 4 menit (1 menit sebelum kotor)

function createFish() {
  const fish = document.createElement("div");
  fish.className = "fish";

  // Posisi random
  const randomTop = Math.random() * 60 + 10; // 10-70% dari tinggi container
  fish.style.top = `${randomTop}%`;

  // Ukuran random
  const randomScale = Math.random() * 0.5 + 0.8; // 0.8-1.3x ukuran normal
  fish.style.transform = `scale(${randomScale})`;

  document.getElementById("fishContainer").appendChild(fish);
  fishElements.push(fish);

  // Hapus ikan dari array saat dihapus dari DOM
  fish.addEventListener("click", () => {
    fish.remove();
    fishElements = fishElements.filter((f) => f !== fish);
  });
}

function reproduceFish() {
  if (!isClean) return; // Tidak berkembang biak jika kolam kotor

  // Hanya berkembang biak jika jumlah ikan < maksimum
  if (fishElements.length < MAX_FISH) {
    const newFishCount = Math.min(
      fishElements.length, // Jumlah ikan baru = jumlah ikan saat ini
      MAX_FISH - fishElements.length // Atau sisa kapasitas kolam
    );

    for (let i = 0; i < newFishCount; i++) {
      createFish();
    }
  }
}

function startCleanlinessTimer() {
  clearTimeout(cleanlinessTimer);
  isClean = true;
  showFish(true);

  // Reset clean timer bar
  const cleanTimer = document.getElementById("cleanTimer");
  cleanTimer.style.width = "100%";
  cleanTimer.style.background = "#2ecc71"; // Hijau

  // Total waktu dalam detik (5 menit = 300 detik)
  let timeLeft = 300;
  
  const interval = setInterval(() => {
    timeLeft--;
    const percentage = (timeLeft / 300) * 100;
    cleanTimer.style.width = percentage + "%";
    
    // Ubah warna berdasarkan waktu tersisa
    if (timeLeft <= 120) { // 2 menit terakhir
      cleanTimer.style.background = "#e74c3c"; // Merah
    } else if (timeLeft <= 180) { // 3 menit terakhir
      cleanTimer.style.background = "#f1c40f"; // Kuning
    }

    if (timeLeft === 0) {
      clearInterval(interval);
    }
  }, 1000); // Update setiap 1 detik

  // Timer untuk peringatan
  setTimeout(() => {
    if (isClean) {
      alert("Kolam akan kotor dalam 1 menit! Segera bersihkan kolam!");
    }
  }, DIRTY_WARNING_TIME);

  // Timer untuk kolam kotor
  cleanlinessTimer = setTimeout(() => {
    isClean = false;
    showFish(false);
    clearInterval(interval);
    alert("Kolam sudah kotor! Ikan-ikan bersembunyi. Bersihkan kolam untuk memunculkan ikan kembali.");
  }, CLEANING_INTERVAL);
}

function showFish(show) {
  const fishContainer = document.getElementById("fishContainer");
  if (show) {
    fishContainer.style.opacity = "1";
    fishContainer.style.filter = "none";
  } else {
    fishContainer.style.opacity = "0.3";
    fishContainer.style.filter = "brightness(0.5)";
  }
}

// Inisialisasi kolam
document.addEventListener("DOMContentLoaded", function () {
  // Buat 5 ikan awal
  for (let i = 0; i < 5; i++) {
    createFish();
  }

  // Mulai reproduksi setiap 1 menit
  setInterval(() => {
    if (isClean) {
      // Hanya berkembang biak jika kolam bersih
      reproduceFish();
    }
  }, 60000);

  // Mulai timer kebersihan
  startCleanlinessTimer();

  // Load saved fish count dan update inventory
  updateInventoryDisplay();

  // Tambahkan event listener untuk toggle inventory
  document.querySelector(".task-icon").addEventListener("click", function () {
    const inventory = document.getElementById("inventory");
    inventory.classList.toggle("show");
  });
});

// Update fungsi catchFish
function catchFish() {
  if (!isClean) {
    alert("Kolam terlalu kotor! Bersihkan kolam terlebih dahulu.");
    return;
  }

  if (fishElements.length === 0) {
    alert("Tidak ada ikan di kolam!");
    return;
  }

  const randomFish = Math.floor(Math.random() * 3) + 1; // Random 1-3 ikan
  const fishToRemove = Math.min(randomFish, fishElements.length);

  // Hapus ikan dari kolam
  for (let i = 0; i < fishToRemove; i++) {
    if (fishElements[i]) {
      fishElements[i].remove();
    }
  }
  fishElements = fishElements.slice(fishToRemove);

  // Update inventory
  const currentFishCount = parseInt(localStorage.getItem("fishCount") || "0");
  const newFishCount = currentFishCount + randomFish;

  localStorage.setItem("fishCount", newFishCount.toString());
  updateInventoryDisplay(); // Panggil fungsi untuk update tampilan

  alert(`Kamu mendapatkan ${randomFish} ikan!`);
}

function cleanWater() {
  const cleaningTime = 3000; // 3 detik
  const cleanBtn = document.querySelector(".clean-btn");

  cleanBtn.disabled = true;
  cleanBtn.textContent = "Membersihkan...";

  setTimeout(() => {
    cleanBtn.disabled = false;
    cleanBtn.textContent = "Bersihkan Air";
    alert("Air kolam telah dibersihkan!");
    startCleanlinessTimer(); // Mulai timer baru setelah dibersihkan
  }, cleaningTime);
}

// Update inventory display
function updateInventoryDisplay() {
  const currentFishCount = parseInt(localStorage.getItem("fishCount") || "0");
  document.getElementById("fishCount").textContent = currentFishCount.toString();
}
