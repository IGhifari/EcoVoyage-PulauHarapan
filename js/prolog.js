let currentDialogIndex = 0;
let isSkipping = false;

const texts = [
    { id: 'title', text: "Perjalanan Menuju Energi Bersih", title: "Prolog" },
    { id: 'story', text: "Di sebuah desa pesisir, hiduplah keluarga nelayan yang masih bergantung pada bahan bakar fosil untuk perahu mereka. Yanto, anak sulung keluarga tersebut, memiliki mimpi untuk mengembangkan kapal nelayan dengan energi terbarukan.", title: "Cerita" },
    { id: 'ayahDialog', text: "Tidak, Nak. Kita tidak punya cukup uang untuk teknologi seperti itu. Lagipula bahan bakar sudah biasa digunakan nelayan.", title: "Ayah" },
    { id: 'yantoDialog', text: "Tapi Ayah, lihat betapa kotornya laut kita sekarang! Dengan energi matahari, kita bisa melaut tanpa mencemari lingkungan!", title: "Yanto" },
    { id: 'narasi1', text: "Yanto telah lama mempelajari tentang panel surya dan turbin angin dari internet. Ia yakin teknologi ini bisa membantu komunitas nelayan sekaligus menyelamatkan laut.", title: "Narasi" },
    { id: 'ayahDialog2', text: "Yanto, jangan nekat! Badai akan datang, berbahaya untuk uji coba sekarang!", title: "Ayah" },
    { id: 'narasi2', text: "Tekad Yanto sudah bulat. Ia membawa prototype panel surya kecil buatannya, berharap bisa membuktikan bahwa energi bersih adalah masa depan.", title: "Narasi" }
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
            window.location.href = 'prolog2.html';
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