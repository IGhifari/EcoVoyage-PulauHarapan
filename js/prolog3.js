let currentDialogIndex = 0;
let isSkipping = false;

const texts = [
    { id: 'narasi1', text: "Pagi yang cerah. Yanto terbangun di tepi pantai sebuah pulau yang tidak dikenal.", title: "Narasi" },
    { id: 'yantoDialog', text: "Di... dimana aku? Apa yang terjadi semalam?", title: "Yanto" },
    { id: 'narasi2', text: "Yanto melihat sekeliling. Pulau ini tampak tidak berpenghuni, namun kaya akan sumber daya alam.", title: "Narasi" },
    { id: 'yantoDialog2', text: "Pohon-pohon ini... dan lihatlah sinar matahari yang begitu kuat! Mungkin ini kesempatanku untuk membuktikan bahwa energi terbarukan bisa bekerja!", title: "Yanto" },
    { id: 'narasi3', text: "Di antara puing-puing perahunya yang terdampar, Yanto menemukan beberapa alat yang masih bisa digunakan.", title: "Narasi" },
    { id: 'yantoDialog3', text: "Aku harus bertahan hidup di sini. Dan mungkin... aku bisa membuat sesuatu yang bermanfaat dari semua ini.", title: "Yanto" },
    { id: 'narasi4', text: "Dengan tekad yang kuat, Yanto memulai petualangan barunya di pulau misterius ini...", title: "Narasi" }
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
    if (id.includes('yantoDialog')) {
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