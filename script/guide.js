let currentGuideIndex = 0;
const totalGuides = 5; // Updated from 4 to 5 to include the new step

function showGuide(index) {
    const sections = document.querySelectorAll('.guide-section');
    const dots = document.querySelectorAll('.dot');
    const nextBtn = document.querySelector('.nav-button:nth-child(2)'); // Select next button
    const prevBtn = document.querySelector('.nav-button:nth-child(1)'); // Select prev button
    
    sections.forEach(section => section.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    sections[index].classList.add('active');
    dots[index].classList.add('active');
    currentGuideIndex = index;

    // Show/hide navigation buttons based on current index
    if (prevBtn) prevBtn.style.visibility = index === 0 ? 'hidden' : 'visible';
    if (nextBtn) nextBtn.style.visibility = index === totalGuides - 1 ? 'hidden' : 'visible';
}

function nextGuide() {
    if (currentGuideIndex < totalGuides - 1) {
        showGuide(currentGuideIndex + 1);
    }
}

function previousGuide() {
    if (currentGuideIndex > 0) {
        showGuide(currentGuideIndex - 1);
    }
}

function toggleGuide() {
    const guideContainer = document.getElementById('guideContainer');
    if (guideContainer.style.display === 'flex') {
        guideContainer.style.display = 'none';
    } else {
        guideContainer.style.display = 'flex';
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