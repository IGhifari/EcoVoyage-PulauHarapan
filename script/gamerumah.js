document.addEventListener("DOMContentLoaded", function () {
    const player = document.querySelector(".player");
    const pembatas = document.querySelector(".pembatas");

    // Jika elemen tidak ditemukan, hentikan eksekusi dan tampilkan error di console
    if (!player || !pembatas) {
        console.error("❌ ERROR: Elemen '.player' atau '.pembatas' tidak ditemukan!");
        return;
    }

    // Ambil ukuran area pembatas dan karakter
    const pembatasRect = pembatas.getBoundingClientRect();
    const playerRect = player.getBoundingClientRect();

    // Posisi awal karakter di tengah pembatas
    let x = (pembatasRect.width / 2) - (playerRect.width / 2);
    let y = (pembatasRect.height / 2) - (playerRect.height / 2);

    // Kecepatan gerakan karakter
    const speed = 4;

    // Variabel untuk mengontrol pergerakan
    let moveRight = false, moveLeft = false, moveUp = false, moveDown = false;

    // Set posisi awal karakter
    player.style.left = `${x}px`;
    player.style.top = `${y}px`;

    // Event untuk mendeteksi tombol ditekan
    document.addEventListener("keydown", (e) => {
        switch (e.key.toLowerCase()) {
            case "arrowright": case "d": moveRight = true; break;
            case "arrowleft": case "a": moveLeft = true; break;
            case "arrowup": case "w": moveUp = true; break;
            case "arrowdown": case "s": moveDown = true; break;
        }
    });

    // Event untuk mendeteksi tombol dilepas
    document.addEventListener("keyup", (e) => {
        switch (e.key.toLowerCase()) {
            case "arrowright": case "d": moveRight = false; break;
            case "arrowleft": case "a": moveLeft = false; break;
            case "arrowup": case "w": moveUp = false; break;
            case "arrowdown": case "s": moveDown = false; break;
        }
    });

    // Fungsi untuk memperbarui posisi karakter
    function updatePosition() {
        // Pastikan pembatas dan karakter tetap ada
        const pembatasRect = pembatas.getBoundingClientRect();
        const playerRect = player.getBoundingClientRect();

        // Cek batas gerakan
        if (moveRight && x + speed + playerRect.width <= pembatasRect.width) {
            x += speed;
            player.style.transform = "scaleX(-1)"; // Menghadap kanan
        }
        if (moveLeft && x - speed >= 0) {
            x -= speed;
            player.style.transform = "scaleX(1)"; // Menghadap kiri
        }
        if (moveUp && y - speed >= 0) {
            y -= speed;
        }
        if (moveDown && y + speed + playerRect.height <= pembatasRect.height) {
            y += speed;
        }

        // Terapkan posisi baru ke karakter
        player.style.left = `${x}px`;
        player.style.top = `${y}px`;

        // Jalankan animasi
        requestAnimationFrame(updatePosition);
    }

    // Jalankan animasi pertama kali
    updatePosition();
});
