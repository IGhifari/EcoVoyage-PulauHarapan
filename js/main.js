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
    resetFromStartPage();
  }
}
