function cekAreaTanam(event) {
    const kebundalem = document.querySelector('.kebundalem');
    const rect = kebundalem.getBoundingClientRect();
    
    // Mengecek apakah klik berada di dalam area kebundalem
    if (event.clientX >= rect.left && 
        event.clientX <= rect.right && 
        event.clientY >= rect.top && 
        event.clientY <= rect.bottom) {
        // Lanjutkan proses penanaman
        return true;
    } else {
        alert('Anda hanya bisa menanam di dalam area kebun!');
        return false;
    }
}

// Modifikasi fungsi tanam yang sudah ada
function tanam(event) {
    if (!cekAreaTanam(event)) {
        return; // Hentikan fungsi jika area tidak valid
    }
    // ... kode penanaman yang sudah ada ...
} 