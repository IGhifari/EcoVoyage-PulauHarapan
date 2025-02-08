function toggleAbout() {
  const aboutContainer = document.getElementById("aboutContainer");
  if (aboutContainer.style.display === "none") {
    aboutContainer.style.display = "block";
  } else {
    aboutContainer.style.display = "none";
  }
}

// Update fungsi untuk tombol reset di halaman awal
function resetGame() {
  if (confirm("Apakah kamu yakin ingin mengulang dari awal? Semua progress akan hilang.")) {
    // Reset semua data game
    localStorage.clear(); // Hapus semua data di localStorage

    // Reset hunger system
    localStorage.setItem("lastFedTime", Date.now().toString());
    localStorage.removeItem("hungerWarningShown");
    localStorage.removeItem("pageHiddenTime");

    // Set ulang nilai awal game
    localStorage.setItem("woodCount", "4");
    localStorage.setItem("seedCount", "4");
    localStorage.setItem("solarPanelCount", "0");
    localStorage.setItem("fishCount", "0");
    localStorage.setItem("foodCount", "0");
    localStorage.setItem("blueprintCount", "0");

    // Reset quest status
    localStorage.removeItem("shipBuilt");
    localStorage.removeItem("solarBuilt");
    localStorage.removeItem("houseBuilt");
    localStorage.removeItem("engineBuilt");
    localStorage.removeItem("garden2Unlocked");
    localStorage.removeItem("hasEnteredShip");
    localStorage.removeItem("stayedInIsland");
    localStorage.removeItem("waterFilterBuilt");

    alert("Game telah direset! Silakan mulai petualangan baru.");
    window.location.reload();
  }
}

function toggleHowToPlay() {
  const howToPlayContainer = document.getElementById("howToPlayContainer");
  if (howToPlayContainer.style.display === "none" || !howToPlayContainer.style.display) {
    howToPlayContainer.style.display = "block";
  } else {
    howToPlayContainer.style.display = "none";
  }
}
