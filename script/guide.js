let currentGuideIndex = 0;
const totalGuides = 4;

function toggleGuide() {
  const guide = document.getElementById("gameGuide");
  guide.classList.toggle("show");
}

function updateGuideDisplay() {
  document.querySelectorAll('.guide-section').forEach((section, index) => {
    section.classList.remove('active');
    if (index === currentGuideIndex) {
      section.classList.add('active');
    }
  });
  
  document.querySelectorAll('.dot').forEach((dot, index) => {
    dot.classList.remove('active');
    if (index === currentGuideIndex) {
      dot.classList.add('active');
    }
  });
}

function nextGuide() {
  if (currentGuideIndex < totalGuides - 1) {
    currentGuideIndex++;
    updateGuideDisplay();
  }
}

function previousGuide() {
  if (currentGuideIndex > 0) {
    currentGuideIndex--;
    updateGuideDisplay();
  }
}

function checkTutorialProgress() {
  // Cek tutorial 1
  const woodCount = parseInt(document.getElementById('woodCount').textContent);
  const seedCount = parseInt(document.getElementById('seedCount').textContent);
  if (woodCount >= 1 || seedCount >= 1) {
    document.getElementById('tutorial1Status').textContent = 'Selesai';
    document.getElementById('tutorial1Status').classList.replace('incomplete', 'complete');
  }
  
  // Cek tutorial 2
  const solarPanelCount = parseInt(document.getElementById('solarPanelCount').textContent);
  if (solarPanelCount >= 1) {
    document.getElementById('tutorial2Status').textContent = 'Selesai';
    document.getElementById('tutorial2Status').classList.replace('incomplete', 'complete');
  }
  
  // Cek tutorial 3
  const garden2Unlocked = localStorage.getItem("garden2Unlocked") === "true";
  if (garden2Unlocked) {
    document.getElementById('tutorial3Status').textContent = 'Selesai';
    document.getElementById('tutorial3Status').classList.replace('incomplete', 'complete');
  }
}

// Update progress setiap 1 detik
setInterval(checkTutorialProgress, 1000);

// Tambahkan event listener saat DOM sudah dimuat
document.addEventListener('DOMContentLoaded', function() {
  // Cek apakah panduan sudah pernah ditampilkan sebelumnya
  const hasShownGuide = localStorage.getItem('hasShownGuide');
  
  if (!hasShownGuide) {
    // Jika belum pernah ditampilkan, tampilkan panduan
    const guide = document.getElementById("gameGuide");
    guide.classList.add("show");
    
    // Tandai bahwa panduan sudah ditampilkan
    localStorage.setItem('hasShownGuide', 'true');
  }
}); 