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
    text: "Setelah mengunjungi desanya, Yanto merasa ada sesuatu yang menariknya kembali ke pulau. Tempat yang dulu asing kini terasa seperti rumah kedua.",
    title: "Narasi",
  },
  {
    id: "yantoDialog1",
    text: "Ayah, maafkan aku. Tapi aku harus kembali ke pulau itu. Ada banyak hal yang masih bisa kukembangkan di sana.",
    title: "Yanto",
  },
  {
    id: "ayahDialog1",
    text: "Aku mengerti, Nak. Kau sudah dewasa dan punya jalan hidupmu sendiri. Lakukanlah apa yang menurutmu benar.",
    title: "Ayah Yanto",
  },
  {
    id: "narasi2",
    text: "Dengan berbekal pengalaman dan dukungan dari desanya, Yanto kembali ke pulau. Kali ini, dengan visi yang lebih besar.",
    title: "Narasi",
  },
  {
    id: "yantoDialog2",
    text: "Pulau ini punya potensi besar. Aku akan mengembangkannya menjadi pusat penelitian teknologi ramah lingkungan.",
    title: "Yanto",
  },
  {
    id: "narasi3",
    text: "Tahun-tahun berikutnya, pulau itu berkembang menjadi contoh sempurna keseimbangan antara teknologi dan alam. Banyak orang dari berbagai penjuru datang untuk belajar.",
    title: "Narasi",
  },
  {
    id: "yantoDialog3",
    text: "Inilah takdirku. Menjadi jembatan antara kemajuan dan kelestarian alam. Dan di sinilah, di pulau ini, aku menemukan tujuan hidupku.",
    title: "Yanto",
  },
  {
    id: "ending1",
    text: "Petualangan Yanto telah berakhir, namun perjuangannya untuk menyeimbangkan teknologi dan alam akan terus berlanjut.",
    title: "Narasi",
  },
  {
    id: "ending2",
    text: "Terima kasih telah memainkan Game EcoVoyage: Pulau Harapan! Melalui perjalanan Yanto, kita belajar bahwa kemajuan teknologi dan pelestarian alam dapat berjalan beriringan.",
    title: "Pesan",
  },
  {
    id: "credits1",
    text: "Semoga game ini dapat menginspirasi kita untuk lebih peduli terhadap lingkungan sambil tetap mengembangkan teknologi yang bermanfaat.",
    title: "Pesan",
  },
  {
    id: "credits2",
    text: "Dibuat oleh Tim Pengembang Game SMKN 1 CIBINONG. Sampai jumpa di petualangan berikutnya!",
    title: "Credits",
  },
];

let currentDialog = 0;
let typeWriter = null;

function showCredits() {
  const credits = [
    { type: 'title', text: 'EcoVoyage: Pulau Harapan' },
    { type: 'role', text: 'Game Developer' },
    { type: 'name', text: 'Tim Pengembang SMKN 1 CIBINONG' },
    { type: 'role', text: 'Story Writer' },
    { type: 'name', text: 'Tim Pengembang SMKN 1 CIBINONG' },
    { type: 'role', text: 'Art & Design' },
    { type: 'name', text: 'Tim Pengembang SMKN 1 CIBINONG' },
    { type: 'role', text: 'Sound Design' },
    { type: 'name', text: 'Music: Adventure by Alexander Nakarada (www.creatorchords.com)Licensed under Creative Commons BY Attribution 4.0 Licensehttps://creativecommons.org/licenses/by/4.0/' },
    { type: 'special', text: 'Terima Kasih Telah Bermain!' }
  ];

  const creditContainer = document.createElement('div');
  creditContainer.className = 'credit-container';
  document.body.appendChild(creditContainer);

  // Buat elemen untuk setiap credit
  credits.forEach((credit, index) => {
    const element = document.createElement('div');
    element.className = `credit-item credit-${credit.type}`;
    element.textContent = credit.text;
    creditContainer.appendChild(element);
  });

  // Mulai animasi credit
  setTimeout(() => {
    creditContainer.classList.add('show');
    
    // Animasi setiap item credit
    const items = document.querySelectorAll('.credit-item');
    items.forEach((item, index) => {
      setTimeout(() => {
        item.classList.add('show');
      }, index * 1000); // Delay 1 detik untuk setiap item
    });

    // Redirect ke halaman awal setelah credit selesai
    setTimeout(() => {
    }, (items.length + 2) * 1000); // Tambah 2 detik untuk transisi akhir
  }, 1000);
}

function showDialog() {
  const dialogBox = document.getElementById('dialogBox');
  const characterName = document.getElementById('characterName');
  const dialogText = document.getElementById('dialogText');

  if (currentDialog >= texts.length) {
    dialogBox.style.display = 'none'; // Sembunyikan dialog box
    showCredits(); // Tampilkan credit scene
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

