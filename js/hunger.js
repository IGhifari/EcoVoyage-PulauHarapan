// Konstanta untuk sistem hunger
const HUNGER_INTERVAL = 600000; // 10 menit
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
      resetHungerSystem();
      window.location.href = "index.html";
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

// Inisialisasi saat halaman dimuat
document.addEventListener("DOMContentLoaded", initHungerSystem);
