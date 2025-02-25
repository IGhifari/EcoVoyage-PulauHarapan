// Konstanta untuk sistem hunger
const HUNGER_INTERVAL = 600000; // 10 menit
const HUNGER_WARNING_TIME = 480000; // 8 menit
let hungerInterval;

// Daftar halaman yang menggunakan sistem hunger
const HUNGER_PAGES = ["game.html", "kebun.html", "kebun2.html", "kolam.html", "kapal.html", "dalamkapal.html", "craft.html", "rumah.html", "dalamrumah.html", "prolog3.html "];

// Inisialisasi sistem hunger
function initHungerSystem() {
  // Cek apakah halaman saat ini menggunakan sistem hunger
  const currentPage = window.location.pathname.split("/").pop();
  if (!HUNGER_PAGES.includes(currentPage)) {
    pauseHungerSystem();
    return;
  }

  if (!localStorage.getItem("lastFedTime")) {
    resetHungerSystem();
  } else {
    resumeHungerSystem();
  }

  // Pastikan interval dibersihkan sebelum membuat yang baru
  if (hungerInterval) {
    clearInterval(hungerInterval);
  }

  startHungerTimer();
}

// Fungsi untuk pause sistem hunger
function pauseHungerSystem() {
  if (hungerInterval) {
    clearInterval(hungerInterval);
  }
  // Simpan waktu saat sistem di-pause
  localStorage.setItem("pausedTime", Date.now().toString());
}

// Fungsi untuk resume sistem hunger
function resumeHungerSystem() {
  const pausedTime = parseInt(localStorage.getItem("pausedTime"));
  const lastFedTime = parseInt(localStorage.getItem("lastFedTime"));

  if (pausedTime && lastFedTime) {
    // Hitung berapa lama sistem di-pause
    const pauseDuration = Date.now() - pausedTime;
    // Update lastFedTime dengan menambahkan durasi pause
    localStorage.setItem("lastFedTime", (lastFedTime + pauseDuration).toString());
    localStorage.removeItem("pausedTime");
  }
}

// Reset sistem hunger
function resetHungerSystem() {
  localStorage.setItem("lastFedTime", Date.now().toString());
  localStorage.setItem("foodCount", "0");
  localStorage.removeItem("hungerWarningShown");
  localStorage.removeItem("pageHiddenTime");

  // Reset hunger timer jika ada
  const hungerTimer = document.getElementById("hungerTimer");
  if (hungerTimer) {
    hungerTimer.style.width = "100%";
    hungerTimer.style.backgroundColor = "#27ae60";
  }

  // Bersihkan interval yang sedang berjalan
  if (hungerInterval) {
    clearInterval(hungerInterval);
  }
}

// Update timer kelaparan
function updateHungerTimer() {
  const currentPage = window.location.pathname.split("/").pop();
  if (!HUNGER_PAGES.includes(currentPage)) {
    return; // Jangan update timer jika bukan di halaman yang ditentukan
  }

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
  // Reset hunger system terlebih dahulu
  resetHungerSystem();

  // Reset inventory ke nilai awal
  localStorage.setItem("woodCount", "100");
  localStorage.setItem("seedCount", "4");
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

  // Reset quest filtrasi air
  localStorage.removeItem("waterFilterBuilt");
  localStorage.removeItem("filterFirstTimeMessage");

  // Reset progress bar untuk semua quest
  const progressBars = ["shipProgress", "solarProgress", "houseProgress", "engineProgress", "garden2Progress", "waterFilterProgress"];

  progressBars.forEach((progressId) => {
    const progressBar = document.getElementById(progressId);
    if (progressBar) {
      progressBar.style.width = "0%";
    }
  });

  // Reset status quest yang tersembunyi
  const questsToHide = ["engineQuest", "garden2Quest"];

  questsToHide.forEach((questId) => {
    const quest = document.getElementById(questId);
    if (quest) {
      quest.style.display = "none";
    }
  });

  // Reset tombol craft dan status quest
  const questItems = document.querySelectorAll(".quest-item");
  questItems.forEach((item) => {
    item.classList.remove("completed");
    const craftBtn = item.querySelector(".craft-btn");
    if (craftBtn) {
      craftBtn.disabled = false;
      craftBtn.textContent = "Craft";
    }
  });

  alert("Yanto telah pingsan! Semua quest telah direset. Silakan mulai kembali dari awal.");
  window.location.href = "halamanAwal.html";
}

// Update fungsi resetFromStartPage
function resetFromStartPage() {
  // Reset hunger system
  resetHungerSystem();

  // Pastikan timer kelaparan kembali penuh
  const hungerTimer = document.getElementById("hungerTimer");
  if (hungerTimer) {
    hungerTimer.style.width = "100%";
    hungerTimer.style.backgroundColor = "#27ae60";
  }

  // Bersihkan interval yang sedang berjalan
  if (hungerInterval) {
    clearInterval(hungerInterval);
  }

  // Set ulang waktu makan terakhir ke waktu saat ini
  localStorage.setItem("lastFedTime", Date.now().toString());

  // Reset semua data game seperti di resetGame
  localStorage.setItem("woodCount", "100");
  localStorage.setItem("seedCount", "4");
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
  localStorage.removeItem("waterFilterBuilt");
  localStorage.removeItem("filterFirstTimeMessage");

  // Hapus semua status hunger
  localStorage.removeItem("hungerWarningShown");
  localStorage.removeItem("pageHiddenTime");
  localStorage.removeItem("pondDirtyShown");

  alert("Game telah direset! Silakan mulai petualangan baru.");
  window.location.reload();
}

// Export fungsi untuk digunakan di halaman awal
window.resetFromStartPage = resetFromStartPage;

// Modifikasi event listener
document.addEventListener("DOMContentLoaded", () => {
  const currentPage = window.location.pathname.split("/").pop();
  if (HUNGER_PAGES.includes(currentPage)) {
    initHungerSystem();
  }
});

// Modifikasi event listener untuk page visibility
document.addEventListener("visibilitychange", () => {
  const currentPage = window.location.pathname.split("/").pop();

  if (HUNGER_PAGES.includes(currentPage)) {
    if (document.hidden) {
      pauseHungerSystem();
    } else {
      resumeHungerSystem();
      startHungerTimer();
    }
  }
});

// Modifikasi event listener untuk page load
window.addEventListener("beforeunload", () => {
  const currentPage = window.location.pathname.split("/").pop();
  if (HUNGER_PAGES.includes(currentPage)) {
    pauseHungerSystem();
  }
});
