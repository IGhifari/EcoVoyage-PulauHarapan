let currentDialogIndex = 0;
let isSkipping = false;

const texts = [
    { id: 'narasi1', text: "Di tengah badai, Yanto melihat bagaimana dahsyatnya kekuatan alam. Ombak besar menghantam perahunya, tapi panel surya kecilnya masih bertahan.", title: "Narasi" },
    { id: 'yantoDialog', text: "Luar biasa! Bahkan dalam badai, alam memberikan kita energi yang begitu besar!", title: "Yanto" },
    { id: 'narasi2', text: "Yanto mulai memahami bahwa solusinya bukan melawan alam, tapi memanfaatkan energi alam dengan bijak.", title: "Narasi" },
    { id: 'yantoDialog2', text: "Kita harus belajar hidup selaras dengan alam... Menggunakan energinya dengan cara yang tepat...", title: "Yanto" },
    { id: 'narasi3', text: "Sebuah ombak besar menghantam perahu. Panel surya Yanto hancur, dan ia terhempas ke laut yang dalam.", title: "Narasi" },
    { id: 'narasi4', text: "Dalam kegelapan laut, Yanto berjanji akan menemukan cara sempurna untuk mengembangkan teknologi energi bersih yang tahan segala cuaca.", title: "Narasi" },
    { id: 'narasi5', text: "Takdir membawanya ke sebuah pulau misterius, tempat ia akan belajar rahasia mengembangkan teknologi energi terbarukan yang harmonis dengan alam...", title: "Narasi" }
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
            window.location.href = 'dialog3.html';
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