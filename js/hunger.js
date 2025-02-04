// Konstanta untuk sistem hunger
const HUNGER_INTERVAL = 60000; // 10 menit
const HUNGER_WARNING_TIME = 480000; // 8 menit
let hungerInterval;

// Inisialisasi sistem hunger
function initHungerSystem() {
  if (!localStorage.getItem("lastFedTime")) {
    resetHungerSystem();
  }

  // Pastikan interval dibersihkan sebelum membuat yang baru
  if (hungerInterval) {
    clearInterval(hungerInterval);
  }

  startHungerTimer();
}

// Reset sistem hunger
function resetHungerSystem() {
  localStorage.setItem("lastFedTime", Date.now().toString());
  localStorage.setItem("foodCount", "0");
  localStorage.removeItem("hungerWarningShown");
}

// Update timer kelaparan
function updateHungerTimer() {
  const lastFedTime = parseInt(localStorage.getItem("lastFedTime"));
  const currentTime = Date.now();
  const timeElapsed = currentTime - lastFedTime;
  const timeLeft = Math.max(0, HUNGER_INTERVAL - timeElapsed);

  const hungerTimer = document.getElementById("hungerTimer");
  if (hungerTimer) {
    const percentage = (timeLeft / HUNGER_INTERVAL) * 100;
    hungerTimer.style.width = `${percentage}%`;

    // Ubah warna berdasarkan waktu tersisa
    if (timeLeft <= 120000) {
      // 2 menit terakhir
      hungerTimer.style.backgroundColor = "#e74c3c";
      if (!localStorage.getItem("hungerWarningShown")) {
        alert("Yanto kelaparan! Sisa waktu 2 menit sebelum pingsan!");
        localStorage.setItem("hungerWarningShown", "true");
      }
    } else if (timeLeft <= 180000) {
      // 3 menit terakhir
      hungerTimer.style.backgroundColor = "#f1c40f";
    } else {
      hungerTimer.style.backgroundColor = "#27ae60";
    }

    // Cek apakah waktu habis
    if (timeLeft <= 0) {
      clearInterval(hungerInterval);
      alert("Yanto pingsan karena kelaparan!");
      resetGame();
    }
  }
}

// Mulai timer kelaparan
function startHungerTimer() {
  clearInterval(hungerInterval);
  localStorage.removeItem("hungerWarningShown");

  // Update timer setiap detik
  hungerInterval = setInterval(() => {
    const hungerTimer = document.getElementById("hungerTimer");
    if (hungerTimer) {
      updateHungerTimer();
    } else {
      // Jika elemen timer tidak ditemukan, bersihkan interval
      clearInterval(hungerInterval);
    }
  }, 1000);

  // Update pertama kali
  updateHungerTimer();
}

// Fungsi untuk memberi makan Yanto
function feedYanto() {
  const foodCount = parseInt(localStorage.getItem("foodCount") || "0");
  if (foodCount > 0) {
    localStorage.setItem("foodCount", (foodCount - 1).toString());
    localStorage.setItem("lastFedTime", Date.now().toString());
    localStorage.removeItem("hungerWarningShown");
    startHungerTimer();
    alert("Yanto telah makan! Energi telah pulih.");
    updateInventoryDisplay();
  } else {
    alert("Tidak ada makanan! Perlu memasak terlebih dahulu.");
  }
}

// Fungsi untuk memasak makanan
function cookFood() {
  const fishCount = parseInt(localStorage.getItem("fishCount") || "0");
  if (fishCount >= 2) {
    localStorage.setItem("fishCount", (fishCount - 2).toString());
    const foodCount = parseInt(localStorage.getItem("foodCount") || "0");
    localStorage.setItem("foodCount", (foodCount + 1).toString());
    updateInventoryDisplay();
    alert("Berhasil memasak makanan! (2 Ikan → 1 Makanan)");
  } else {
    alert("Ikan tidak cukup! Diperlukan 2 ikan untuk memasak.");
  }
}

// Update fungsi resetGame
function resetGame() {
  // Reset hunger system
  resetHungerSystem();

  // Reset inventory ke nilai awal
  localStorage.setItem("woodCount", "100"); // Set ke nilai awal 100
  localStorage.setItem("seedCount", "4");   // Set ke nilai awal 4
  localStorage.setItem("solarPanelCount", "0");
  localStorage.setItem("fishCount", "0");
  localStorage.setItem("foodCount", "0");
  localStorage.setItem("blueprintCount", "0");

  // Reset semua quest
  localStorage.removeItem("shipBuilt");
  localStorage.removeItem("solarBuilt");
  localStorage.removeItem("houseBuilt");
  localStorage.removeItem("engineBuilt");
  localStorage.removeItem("garden2Unlocked");
  localStorage.removeItem("hasEnteredShip");
  localStorage.removeItem("stayedInIsland");

  // Reset progress bar untuk semua quest
  const progressBars = [
    "shipProgress",
    "solarProgress", 
    "houseProgress",
    "engineProgress",
    "garden2Progress"
  ];

  progressBars.forEach(progressId => {
    const progressBar = document.getElementById(progressId);
    if (progressBar) {
      progressBar.style.width = "0%";
    }
  });

  // Reset status quest yang tersembunyi
  const questsToHide = [
    "engineQuest",
    "garden2Quest"
  ];

  questsToHide.forEach(questId => {
    const quest = document.getElementById(questId);
    if (quest) {
      quest.style.display = "none";
    }
  });

  // Reset tombol craft
  const craftButtons = document.querySelectorAll(".craft-btn");
  craftButtons.forEach(btn => {
    if (btn) {
      btn.disabled = false;
      btn.textContent = btn.textContent.replace("Selesai", "Craft");
    }
  });

  alert("Yanto telah pingsan! Semua quest telah direset. Silakan mulai kembali dari awal.");
  window.location.href = "halamanAwal.html";
}

// Inisialisasi saat halaman dimuat
document.addEventListener("DOMContentLoaded", initHungerSystem);
