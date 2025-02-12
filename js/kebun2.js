const trashTypes = [
    '../asset/objek/sampah/29.png', // Botol plastik
    '../asset/objek/sampah/30.png', // Kaleng
    '../asset/objek/sampah/31.png', // Kantong plastik
    '../asset/objek/sampah/32.png', // Kardus
    '../asset/objek/sampah/33.png', // Kertas
    '../asset/objek/sampah/34.png', // Gelas plastik
    '../asset/objek/sampah/35.png', // Styrofoam
    '../asset/objek/sampah/36.png', // Bungkus snack
    '../asset/objek/sampah/37.png'  // Botol kaca
];
let trashCount = 9;     // Updated to 9 trash items
let trashCollected = 0;
let score = 0;
const collectedTrash = [];

// Add at the top of the file with other variables
const MINIGAME_COMPLETED_KEY = 'kebun2MinigameCompleted';
let isDialogVisible = true; // Start with dialog visible

/* filepath: /c:/Users/acer/Desktop/gameclevio/GameClevio/js/kebun2.js */
function createTrash() {
    collectedTrash.length = 0;
    const container = document.getElementById('trash-container');
    const containerRect = container.getBoundingClientRect();
    
    // Clear existing trash
    container.innerHTML = '';

    // Create array with all trash types
    let trashPositions = [];
    
    // Calculate grid positions
    const cols = 3;
    const rows = 3;
    const cellWidth = containerRect.width / cols;
    const cellHeight = containerRect.height / rows;

    // Generate positions for all 9 trash items
    for (let i = 0; i < trashCount; i++) {
        const row = Math.floor(i / cols);
        const col = i % cols;
        
        // Add random offset within cell
        const offsetX = Math.random() * (cellWidth - 80); // 80 is trash width
        const offsetY = Math.random() * (cellHeight - 80); // 80 is trash height
        
        trashPositions.push({
            type: trashTypes[i],
            x: (col * cellWidth) + offsetX,
            y: (row * cellHeight) + offsetY
        });
    }

    // Shuffle positions
    trashPositions.sort(() => Math.random() - 0.5);

    // Create trash elements
    trashPositions.forEach((position) => {
        const trash = document.createElement('img');
        trash.className = 'trash';
        trash.src = position.type;
        
        trash.style.left = position.x + 'px';
        trash.style.top = position.y + 'px';
        
        trash.addEventListener('click', () => collectTrash(trash));
        container.appendChild(trash);
    });
    
    updateDisplay();
}

window.addEventListener('DOMContentLoaded', () => {
    const isCompleted = localStorage.getItem(MINIGAME_COMPLETED_KEY) === 'true';

    if (!isCompleted) {
        showDialog("Tempat ini penuh dengan sampah... Aku harus membersihkannya dulu sebelum mulai bertani.");
        setTimeout(() => {
            createTrash();
            // Add slight delay after trash creation before enabling collection
            setTimeout(() => {
                isDialogVisible = false;
            }, 3000);
        }, 2000);
    } else {
        showDialog("Area kebun ini sudah bersih!");
        hideMinigameElements();
    }
});

function hideMinigameElements() {
    const trashContainer = document.getElementById('trash-container');
    const scoreContainer = document.querySelector('.score-container');
    const collectedContainer = document.querySelector('.collected-trash-container');

    if (trashContainer) trashContainer.style.display = 'none';
    if (scoreContainer) scoreContainer.style.display = 'none';
    if (collectedContainer) collectedContainer.style.display = 'none';
}


function collectTrash(trashElement) {
    // Prevent collection while dialog is visible
    if (isDialogVisible) {
        return;
    }
    
    trashElement.style.animation = 'collect 0.3s ease-out';
    setTimeout(() => {
        trashElement.remove();
        trashCollected++;
        score += 10;
        
        collectedTrash.push(trashElement.src);
        updateCollectedDisplay();
        updateDisplay();
        
        if (trashCollected === trashCount) {
            showDialog("Akhirnya bersih! Sekarang aku bisa mulai bertani.");
            score += 50;
            updateDisplay();
            localStorage.setItem(MINIGAME_COMPLETED_KEY, 'true');
            
            // Show coming soon overlay after a delay
            setTimeout(() => {
                document.getElementById('comingSoonOverlay').style.display = 'flex';
            }, 3000);
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

// Update the showDialog function
function showDialog(text) {
    const dialogBox = document.getElementById('dialog-box');
    const dialogText = document.getElementById('dialog-text');
    dialogText.textContent = text;
    dialogBox.classList.remove('hidden');
    isDialogVisible = true;
    
    setTimeout(() => {
        dialogBox.classList.add('hidden');
        isDialogVisible = false;
    }, 3000);
}

// Update the window load event listener
window.addEventListener('DOMContentLoaded', () => {
    // Check if minigame has been completed
    const isCompleted = localStorage.getItem(MINIGAME_COMPLETED_KEY) === 'true';
    
    if (!isCompleted) {
        createTrash();
    } else {
        // Show completion message
        showDialog("Area kebun ini sudah bersih!");
        // Hide or remove game elements
        const trashContainer = document.getElementById('trash-container');
        const scoreContainer = document.querySelector('.score-container');
        const collectedContainer = document.querySelector('.collected-trash-container');
        document.getElementById('comingSoonOverlay').style.display = 'flex';
        
        if (trashContainer) trashContainer.style.display = 'none';
        if (scoreContainer) scoreContainer.style.display = 'none';
        if (collectedContainer) collectedContainer.style.display = 'none';
    }
});
