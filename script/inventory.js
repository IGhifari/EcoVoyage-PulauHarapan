// Inisialisasi nilai awal jika belum ada di localStorage
if (!localStorage.getItem("woodCount")) {
  localStorage.setItem("woodCount", "4");
}
if (!localStorage.getItem("seedCount")) {
  localStorage.setItem("seedCount", "4");
}
if (!localStorage.getItem("blueprintCount")) {
  localStorage.setItem("blueprintCount", "0");
}

// Fungsi untuk memperbarui tampilan inventory
function updateInventoryDisplay() {
  const woodCount = localStorage.getItem("woodCount") || "0";
  const seedCount = localStorage.getItem("seedCount") || "4";
  const solarPanelCount = localStorage.getItem("solarPanelCount") || "0";
  const blueprintCount = localStorage.getItem("blueprintCount") || "0";

  if (document.getElementById("woodCount")) {
    document.getElementById("woodCount").textContent = woodCount;
  }
  if (document.getElementById("seedCount")) {
    document.getElementById("seedCount").textContent = seedCount;
  }
  if (document.getElementById("solarPanelCount")) {
    document.getElementById("solarPanelCount").textContent = solarPanelCount;
  }
  if (document.getElementById("blueprintCount")) {
    document.getElementById("blueprintCount").textContent = blueprintCount;
  }
}

// Panggil updateInventoryDisplay saat halaman dimuat
document.addEventListener("DOMContentLoaded", updateInventoryDisplay);

// Fungsi untuk menambah resource (hanya digunakan di kebun.html)
function addResources() {
  let woodCount = parseInt(localStorage.getItem("woodCount"));
  let seedCount = parseInt(localStorage.getItem("seedCount"));

  // Cek apakah masih cukup resource untuk dikurangi
  if (woodCount >= 4 && seedCount >= 4) {
    woodCount += 4;
    seedCount += 4;

    localStorage.setItem("woodCount", woodCount.toString());
    localStorage.setItem("seedCount", seedCount.toString());

    updateInventoryDisplay();
  } else {
    alert("Resource tidak cukup! Diperlukan minimal 4 kayu dan 4 benih.");
  }
}
