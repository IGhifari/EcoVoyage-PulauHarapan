// Resource requirements
const SHIP_REQUIREMENTS = {
  wood: 50,
  solarPanel: 1,
  blueprint: 1,
};

const SOLAR_REQUIREMENTS = {
  wood: 30,
};

// Tambahkan requirement untuk rumah
const HOUSE_REQUIREMENTS = {
  wood: 100,
  solarPanel: 2,
};

// Fungsi untuk toggle quest
function toggleQuest() {
  const questContainer = document.getElementById("questContainer");
  const overlay = document.querySelector(".overlay");

  if (questContainer.style.display === "none" || !questContainer.style.display) {
    questContainer.style.display = "block";
    // Tambahkan overlay jika belum ada
    if (!overlay) {
      const newOverlay = document.createElement("div");
      newOverlay.className = "overlay";
      document.body.appendChild(newOverlay);
      newOverlay.style.display = "block";
    } else {
      overlay.style.display = "block";
    }
  } else {
    questContainer.style.display = "none";
    if (overlay) {
      overlay.style.display = "none";
    }
  }
}

// Fungsi untuk craft kapal
function craftShip() {
  const woodCount = parseInt(document.getElementById("woodCount").textContent);
  const solarPanelCount = parseInt(document.getElementById("solarPanelCount").textContent);
  const blueprintCount = parseInt(document.getElementById("blueprintCount").textContent);

  if (blueprintCount < SHIP_REQUIREMENTS.blueprint) {
    alert("Kamu membutuhkan Blueprint Kapal! Cari blueprint di dalam rumah.");
    return;
  }

  if (woodCount < SHIP_REQUIREMENTS.wood) {
    alert(`Kayu tidak cukup! Dibutuhkan ${SHIP_REQUIREMENTS.wood} kayu, kamu hanya punya ${woodCount} kayu.`);
    return;
  }

  if (solarPanelCount < SHIP_REQUIREMENTS.solarPanel) {
    alert(`Panel Surya tidak cukup! Dibutuhkan ${SHIP_REQUIREMENTS.solarPanel} panel, kamu hanya punya ${solarPanelCount} panel.`);
    return;
  }

  const craftBtn = event.target;
  const progressBar = document.getElementById("shipProgress");

  startCrafting(craftBtn, progressBar, completeCraftShip);
}

function completeCraftShip() {
  // Kurangi resource
  const woodCount = parseInt(document.getElementById("woodCount").textContent);
  const solarPanelCount = parseInt(document.getElementById("solarPanelCount").textContent);
  const blueprintCount = parseInt(document.getElementById("blueprintCount").textContent);

  document.getElementById("woodCount").textContent = woodCount - SHIP_REQUIREMENTS.wood;
  document.getElementById("solarPanelCount").textContent = solarPanelCount - SHIP_REQUIREMENTS.solarPanel;
  document.getElementById("blueprintCount").textContent = blueprintCount - SHIP_REQUIREMENTS.blueprint;

  // Simpan progress
  localStorage.setItem("shipBuilt", "true");
  localStorage.setItem("woodCount", (woodCount - SHIP_REQUIREMENTS.wood).toString());
  localStorage.setItem("solarPanelCount", (solarPanelCount - SHIP_REQUIREMENTS.solarPanel).toString());
  localStorage.setItem("blueprintCount", (blueprintCount - SHIP_REQUIREMENTS.blueprint).toString());

  alert("Selamat! Kamu berhasil membuat kapal!");
}

// Fungsi untuk craft panel surya
function craftSolar() {
  const woodCount = parseInt(document.getElementById("woodCount").textContent);

  if (woodCount < SOLAR_REQUIREMENTS.wood) {
    alert(`Kayu tidak cukup! Dibutuhkan ${SOLAR_REQUIREMENTS.wood} kayu, kamu hanya punya ${woodCount} kayu.`);
    return;
  }

  const craftBtn = event.target;
  const progressBar = document.getElementById("solarProgress");

  startCrafting(craftBtn, progressBar, completeCraftSolar);
}

function completeCraftSolar() {
  // Kurangi resource
  const woodCount = parseInt(document.getElementById("woodCount").textContent);
  const solarPanelCount = parseInt(document.getElementById("solarPanelCount").textContent);

  document.getElementById("woodCount").textContent = woodCount - SOLAR_REQUIREMENTS.wood;
  document.getElementById("solarPanelCount").textContent = solarPanelCount + 1; // Tambah 1 panel surya

  // Simpan progress
  localStorage.setItem("solarBuilt", "true");
  localStorage.setItem("woodCount", woodCount - SOLAR_REQUIREMENTS.wood);
  localStorage.setItem("solarPanelCount", solarPanelCount + 1);

  alert("Selamat! Kamu berhasil membuat Panel Surya!");
}

// Event listener untuk menutup quest saat klik di luar
document.addEventListener("click", (event) => {
  const questContainer = document.getElementById("questContainer");
  const questBtn = document.querySelector(".quest-btn");
  const overlay = document.querySelector(".overlay");

  if (questContainer.style.display === "block" && !questContainer.contains(event.target) && event.target !== questBtn) {
    questContainer.style.display = "none";
    if (overlay) {
      overlay.style.display = "none";
    }
  }
});

