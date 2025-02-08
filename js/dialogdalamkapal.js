let currentDialogIndex = 0;
let currentDialogTexts = [];

const texts = [
  {
    id: "narasi1",
    text: "Yanto berdiri di dalam kapal, menatap kapalnya yang telah selesai dibuat. Mesin tenaga alam sudah menyala, layar berkibar tertiup angin. Sinar matahari sangat terang di langit, memberikan nuansa hangat di pulau yang telah menjadi rumahnya selama ini.",
    title: "Narasi",
  },
  { id: "yantoDialog", text: "Akhirnya… kapal ini selesai. Dengan ini, aku bisa pulang. Aku bisa kembali ke rumah, bertemu keluargaku, menjalani hidup seperti dulu…", title: "Yanto" },
  { id: "narasi2", text: "Yanto menatap ke arah hutan, melihat tempat-tempat yang telah menjadi bagian dari kehidupannya di pulau itu", title: "Narasi" },
  { id: "yantoDialog2", text: "Tapi… aku sudah banyak belajar di sini.", title: "Yanto" },
  { id: "yantoDialog3", text: "Aku menemukan cara hidup dengan alam, membangun sesuatu dengan tanganku sendiri, dan mungkin…", title: "Yanto" },
  { id: "yantoDialog4", text: "pulau ini sudah menjadi bagian dari diriku.", title: "Yanto" },
];

const textpilihan2 = [
  { id: "narasi1", text: "Yanto tersenyum, menghela napas panjang, lalu menatap kapalnya sekali lagi sebelum akhirnya mematikan mesinnya.", title: "Narasi" },
  { id: "yantoDialog", text: "Pulau ini telah memberiku kehidupan baru. Mungkin… takdirku memang ada di sini.", title: "Yanto" },
  { id: "narasi2", text: "Ia berjalan kembali ke dalam hutan, siap untuk melanjutkan hidupnya di pulau, menjadikannya rumah yang baru.", title: "Narasi" },
];

const textpilihan1 = [
  { id: "narasi1", text: "Yanto menatap ke cakrawala, mengambil napas dalam, lalu naik ke kapal. Dengan tangan mantap, ia menyalakan mesinnya.", title: "Narasi" },
  { id: "yantoDialog", text: "Keluargaku… Aku sudah lama meninggalkan mereka. Sudah waktunya aku kembali.", title: "Yanto" },
  {
    id: "narasi2",
    text: "Kapal mulai berlayar meninggalkan pulau, Yanto melihatnya semakin jauh hingga akhirnya hanya lautan yang terlihat. Perjalanannya di pulau telah berakhir, namun petualangan baru menantinya di rumah.",
    title: "Narasi",
  },
];

function typeWriter(element, text, speed = 50) {
  let index = 0;
  element.textContent = '';
  let intervalId;
  
  return new Promise((resolve) => {
    function type() {
      if (index < text.length) {
        element.textContent += text.charAt(index);
        index++;
        intervalId = setTimeout(type, speed);
      } else {
        element.dataset.typing = 'finished';
        resolve();
      }
    }
    
    // Menambahkan properti untuk menyimpan fungsi complete
    element.completeTyping = () => {
      clearTimeout(intervalId);
      element.textContent = text;
      element.dataset.typing = 'finished';
      resolve();
    };
    
    type();
  });
}

function showDialog(dialogTexts) {
  const dialogBox = document.getElementById("dialogBox");
  const characterName = document.getElementById("characterName");
  const dialogText = document.getElementById("dialogText");

  if (currentDialogIndex < dialogTexts.length) {
    dialogBox.style.display = "block";
    characterName.textContent = dialogTexts[currentDialogIndex].title;
    
    // Menggunakan efek typewriter
    dialogText.dataset.typing = 'ongoing';
    typeWriter(dialogText, dialogTexts[currentDialogIndex].text);
    
  } else {
    dialogBox.style.display = "none";
    currentDialogIndex = 0;

    if (dialogTexts === texts) {
      document.getElementById("sailDialog").style.display = "flex";
    } else {
      if (dialogTexts === textpilihan2) {
        localStorage.setItem("stayedInIsland", "true");
        alert("Yanto memutuskan untuk menetap di pulau!, Quest baru akan segera menantikanmu!");
        window.location.href = "game.html";
      } else if (dialogTexts === textpilihan1) {
        alert("Yanto memutuskan untuk pulang ke rumah. Terima kasih telah menyelesaikan petualangan ini!");
        window.location.href = "ending.html";
      }
    }
    return;
  }
  currentDialogIndex++;
}

function nextDialog() {
  const dialogText = document.getElementById("dialogText");
  
  if (dialogText.dataset.typing === 'ongoing') {
    // Jika masih mengetik, selesaikan langsung
    dialogText.completeTyping();
  } else if (dialogText.dataset.typing === 'finished') {
    // Jika sudah selesai, lanjut ke dialog berikutnya
    dialogText.dataset.typing = '';
    if (document.getElementById("dialogBox").style.display === "block") {
      showDialog(currentDialogTexts);
    }
  }
}

// Fungsi untuk memulai dialog
function startDialog(dialogType) {
  currentDialogIndex = 0;
  currentDialogTexts = dialogType;
  showDialog(dialogType);
}
