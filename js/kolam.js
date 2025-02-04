// Tambahkan variabel untuk tracking ikan
let fishElements = [];
const MAX_FISH = 20; // Maksimum jumlah ikan di kolam

// Tambahkan variabel untuk tracking kebersihan kolam
let isClean = true;
let cleaningTimer;
const CLEANING_INTERVAL = 300000; // 5 menit
const DIRTY_WARNING_TIME = 60000 * 4; // 4 menit (1 menit sebelum kotor)

// Tambahkan fungsi untuk menyimpan status ikan
function saveFishState() {
  const fishState = {
    count: fishElements.length,
    positions: fishElements.map((fish) => ({
      top: fish.style.top,
      scale: fish.style.transform,
    })),
  };
  localStorage.setItem("fishState", JSON.stringify(fishState));
}

// Fungsi untuk memuat status ikan
function loadFishState() {
  const fishState = localStorage.getItem("fishState");
  if (fishState) {
    const state = JSON.parse(fishState);
    fishElements = [];
    const container = document.getElementById("fishContainer");
    container.innerHTML = ""; // Bersihkan container

    // Buat ikan sesuai state yang tersimpan
    state.positions.forEach((pos) => {
      const fish = document.createElement("div");
      fish.className = "fish";
      fish.style.top = pos.top;
      fish.style.transform = pos.scale;
      container.appendChild(fish);
      fishElements.push(fish);

      // Tambahkan event listener untuk menangkap ikan
      fish.addEventListener("click", () => {
        fish.remove();
        fishElements = fishElements.filter((f) => f !== fish);
        saveFishState();
      });
    });
  } else {
    // Jika belum ada state, buat 5 ikan awal
    for (let i = 0; i < 5; i++) {
      createFish();
    }
  }
}

function createFish() {
  if (fishElements.length >= MAX_FISH) return; // Batasi jumlah ikan

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
    saveFishState();
  });

  saveFishState();
}

function reproduceFish() {
  if (!isClean) return; // Tidak berkembang biak jika kolam kotor

  // Hanya berkembang biak jika jumlah ikan < maksimum
  if (fishElements.length < MAX_FISH) {
    const newFishCount = Math.min(
      Math.floor(fishElements.length / 2), // Setengah dari jumlah ikan saat ini
      MAX_FISH - fishElements.length // Atau sisa kapasitas kolam
    );

    for (let i = 0; i < newFishCount; i++) {
      createFish();
    }
  }
}

// Inisialisasi sistem kebersihan kolam
function initCleaningSystem() {
  if (!localStorage.getItem("lastCleanedTime")) {
    resetCleaningSystem();
  }

  // Pastikan interval dibersihkan sebelum membuat yang baru
  if (cleaningTimer) {
    clearInterval(cleaningTimer);
  }

  startCleaningTimer();
}

// Reset sistem kebersihan
function resetCleaningSystem() {
  localStorage.setItem("lastCleanedTime", Date.now().toString());
  localStorage.removeItem("cleaningWarningShown");
  isClean = true;
  showFish(true);
}

// Update timer kebersihan
function updateCleaningTimer() {
  const lastCleanedTime = parseInt(localStorage.getItem("lastCleanedTime"));
  const currentTime = Date.now();
  const timeElapsed = currentTime - lastCleanedTime;
  const timeLeft = Math.max(0, CLEANING_INTERVAL - timeElapsed);

  const cleanTimer = document.getElementById("cleanTimer");
  if (cleanTimer) {
    const percentage = (timeLeft / CLEANING_INTERVAL) * 100;
    cleanTimer.style.width = `${percentage}%`;

    // Ubah warna berdasarkan waktu tersisa
    if (timeLeft <= 120000) {
      // 2 menit terakhir
      cleanTimer.style.backgroundColor = "#e74c3c";
      if (!localStorage.getItem("cleaningWarningShown")) {
        alert("Kolam mulai kotor! Bersihkan segera sebelum ikan-ikan bersembunyi!");
        localStorage.setItem("cleaningWarningShown", "true");
      }
    } else if (timeLeft <= 180000) {
      // 3 menit terakhir
      cleanTimer.style.backgroundColor = "#f1c40f";
    } else {
      cleanTimer.style.backgroundColor = "#2ecc71";
    }

    // Cek apakah waktu habis
    if (timeLeft <= 0) {
      isClean = false;
      showFish(false);
      if (!localStorage.getItem("pondDirtyShown")) {
        alert("Kolam sudah kotor! Ikan-ikan bersembunyi. Bersihkan kolam untuk memunculkan ikan kembali.");
        localStorage.setItem("pondDirtyShown", "true");
      }
    }
  }
}

// Mulai timer kebersihan
function startCleaningTimer() {
  clearInterval(cleaningTimer);
  localStorage.removeItem("cleaningWarningShown");
  localStorage.removeItem("pondDirtyShown");

  // Update timer setiap detik
  cleaningTimer = setInterval(() => {
    const cleanTimer = document.getElementById("cleanTimer");
    if (cleanTimer) {
      updateCleaningTimer();
    } else {
      // Jika elemen timer tidak ditemukan, bersihkan interval
      clearInterval(cleaningTimer);
    }
  }, 1000);

  // Update pertama kali
  updateCleaningTimer();
}

function showFish(show) {
  const fishContainer = document.getElementById("fishContainer");
  if (show) {
    fishContainer.style.opacity = "1";
    fishContainer.style.filter = "none";
    // Jika kolam bersih dan tidak ada ikan, mulai dengan 5 ikan
    if (fishElements.length === 0) {
      for (let i = 0; i < 5; i++) {
        createFish();
      }
    }
  } else {
    fishContainer.style.opacity = "0.3";
    fishContainer.style.filter = "brightness(0.5)";
  }
}

// Inisialisasi kolam
document.addEventListener("DOMContentLoaded", function () {
  // Muat status ikan yang tersimpan
  loadFishState();

  // Mulai reproduksi setiap 1 menit
  setInterval(() => {
    if (isClean && fishElements.length < MAX_FISH) {
      reproduceFish();
    }
  }, 60000);

  // Inisialisasi sistem kebersihan kolam
  initCleaningSystem();

  // Update tampilan berdasarkan status kebersihan
  const lastCleanedTime = parseInt(localStorage.getItem("lastCleanedTime"));
  const currentTime = Date.now();
  const timeElapsed = currentTime - lastCleanedTime;

  if (timeElapsed >= CLEANING_INTERVAL) {
    isClean = false;
    showFish(false);
  } else {
    isClean = true;
    showFish(true);
  }

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
  saveFishState(); // Simpan perubahan status ikan

  // Update inventory
  const currentFishCount = parseInt(localStorage.getItem("fishCount") || "0");
  const newFishCount = currentFishCount + randomFish;

  localStorage.setItem("fishCount", newFishCount.toString());
  updateInventoryDisplay();

  alert(`Kamu mendapatkan ${randomFish} ikan!`);
}

// Update fungsi cleanWater
function cleanWater() {
  const cleaningTime = 3000; // 3 detik
  const cleanBtn = document.querySelector(".clean-btn");

  cleanBtn.disabled = true;
  cleanBtn.textContent = "Membersihkan...";

  setTimeout(() => {
    cleanBtn.disabled = false;
    cleanBtn.textContent = "Bersihkan Air";
    resetCleaningSystem();
    alert("Air kolam telah dibersihkan!");
  }, cleaningTime);
}

// Update inventory display
function updateInventoryDisplay() {
  const currentFishCount = parseInt(localStorage.getItem("fishCount") || "0");
  document.getElementById("fishCount").textContent = currentFishCount.toString();
}
