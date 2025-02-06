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

const dialogs = [
  { name: "Yanto", text: "Aku… aku benar-benar sudah pulang." },
  { name: "Narator", text: "Dari kejauhan, seorang pria paruh baya dengan tubuh tegap berjalan mendekat. Matanya membelalak, seakan tak percaya dengan apa yang dilihatnya." },
  { name: "Ayah", text: "Yanto…? Apakah ini benar-benar kau?" },
  { name: "Narator", text: "Yanto terpaku sejenak, sebelum akhirnya langkahnya berlari menuju ayahnya. Mereka bertemu di tengah, dan sang ayah langsung merengkuh Yanto dalam pelukan erat." },
  { name: "Yanto", text: "Ayah… Aku pulang…" },
  { name: "Narator", text: "Ayahnya menghela napas panjang, berusaha menahan emosi, tapi Yanto bisa merasakan genggaman tangan yang erat di pundaknya." },
  { name: "Ayah", text: "Aku pikir… aku sudah kehilanganmu, Nak. Tapi lihatlah kau sekarang… kau kembali dengan selamat."},
  { name: "Narator", text: "Penduduk desa mulai berdatangan, wajah mereka penuh keterkejutan dan kebahagiaan."},
];

let currentDialog = 0;
let typeWriter = null;

function startDialog() {
  const dialogBox = document.getElementById('dialogBox');
  const characterName = document.getElementById('characterName');
  const dialogText = document.getElementById('dialogText');

  characterName.textContent = dialogs[currentDialog].name;
  typeWriter = new TypeWriter(dialogs[currentDialog].text);
  
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
  if (currentDialog < dialogs.length) {
    startDialog();
  } else {
    // Kembali ke halaman utama setelah dialog selesai
    setTimeout(() => {
      window.location.href = 'ending1.html';
    }, 2000);
  }
}

// Mulai dialog saat halaman dimuat
document.addEventListener('DOMContentLoaded', startDialog);
