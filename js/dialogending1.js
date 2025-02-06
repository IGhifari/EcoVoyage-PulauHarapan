class TypeWriter {
  constructor(dialogText, speed = 50) {
    this.dialogText = dialogText;
    this.speed = speed;
    this.text = '';
    this.index = 0;
    this.isTyping = false;
  }

  type(callback) {
    if (this.index < this.dialogText.length) {
      this.isTyping = true;
      this.text += this.dialogText.charAt(this.index);
      this.index++;
      setTimeout(() => this.type(callback), this.speed);
    } else {
      this.isTyping = false;
      if (callback) callback();
    }
    return this.text;
  }

  skipTyping() {
    this.text = this.dialogText;
    this.index = this.dialogText.length;
    this.isTyping = false;
    return this.text;
  }
}

const texts = [
  {
    id: "narasi1",
    text: "Beberapa bulan telah berlalu sejak kepulangan Yanto. Desa kini telah berubah, dengan teknologi ramah lingkungan yang ia bawa dari pulau.",
    title: "Narasi",
  },
  {
    id: "yantoDialog1",
    text: "Dengan panel surya dan sistem filtrasi air yang kita terapkan, desa kita jadi lebih maju dan tetap menjaga alam.",
    title: "Yanto",
  },
  {
    id: "ayahDialog1",
    text: "Kau benar-benar membawa perubahan besar, Nak. Desa kita sekarang jadi contoh untuk desa-desa lain.",
    title: "Ayah Yanto",
  },
  {
    id: "narasi2",
    text: "Yanto memandang ke sekeliling desa. Kebun-kebun organik yang ia rintis kini menjadi sumber pangan utama desa. Kolam-kolam ikan yang dikelola dengan sistem modern namun ramah lingkungan menjadi kebanggaan warga.",
    title: "Narasi",
  },
  {
    id: "pendudukDialog",
    text: "Terima kasih Yanto! Berkat kamu, anak-anak kami punya masa depan yang lebih cerah di desa ini.",
    title: "Penduduk Desa",
  },
  {
    id: "yantoDialog2",
    text: "Inilah rumahku yang sesungguhnya. Di sini, bersama kalian semua, membangun masa depan yang lebih baik.",
    title: "Yanto",
  },
];

let currentDialog = 0;
let typeWriter = null;

function showDialog() {
  const dialogBox = document.getElementById('dialogBox');
  const characterName = document.getElementById('characterName');
  const dialogText = document.getElementById('dialogText');

  if (currentDialog >= texts.length) {
    // Pindah ke ending2 setelah dialog selesai
    setTimeout(() => {
      window.location.href = "ending2.html";
    }, 2000);
    return;
  }

  characterName.textContent = texts[currentDialog].title;
  typeWriter = new TypeWriter(texts[currentDialog].text);
  
  function updateText() {
    dialogText.textContent = typeWriter.text;
  }

  typeWriter.type(updateText);
  requestAnimationFrame(function animate() {
    updateText();
    if (typeWriter.isTyping) {
      requestAnimationFrame(animate);
    }
  });
}

function nextDialog() {
  if (typeWriter && typeWriter.isTyping) {
    typeWriter.skipTyping();
    return;
  }

  currentDialog++;
  showDialog();
}

// Mulai dialog saat halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
  showDialog();
});
