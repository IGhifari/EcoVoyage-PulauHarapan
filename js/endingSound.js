// game.js
document.addEventListener("DOMContentLoaded", function () {
    const bgMusic = new Audio("../asset/sound/creditscene.mp3");
    bgMusic.loop = true;
  
    // Jika musik belum diputar, mulai putar
    if (!localStorage.getItem('audioPlayed')) {
      bgMusic.play().catch(error => console.log("Autoplay diblokir:", error));
      localStorage.setItem('audioPlayed', 'true');
    }
  });
  