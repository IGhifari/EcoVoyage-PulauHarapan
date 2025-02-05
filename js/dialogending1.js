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
    // Langsung ke ending2 setelah dialog selesai
    setTimeout(() => {
      window.location.href = "ending2.html";
    }, 2000);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  nextDialog();
});
