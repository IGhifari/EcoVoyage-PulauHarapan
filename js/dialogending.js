const texts = [
  {
    id: "narasi1",
    text: "Kapal Yanto akhirnya merapat di sebuah dermaga kecil di desanya. Langit senja memberikan semburat keemasan, dan suara riuh dari desa perlahan terdengar. Yanto turun dari kapal, menginjak tanah yang sudah lama tidak ia pijak.",
    title: "Narasi",
  },
  { id: "yantoDialog", text: "Aku… aku benar-benar sudah pulang. Aku bisa kembali ke rumah, bertemu keluargaku, menjalani hidup seperti dulu…", title: "Yanto" },
  { id: "narasi2", text: "Dari kejauhan, seorang pria paruh baya dengan tubuh tegap berjalan mendekat. Matanya membelalak, seakan tak percaya dengan apa yang dilihatnya.", title: "Narasi" },
  { id: "ayahDialog", text: "Yanto…? Apakah ini benar-benar kau?", title: "Ayah Yanto" },
  { id: "narasi3", text: "Yanto terpaku sejenak, sebelum akhirnya langkahnya berlari menuju ayahnya. Mereka bertemu di tengah, dan sang ayah langsung merengkuh Yanto dalam pelukan erat. ", title: "Narasi" },
  { id: "yantoDialog2", text: "Ayah… Aku pulang…", title: "Yanto" },
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
    // Langsung ke ending1 setelah dialog selesai
    setTimeout(() => {
      window.location.href = "ending1.html";
    }, 2000);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  nextDialog();
});
