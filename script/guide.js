let currentGuideIndex = 0;
const guideSections = document.querySelectorAll(".guide-section");
const dots = document.querySelectorAll(".dot");

function showGuide(index) {
  guideSections.forEach((section, i) => {
    section.classList.toggle("active", i === index);
    dots[i].classList.toggle("active", i === index);
  });
  currentGuideIndex = index;
}

function nextGuide() {
  if (currentGuideIndex < guideSections.length - 1) {
    showGuide(currentGuideIndex + 1);
  }
}

function previousGuide() {
  if (currentGuideIndex > 0) {
    showGuide(currentGuideIndex - 1);
  }
}

function toggleGuide() {
  document.getElementById("guideContainer").classList.toggle("show");
  showGuide(0);
}

// Menampilkan panduan pertama kali saat game dimulai
document.addEventListener("DOMContentLoaded", function () {
  const hasShownGuide = localStorage.getItem("hasShownGuide");
  if (!hasShownGuide) {
    toggleGuide();
    localStorage.setItem("hasShownGuide", "true");
  }
});
