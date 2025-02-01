// Variabel untuk menyimpan pohon yang sedang tumbuh
let growingTrees = [];

let woodCount = 0;
let seedCount = 1000;
// Fungsi untuk menanam pohon
function plantTree(x, y) {
  // Cek apakah memiliki benih
  const seedCount = parseInt(document.getElementById("seedCount").textContent);
  if (seedCount <= 0) {
    alert("Kamu tidak memiliki benih!");
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

// Event listener untuk klik di kebun
document.addEventListener("click", function (event) {
  if (!event.target.closest(".back-btn") && !event.target.closest(".inventory") && !event.target.closest(".tree")) {
    plantTree(event.clientX, event.clientY);
  }
});
