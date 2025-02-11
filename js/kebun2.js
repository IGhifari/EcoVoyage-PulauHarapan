const trashTypes = [
    '../asset/Objek/sampah/29.png',
    '../asset/objek/sampah/30.png',
    '../asset/objek/sampah/31.png'
];
let trashCount = 9; // Updated to 9 trash items
let trashCollected = 0;
let score = 0;
const collectedTrash = [];

function createTrash() {
    collectedTrash.length = 0; // Reset collected trash array
    const container = document.getElementById('trash-container');
    const containerRect = container.getBoundingClientRect();

    for (let i = 0; i < trashCount; i++) {
        const trash = document.createElement('img');
        trash.className = 'trash';
        trash.src = trashTypes[Math.floor(Math.random() * trashTypes.length)];
        
        // Random position within the container
        const x = Math.random() * (containerRect.width - 100) + 50;
        const y = Math.random() * (containerRect.height - 100) + 50;
        
        trash.style.left = x + 'px';
        trash.style.top = y + 'px';
        
        trash.addEventListener('click', () => collectTrash(trash));
        container.appendChild(trash);
    }
    updateDisplay();
}

function collectTrash(trashElement) {
    trashElement.style.animation = 'collect 0.3s ease-out';
    setTimeout(() => {
        trashElement.remove();
        trashCollected++;
        score += 10;
        
        // Add collected trash to array and update display
        collectedTrash.push(trashElement.src);
        updateCollectedDisplay();
        updateDisplay();
        
        if (trashCollected === trashCount) {
            showDialog("Akhirnya bersih! Sekarang aku bisa mulai bertani.");
            score += 50;
            updateDisplay();
        }
    }, 300);
}

function updateDisplay() {
    document.getElementById('scoreValue').textContent = score;
    document.getElementById('trashLeft').textContent = trashCount - trashCollected;
}

function updateCollectedDisplay() {
    const container = document.getElementById('collectedItems');
    container.innerHTML = ''; // Clear current display
    
    collectedTrash.forEach(trashSrc => {
        const item = document.createElement('div');
        item.className = 'collected-item';
        
        const img = document.createElement('img');
        img.src = trashSrc;
        img.alt = 'Collected Trash';
        
        item.appendChild(img);
        container.appendChild(item);
    });
}

function showDialog(text) {
    const dialogBox = document.getElementById('dialog-box');
    const dialogText = document.getElementById('dialog-text');
    dialogText.textContent = text;
    dialogBox.classList.remove('hidden');
    
    setTimeout(() => {
        dialogBox.classList.add('hidden');
    }, 3000);
}

// Initialize the game when the page loads
window.addEventListener('DOMContentLoaded', createTrash);
