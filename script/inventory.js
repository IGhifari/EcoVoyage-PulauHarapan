// Inisialisasi nilai awal jika belum ada di localStorage
if (!localStorage.getItem('woodCount')) {
    localStorage.setItem('woodCount', '4');
}
if (!localStorage.getItem('seedCount')) {
    localStorage.setItem('seedCount', '4');
}

// Fungsi untuk memperbarui tampilan inventory
function updateInventoryDisplay() {
    const woodCountElement = document.getElementById('woodCount');
    const seedCountElement = document.getElementById('seedCount');
    
    if (woodCountElement && seedCountElement) {
        woodCountElement.textContent = localStorage.getItem('woodCount');
        seedCountElement.textContent = localStorage.getItem('seedCount');
    }
}

// Fungsi untuk menambah resource (hanya digunakan di kebun.html)
function addResources() {
    let woodCount = parseInt(localStorage.getItem('woodCount'));
    let seedCount = parseInt(localStorage.getItem('seedCount'));
    
    // Cek apakah masih cukup resource untuk dikurangi
    if (woodCount >= 4 && seedCount >= 4) {
        woodCount += 4;
        seedCount += 4;
        
        localStorage.setItem('woodCount', woodCount.toString());
        localStorage.setItem('seedCount', seedCount.toString());
        
        updateInventoryDisplay();
    } else {
        alert('Resource tidak cukup! Diperlukan minimal 4 kayu dan 4 benih.');
    }
} 