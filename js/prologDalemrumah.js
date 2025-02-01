const dialogData = [
    {
        character: "Yanto",
        text: "Hmm... Tempat ini sudah lama ditinggalkan. Mungkin ada sesuatu yang bisa kumanfaatkan di sini.",
        type: "monolog"
    },
    {
        character: "Yanto",
        text: "Apa ini? Sepertinya bukan sekadar coretan biasa...",
        type: "monolog"
    },
    {
        character: "Yanto",
        text: "Ini... sebuah blueprint! Kapal tenaga alam? Sepertinya ini bukan kapal biasa.",
        type: "monolog"
    },
    {
        character: "Yanto",
        text: "Dengan menggunakan energi angin, air, dan matahari... kapal ini bisa bergerak tanpa bahan bakar fosil! Jika aku bisa membangunnya, aku mungkin bisa meninggalkan pulau ini!",
        type: "monolog"
    },
    {
        character: "Yanto",
        text: "Aku harus mencari bahan-bahan yang dibutuhkan. Jika ada seseorang yang pernah merancang ini, pasti ada cara untuk membuatnya jadi nyata!",
        type: "monolog"
    }
];

let currentDialogIndex = 0;

function showDialog() {
    const dialogBox = document.getElementById('dialogBox');
    const dialogText = document.getElementById('dialogText');
    const characterName = document.getElementById('characterName');

    if (currentDialogIndex < dialogData.length) {
        const currentDialog = dialogData[currentDialogIndex];
        characterName.textContent = currentDialog.character;
        dialogText.textContent = currentDialog.text;
        dialogBox.style.display = 'block';
    } else {
        dialogBox.style.display = 'none';
        // Setelah dialog selesai, tambahkan blueprint ke inventory
        addBlueprint();
    }
}

function nextDialog() {
    currentDialogIndex++;
    showDialog();
}

function addBlueprint() {
    // Implementasi penambahan blueprint ke inventory bisa ditambahkan di sini
    console.log("Blueprint ditambahkan ke inventory");
}

// Mulai dialog saat halaman dimuat
document.addEventListener('DOMContentLoaded', showDialog);