// Check quest status saat halaman dimuat
document.addEventListener("DOMContentLoaded", () => {
  // Load saved values
  const savedWoodCount = localStorage.getItem("woodCount");
  const savedSeedCount = localStorage.getItem("seedCount");
  const savedSolarPanelCount = localStorage.getItem("solarPanelCount");

  if (savedWoodCount) document.getElementById("woodCount").textContent = savedWoodCount;
  if (savedSeedCount) document.getElementById("seedCount").textContent = savedSeedCount;
  if (savedSolarPanelCount) {
    document.getElementById("solarPanelCount").textContent = savedSolarPanelCount;
  } else {
    document.getElementById("solarPanelCount").textContent = "0";
  }

  // Check quest progress
  if (localStorage.getItem("shipBuilt") === "true") {
    document.getElementById("shipProgress").style.width = "100%";
  }
  if (localStorage.getItem("solarBuilt") === "true") {
    document.getElementById("solarProgress").style.width = "100%";
  }

  // Check house progress
  if (localStorage.getItem("houseBuilt") === "true") {
    document.getElementById("houseProgress").style.width = "100%";
  }

  // Update status button berdasarkan quest yang sudah selesai
  if (localStorage.getItem("shipBuilt") === "true") {
    const shipBtn = document.querySelector("#shipQuest .craft-btn");
    shipBtn.textContent = "Selesai";
    document.getElementById("shipProgress").style.width = "100%";
  }

  if (localStorage.getItem("solarBuilt") === "true") {
    const solarBtn = document.querySelector("#solarQuest .craft-btn");
    solarBtn.textContent = "Selesai";
    document.getElementById("solarProgress").style.width = "100%";
  }

  if (localStorage.getItem("houseBuilt") === "true") {
    const houseBtn = document.querySelector("#houseQuest .craft-btn");
    houseBtn.textContent = "Selesai";
    document.getElementById("houseProgress").style.width = "100%";
  }
});

// Fungsi untuk toggle inventory
function toggleInventory(event) {
  if (event) {
    event.stopPropagation(); // Mencegah event bubbling
  }
  const inventory = document.getElementById("inventory");
  if (inventory.classList.contains("show")) {
    inventory.classList.remove("show");
  } else {
    inventory.classList.add("show");
  }
}

// Event listener untuk menutup inventory saat klik di luar
document.addEventListener("click", function (event) {
  const inventory = document.getElementById("inventory");
  const taskIcon = document.querySelector(".task-icon");
  if (!inventory.contains(event.target) && !taskIcon.contains(event.target)) {
    inventory.classList.remove("show");
  }
});

// Fungsi untuk membangun rumah
function buildHouse() {
  const woodCount = parseInt(document.getElementById("woodCount").textContent);
  const solarPanelCount = parseInt(document.getElementById("solarPanelCount").textContent);

  if (woodCount < HOUSE_REQUIREMENTS.wood) {
    alert(`Kayu tidak cukup! Dibutuhkan ${HOUSE_REQUIREMENTS.wood} kayu, kamu hanya punya ${woodCount} kayu.`);
    return;
  }

  if (solarPanelCount < HOUSE_REQUIREMENTS.solarPanel) {
    alert(`Panel Surya tidak cukup! Dibutuhkan ${HOUSE_REQUIREMENTS.solarPanel} panel, kamu hanya punya ${solarPanelCount} panel.`);
    return;
  }

  const craftBtn = event.target;
  const progressBar = document.getElementById("houseProgress");

  startCrafting(craftBtn, progressBar, completeHouseBuilding);
}

function completeHouseBuilding() {
  // Kurangi resource
  const woodCount = parseInt(document.getElementById("woodCount").textContent);
  const solarPanelCount = parseInt(document.getElementById("solarPanelCount").textContent);

  document.getElementById("woodCount").textContent = woodCount - HOUSE_REQUIREMENTS.wood;
  document.getElementById("solarPanelCount").textContent = solarPanelCount - HOUSE_REQUIREMENTS.solarPanel;

  // Simpan progress
  localStorage.setItem("houseBuilt", "true");
  localStorage.setItem("woodCount", (woodCount - HOUSE_REQUIREMENTS.wood).toString());
  localStorage.setItem("solarPanelCount", (solarPanelCount - HOUSE_REQUIREMENTS.solarPanel).toString());

  alert("Selamat! Kamu berhasil membangun rumah! Sekarang kamu bisa masuk ke dalam rumah.");
}

// Fungsi untuk reset semua quest
function resetAllQuests() {
  if (confirm("Apakah kamu yakin ingin mengulang semua quest? Progress quest yang sudah diselesaikan akan dihapus.")) {
    // Reset status quest
    localStorage.removeItem("shipBuilt");
    localStorage.removeItem("solarBuilt");
    localStorage.removeItem("houseBuilt");
    localStorage.setItem("blueprintCount", "0"); // Reset blueprint juga

    // Reset progress bar
    document.getElementById("shipProgress").style.width = "0%";
    document.getElementById("solarProgress").style.width = "0%";
    document.getElementById("houseProgress").style.width = "0%";

    // Reset resource ke nilai awal
    localStorage.setItem("woodCount", "100");
    localStorage.setItem("seedCount", "4");
    localStorage.setItem("solarPanelCount", "0");

    // Update tampilan
    updateInventoryDisplay();

    // Enable semua tombol craft
    const craftButtons = document.querySelectorAll(".craft-btn");
    craftButtons.forEach((btn) => {
      btn.disabled = false;
      btn.textContent = btn.textContent.replace("Selesai", "Craft");
    });

    alert("Semua quest telah direset! Kamu bisa memulai kembali dari awal.");
  }
}

// Fungsi umum untuk memulai crafting
function startCrafting(button, progressBar, completeCallback) {
  button.disabled = true;
  button.classList.add("crafting");
  button.textContent = "Crafting...";

  progressBar.style.width = "0%";
  progressBar.classList.add("active");

  // Durasi crafting 5 detik
  setTimeout(() => {
    button.disabled = false;
    button.classList.remove("crafting");
    button.textContent = "Selesai";
    progressBar.classList.remove("active");
    progressBar.style.width = "100%";
    completeCallback();
  }, 5000);
}
