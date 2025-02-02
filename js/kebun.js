// Variabel untuk menyimpan pohon yang sedang tumbuh
let growingTrees = [];

let woodCount = 0;
let seedCount = 1000;
// Fungsi untuk menanam pohon
function plantTree(x, y) {
  // Cek apakah memiliki benih
  const seedCount = parseInt(document.getElementById("seedCount").textContent);
  if (seedCount <= 0) {
    alert("Benih kamu telah habis");
    return;
  }

  // Kurangi jumlah benih
  updateResource("seedCount", -1);

  // Buat elemen pohon
  const tree = document.createElement("div");
  tree.className = "tree growing";
  tree.style.left = x - 25 + "px"; // Posisi tengah di tempat klik
  tree.style.top = y - 25 + "px";

  // Tambahkan debug
  console.log("Tree element created:", tree);
  console.log("Background image (growing):", getComputedStyle(tree).backgroundImage);

  document.body.appendChild(tree);

  // Efek suara tanam (opsional)
  // const plantSound = new Audio('../asset/sound/plant.mp3');
  // plantSound.play();

  // Tambahkan ke daftar pohon yang sedang tumbuh
  growingTrees.push({
    element: tree,
    plantTime: Date.now(),
    x: x,
    y: y,
  });

  // Mulai animasi pertumbuhan
  setTimeout(() => {
    if (tree.parentNode) {
      // Efek suara tumbuh (opsional)
      // const growSound = new Audio('../asset/sound/grow.mp3');
      // growSound.play();

      tree.classList.remove("growing");
      tree.classList.add("grown");

      // Tambahkan event listener untuk menebang
      tree.addEventListener("click", () => cutTree(tree));
    }
  }, 5000);
}

// Fungsi untuk menebang pohon
function cutTree(tree) {
  // Tambah resource kayu
  updateResource("woodCount", 5);
  // Tambah benih
  updateResource("seedCount", 3);

  // Efek visual
  tree.classList.add("cutting");
  setTimeout(() => {
    tree.remove();
  }, 500);
}

// Fungsi untuk update resource
function updateResource(resourceId, amount) {
  const element = document.getElementById(resourceId);
  const currentValue = parseInt(element.textContent);
  element.textContent = currentValue + amount;
}

// Ganti dengan fungsi tanam yang baru
function tanam(event) {
  const kebundalem = document.querySelector('.kebundalem');
  const rect = kebundalem.getBoundingClientRect();
  
  // Cek apakah klik berada di dalam area kebundalem
  if (event.clientX >= rect.left && 
      event.clientX <= rect.right && 
      event.clientY >= rect.top && 
      event.clientY <= rect.bottom) {
    // Hitung posisi relatif terhadap kebundalem
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Tambahkan pohon ke dalam kebundalem, bukan ke body
    if (!event.target.closest(".tree")) {
      // Cek jumlah benih dari localStorage
      let seedCount = parseInt(localStorage.getItem('seedCount')) || 4; // Default 4 jika belum ada
      
      if (seedCount <= 0) {
        alert("Benih kamu telah habis! Silakan dapatkan benih terlebih dahulu.");
        return;
      }
      
      const tree = document.createElement("div");
      tree.className = "tree growing";
      tree.style.left = x + "px";
      tree.style.top = y + "px";
      
      kebundalem.appendChild(tree);
      
      // Kurangi benih dan update localStorage
      seedCount -= 1;
      localStorage.setItem('seedCount', seedCount.toString());
      updateInventoryDisplay();
      
      alert(`Benih berhasil ditanam! Sisa benih: ${seedCount}`);
      
      growingTrees.push({
        element: tree,
        plantTime: Date.now(),
        x: x,
        y: y,
      });
      
      setTimeout(() => {
        if (tree.parentNode) {
          tree.classList.remove("growing");
          tree.classList.add("grown");
          tree.addEventListener("click", () => cutTree(tree));
          alert("Pohon telah tumbuh! Klik pohon untuk menebangnya.");
        }
      }, 5000);
    } else {
      alert("Tidak bisa menanam di atas pohon yang sudah ada!");
    }
  } else {
    alert('Anda hanya bisa menanam di dalam area kebun yang ditandai!');
  }
}

// Fungsi untuk menebang pohon yang diperbarui
function cutTree(tree) {
  // Ambil nilai dari localStorage dengan nilai default
  let woodCount = parseInt(localStorage.getItem('woodCount')) || 0;
  let seedCount = parseInt(localStorage.getItem('seedCount')) || 4;
  
  // Tambah resource
  woodCount += 5;
  seedCount += 3;
  
  // Simpan kembali ke localStorage
  localStorage.setItem('woodCount', woodCount.toString());
  localStorage.setItem('seedCount', seedCount.toString());
  
  // Update tampilan
  updateInventoryDisplay();
  
  // Efek visual
  tree.classList.add("cutting");
  setTimeout(() => {
    tree.remove();
  }, 500);
  
  alert(`Kamu mendapatkan:\n5 Kayu\n3 Benih Pohon\nTotal Kayu: ${woodCount}\nTotal Benih: ${seedCount}`);
}

// Pastikan data inventory dimuat saat halaman dibuka
document.addEventListener('DOMContentLoaded', () => {
  // Inisialisasi nilai awal jika belum ada
  if (!localStorage.getItem('woodCount')) {
    localStorage.setItem('woodCount', '0');
  }
  if (!localStorage.getItem('seedCount')) {
    localStorage.setItem('seedCount', '4');
  }
  updateInventoryDisplay();
}); 
