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

// Fungsi untuk toggle inventory
function toggleInventory() {
  const inventory = document.getElementById("inventory");
  if (inventory.classList.contains("show")) {
    inventory.classList.remove("show");
  } else {
    inventory.classList.add("show");
  }
}

// Fungsi untuk menanam pohon
function tanam(event) {
  // Periksa apakah masih memiliki benih
  const seedCount = parseInt(document.getElementById("seedCount").textContent);
  if (seedCount <= 0) {
    alert("Kamu tidak memiliki benih!");
    return;
  }

  // Dapatkan posisi klik
  const rect = event.target.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  // Buat elemen pohon baru
  const tree = document.createElement("div");
  tree.className = "tree growing";
  tree.style.left = x + "px";
  tree.style.top = y + "px";

  // Tambahkan pohon ke kebun
  document.querySelector(".kebundalem").appendChild(tree);

  // Kurangi jumlah benih
  document.getElementById("seedCount").textContent = seedCount - 1;

  // Setelah 5 detik, pohon tumbuh
  setTimeout(() => {
    tree.className = "tree grown";
    // Tambahkan event listener untuk menebang
    tree.onclick = function (e) {
      e.stopPropagation(); // Mencegah event tanam
      tebang(tree);
    };
  }, 5000);
}

// Fungsi untuk menebang pohon
function tebang(tree) {
  tree.className = "tree cutting";

  // Tambah resource
  const woodCount = parseInt(document.getElementById("woodCount").textContent);
  const seedCount = parseInt(document.getElementById("seedCount").textContent);

  document.getElementById("woodCount").textContent = woodCount + 5;
  document.getElementById("seedCount").textContent = seedCount + 3;

  // Hapus pohon setelah animasi selesai
  setTimeout(() => {
    tree.remove();
  }, 500);
}

// Inisialisasi saat halaman dimuat
document.addEventListener("DOMContentLoaded", function () {
  // Sembunyikan inventory saat awal
  document.getElementById("inventory").classList.remove("show");

  // Tutup inventory saat mengklik di luar
  document.addEventListener("click", function (event) {
    const inventory = document.getElementById("inventory");
    const taskIcon = document.querySelector(".task-icon");
    if (!inventory.contains(event.target) && !taskIcon.contains(event.target)) {
      inventory.classList.remove("show");
    }
  });
});

// Pastikan data inventory dimuat saat halaman dibuka
document.addEventListener("DOMContentLoaded", () => {
  // Inisialisasi nilai awal jika belum ada
  if (!localStorage.getItem("woodCount")) {
    localStorage.setItem("woodCount", "0");
  }
  if (!localStorage.getItem("seedCount")) {
    localStorage.setItem("seedCount", "4");
  }
  updateInventoryDisplay();
});
