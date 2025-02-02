// Resource requirements
const SHIP_REQUIREMENTS = {
  wood: 50,
  solarPanel: 1,
};

const SOLAR_REQUIREMENTS = {
  wood: 30,
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

  if (woodCount < SHIP_REQUIREMENTS.wood) {
    alert(`Kayu tidak cukup! Dibutuhkan ${SHIP_REQUIREMENTS.wood} kayu, kamu hanya punya ${woodCount} kayu.`);
    return;
  }

  if (solarPanelCount < SHIP_REQUIREMENTS.solarPanel) {
    alert(`Panel Surya tidak cukup! Dibutuhkan ${SHIP_REQUIREMENTS.solarPanel} panel, kamu hanya punya ${solarPanelCount} panel.`);
    return;
  }

  const craftBtn = event.target;
  craftBtn.disabled = true;
  craftBtn.textContent = "Crafting...";
  craftBtn.classList.add("crafting");

  let progress = 0;
  const progressBar = document.getElementById("shipProgress");

  const craftingInterval = setInterval(() => {
    progress += 1;
    progressBar.style.width = `${progress}%`;

    if (progress >= 100) {
      clearInterval(craftingInterval);
      completeCraftShip();
      craftBtn.disabled = false;
      craftBtn.textContent = "Craft Kapal";
      craftBtn.classList.remove("crafting");
    }
  }, 50);
}

function completeCraftShip() {
  // Kurangi resource
  const woodCount = parseInt(document.getElementById("woodCount").textContent);
  const solarPanelCount = parseInt(document.getElementById("solarPanelCount").textContent);

  document.getElementById("woodCount").textContent = woodCount - SHIP_REQUIREMENTS.wood;
  document.getElementById("solarPanelCount").textContent = solarPanelCount - SHIP_REQUIREMENTS.solarPanel;

  // Simpan progress
  localStorage.setItem("shipBuilt", "true");
  localStorage.setItem("woodCount", woodCount - SHIP_REQUIREMENTS.wood);
  localStorage.setItem("solarPanelCount", solarPanelCount - SHIP_REQUIREMENTS.solarPanel);

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
  craftBtn.disabled = true;
  craftBtn.textContent = "Crafting...";
  craftBtn.classList.add("crafting");

  let progress = 0;
  const progressBar = document.getElementById("solarProgress");

  const craftingInterval = setInterval(() => {
    progress += 1;
    progressBar.style.width = `${progress}%`;

    if (progress >= 100) {
      clearInterval(craftingInterval);
      completeCraftSolar();
      craftBtn.disabled = false;
      craftBtn.textContent = "Craft Panel Surya";
      craftBtn.classList.remove("crafting");
    }
  }, 50);
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
