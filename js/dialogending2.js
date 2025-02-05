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
    text: "Terima kasih telah memainkan Game Clevio! Melalui perjalanan Yanto, kita belajar bahwa kemajuan teknologi dan pelestarian alam dapat berjalan beriringan.",
    title: "Pesan",
  },
  {
    id: "credits1",
    text: "Semoga game ini dapat menginspirasi kita untuk lebih peduli terhadap lingkungan sambil tetap mengembangkan teknologi yang bermanfaat.",
    title: "Pesan",
  },
  {
    id: "credits2",
    text: "Dibuat dengan ❤️ oleh Tim Pengembang Game Clevio. Sampai jumpa di petualangan berikutnya!",
    title: "Credits",
  },
];

let currentDialogIndex = 0;

function showDialog(dialogData) {
  const characterName = document.getElementById("characterName");
  const dialogText = document.getElementById("dialogText");

  characterName.textContent = dialogData.title;
  dialogText.textContent = dialogData.text;
}

function nextDialog() {
  if (currentDialogIndex < texts.length) {
    showDialog(texts[currentDialogIndex]);
    currentDialogIndex++;
  } else {
    // Kembali ke halaman awal setelah ending selesai
    setTimeout(() => {
      window.location.href = "halamanAwal.html";
    }, 3000);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  nextDialog();
});
