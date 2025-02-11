// Inisialisasi nilai awal hanya jika game baru dimulai
function initializeInventory() {
    // Check if this is first time running the game
    if (!localStorage.getItem("gameInitialized")) {
        localStorage.setItem("woodCount", "0");
        localStorage.setItem("seedCount", "4");
        localStorage.setItem("blueprintCount", "0");
        localStorage.setItem("solarPanelCount", "0");
        localStorage.setItem("fishCount", "0");
        localStorage.setItem("foodCount", "0");
        localStorage.setItem("gameInitialized", "true");
    }
}

// Fungsi untuk memperbarui tampilan inventory
function updateInventoryDisplay() {
  // Get values with default values if null/undefined
  const woodCount = parseInt(localStorage.getItem("woodCount")) || 0;
  const seedCount = parseInt(localStorage.getItem("seedCount")) || 4;
  const blueprintCount = parseInt(localStorage.getItem("blueprintCount")) || 0;
  const solarPanelCount = parseInt(localStorage.getItem("solarPanelCount")) || 0;
  const fishCount = parseInt(localStorage.getItem("fishCount")) || 0;
  const foodCount = parseInt(localStorage.getItem("foodCount")) || 0;

  // Update DOM elements if they exist
  if (document.getElementById("woodCount")) {
    document.getElementById("woodCount").textContent = woodCount;
  }
  if (document.getElementById("seedCount")) {
    document.getElementById("seedCount").textContent = seedCount;
  }
  if (document.getElementById("blueprintCount")) {
    document.getElementById("blueprintCount").textContent = blueprintCount;
  }
  if (document.getElementById("solarPanelCount")) {
    document.getElementById("solarPanelCount").textContent = solarPanelCount;
  }
  if (document.getElementById("fishCount")) {
    document.getElementById("fishCount").textContent = fishCount;
  }
  if (document.getElementById("foodCount")) {
    document.getElementById("foodCount").textContent = foodCount;
  }

  // Store the parsed values back to localStorage
  localStorage.setItem("woodCount", woodCount.toString());
  localStorage.setItem("seedCount", seedCount.toString());
  localStorage.setItem("blueprintCount", blueprintCount.toString());
  localStorage.setItem("solarPanelCount", solarPanelCount.toString());
  localStorage.setItem("fishCount", fishCount.toString());
  localStorage.setItem("foodCount", foodCount.toString());
}

// Panggil inisialisasi saat game pertama kali dimuat
document.addEventListener("DOMContentLoaded", () => {
    initializeInventory();
    updateInventoryDisplay();
});

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
