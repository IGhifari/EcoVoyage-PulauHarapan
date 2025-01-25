let currentDialogIndex = 0;
let isSkipping = false;

const texts = [
    { id: 'title', text: "Badai Kehidupan", title: "Prolog" },
    { id: 'story', text: "Di sebuah desa pesisir, hiduplah keluarga sederhana yang bergantung pada laut sebagai sumber kehidupan. Yanto, anak sulung dari keluarga tersebut, memiliki mimpi besar untuk menjadi pemancing terbaik. Ia ingin membeli alat pancing yang canggih, tetapi keluarganya tidak mampu.", title: "Cerita" },
    { id: 'ayahDialog', text: "Tidak, Nak. Kita harus hemat. Uang ini untuk kebutuhan keluarga", title: "Ayah" },
    { id: 'yantoDialog', text: "Ayah tidak pernah mendukung impianku!", title: "Yanto" },
    { id: 'narasi1', text: "Perdebatan memanas hingga Yanto memutuskan pergi memancing sendirian meski laut sedang tidak bersahabat. Angin mulai bertiup kencang, ombak semakin tinggi, dan Yanto tidak dapat mengendalikan perahunya.", title: "Narasi" },
    { id: 'narasi2', text: "Sebuah badai besar datang menerjang, membalikkan perahunya, dan menyeret Yanto ke laut dalam.", title: "Narasi" },
    { id: 'narasi3', text: "Ketika tersadar, Yanto menemukan dirinya di pantai sebuah pulau asing. Ia sendirian, tanpa alat pancing, tanpa keluarganya. Ketakutan menyelimuti dirinya, tetapi ia tahu bahwa ia harus bertahan hidup dan mencari cara untuk kembali ke rumah.", title: "Narasi" }
];

function updateProgressBar() {
    const progress = (currentDialogIndex / texts.length) * 100;
    document.getElementById('progressBar').style.width = `${progress}%`;
}

function skipDialog() {
    isSkipping = true;
    const dialogText = document.getElementById('dialogText');
    const currentDialog = texts[currentDialogIndex];
    
    dialogText.innerHTML = currentDialog.text;
    
    setTimeout(() => {
        isSkipping = false;
        currentDialogIndex++;
        playNextDialog();
    }, 500);
}

async function typeWriter(elementId, text, speed = 50) {
    if (isSkipping) return;
    
    const element = document.getElementById(elementId);
    element.innerHTML = '';
    
    for (let i = 0; i < text.length; i++) {
        if (isSkipping) {
            element.innerHTML = text;
            break;
        }
        
        element.innerHTML += text.charAt(i);
        await new Promise(resolve => setTimeout(resolve, speed));
    }
}

function showCharacter(id) {
    const yantoElement = document.getElementById('yanto');
    if (id === 'yantoDialog') {
        yantoElement.classList.remove('hidden');
        yantoElement.classList.add('visible');
    } else {
        yantoElement.classList.remove('visible');
        yantoElement.classList.add('hidden');
    }
}

async function playNextDialog() {
    if (currentDialogIndex >= texts.length) {
        setTimeout(() => {
            window.location.href = 'game.html';
        }, 2000);
        return;
    }

    const currentDialog = texts[currentDialogIndex];
    
    document.getElementById('dialogTitle').textContent = currentDialog.title;
    
    showCharacter(currentDialog.id);
    
    await typeWriter('dialogText', currentDialog.text);
    
    if (!isSkipping) {
        updateProgressBar();
        
        setTimeout(() => {
            currentDialogIndex++;
            playNextDialog();
        }, 2000);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    playNextDialog();
}); 