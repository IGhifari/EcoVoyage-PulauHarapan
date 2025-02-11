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
let trashCount = 9; // Updated to 9 trash items
let trashCollected = 0;
let score = 0;
const collectedTrash = [];

// Add these state management functions at the top of the file
function saveGameState() {
    const gameState = {
        trashCollected,
        score,
        collectedTrash,
        isClean: trashCollected === trashCount
    };
    localStorage.setItem('kebun2State', JSON.stringify(gameState));
}

function loadGameState() {
    const savedState = localStorage.getItem('kebun2State');
    if (savedState) {
        const gameState = JSON.parse(savedState);
        trashCollected = gameState.trashCollected;
        score = gameState.score;
        collectedTrash.length = 0;
        collectedTrash.push(...gameState.collectedTrash);
        return gameState.isClean;
    }
    return false;
}

/* filepath: /c:/Users/acer/Desktop/gameclevio/GameClevio/js/kebun2.js */
function createTrash() {
    const isClean = loadGameState();
    const container = document.getElementById('trash-container');
    const containerRect = container.getBoundingClientRect();
    
    // Clear existing trash
    container.innerHTML = '';
    
    if (isClean) {
        // If area is already clean, just show the completion message
        showDialog("Area ini sudah bersih dan siap untuk bertani!");
        updateDisplay();
        updateCollectedDisplay();
        return;
    }

    // If not clean but we have saved state, restore previous state
    if (trashCollected > 0) {
        updateDisplay();
        updateCollectedDisplay();
        return;
    }

    // Create array with all trash types
    let trashPositions = [];
    
    // Calculate grid positions
    const cols = 3;
    const rows = 3;
    const cellWidth = containerRect.width / cols;
    const cellHeight = containerRect.height / rows;

    // Generate positions for remaining trash items
    const remainingTrash = trashCount - trashCollected;
    for (let i = 0; i < remainingTrash; i++) {
        const row = Math.floor(i / cols);
        const col = i % cols;
        
        // Add random offset within cell
        const offsetX = Math.random() * (cellWidth - 80);
        const offsetY = Math.random() * (cellHeight - 80);
        
        trashPositions.push({
            type: trashTypes[i],
            x: (col * cellWidth) + offsetX,
            y: (row * cellHeight) + offsetY
        });
    }

    // Shuffle positions
    trashPositions.sort(() => Math.random() - 0.5);

    // Create trash elements only for remaining trash
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

        // Save state after each collection
        saveGameState();
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

// Add a reset function if needed
function resetKebun2() {
    localStorage.removeItem('kebun2State');
    trashCollected = 0;
    score = 0;
    collectedTrash.length = 0;
    createTrash();
}

// Initialize the game when the page loads
window.addEventListener('DOMContentLoaded', () => {
    // Initialize state from localStorage on page load
    const savedState = localStorage.getItem('kebun2State');
    if (savedState) {
        const gameState = JSON.parse(savedState);
        trashCollected = gameState.trashCollected;
        score = gameState.score;
        collectedTrash.length = 0;
        collectedTrash.push(...gameState.collectedTrash);
    }
    createTrash();
});
