let currentGuideIndex = 0;
const guideSections = document.querySelectorAll(".guide-section");
const dots = document.querySelectorAll(".dot");
const totalSlides = 4;

function showGuide(index) {
    // Hide all sections first
    guideSections.forEach(section => section.classList.remove("active"));
    dots.forEach(dot => dot.classList.remove("active"));

    // Show the selected section
    if (guideSections[index]) {
        guideSections[index].classList.add("active");
        dots[index].classList.add("active");
    }
    currentGuideIndex = index;

    // Update navigation buttons
    const prevButton = document.querySelector(".nav-button:first-child");
    const nextButton = document.querySelector(".nav-button:last-child");
    
    prevButton.style.visibility = index === 0 ? "hidden" : "visible";
    nextButton.style.visibility = index === totalSlides - 1 ? "hidden" : "visible";
}

function nextGuide() {
    if (currentGuideIndex < totalSlides - 1) {
        showGuide(currentGuideIndex + 1);
    }
}

function previousGuide() {
    if (currentGuideIndex > 0) {
        showGuide(currentGuideIndex - 1);
    }
}

function toggleGuide() {
    const guideContainer = document.getElementById("guideContainer");
    guideContainer.classList.toggle("show");
    if (guideContainer.classList.contains("show")) {
        showGuide(0);
    }
}

// Initialize guide when page loads
document.addEventListener("DOMContentLoaded", function() {
    const hasShownGuide = localStorage.getItem("hasShownGuide");
    if (!hasShownGuide) {
        toggleGuide();
        localStorage.setItem("hasShownGuide", "true");
    }
});