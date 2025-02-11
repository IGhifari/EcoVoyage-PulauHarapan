window.addEventListener('DOMContentLoaded', function() {
    const bgMusic = document.getElementById('bgMusic');
    bgMusic.volume = 1; 

    // Memuat posisi audio dari localStorage
    const savedTime = localStorage.getItem('audioTime');
    if (savedTime) {
        bgMusic.currentTime = savedTime;
    }

    // Handle autoplay restrictions
    document.addEventListener('click', function() {
        bgMusic.play().catch(function(error) {
            console.log("Audio play failed:", error);
        });
    }, { once: true });

    // Menyimpan posisi audio saat berpindah halaman
    window.addEventListener('beforeunload', () => {
        localStorage.setItem('audioTime', bgMusic.currentTime);
    });
});