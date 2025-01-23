const player = document.getElementById('player');
const rumah = document.querySelector('.rumah');
let x = 0;
let y = 0;
const speed = 2;
let moveRight = false;
let moveLeft = false;
let moveUp = false;
let moveDown = false;

document.addEventListener('keydown', (e) => {
    switch(e.key) {
        case 'ArrowRight':
        case 'd':
        case 'D':
            moveRight = true;
            break;
        case 'ArrowLeft': 
        case 'a':
        case 'A':
            moveLeft = true;
            break;
        case 'ArrowUp':
        case 'w':
        case 'W':
            moveUp = true;
            break;
        case 'ArrowDown':
        case 's':
        case 'S':
            moveDown = true;
            break;
    }
});

document.addEventListener('keyup', (e) => {
    switch(e.key) {
        case 'ArrowRight':
        case 'd':
        case 'D':
            moveRight = false;
            break;
        case 'ArrowLeft': 
        case 'a':
        case 'A':
            moveLeft = false;
            break;
        case 'ArrowUp':
        case 'w':
        case 'W':
            moveUp = false;
            break;
        case 'ArrowDown':
        case 's':
        case 'S':
            moveDown = false;
            break;
    }
});

function updatePosition() {
    const rumahRect = rumah.getBoundingClientRect();
    const playerRect = player.getBoundingClientRect();

    if(moveRight && x + speed + playerRect.width <= window.innerWidth && 
        !(x + speed + playerRect.width > rumahRect.left && y + playerRect.height > rumahRect.top && y < rumahRect.bottom)) {
        x += speed;
        player.style.transform = 'scaleX(-1)';
    }
    if(moveLeft && x - speed >= 0 && 
        !(x - speed < rumahRect.right && y + playerRect.height > rumahRect.top && y < rumahRect.bottom)) {
        x -= speed;
        player.style.transform = 'scaleX(1)';
    }
    if(moveUp && y - speed >= 0 && 
        !(y - speed < rumahRect.bottom && x + playerRect.width > rumahRect.left && x < rumahRect.right)) {
        y -= speed;
    }
    if(moveDown && y + speed + playerRect.height <= window.innerHeight && 
        !(y + speed + playerRect.height > rumahRect.top && x + playerRect.width > rumahRect.left && x < rumahRect.right)) {
        y += speed;
    }

    player.style.left = x + 'px';
    player.style.top = y + 'px';
    
    requestAnimationFrame(updatePosition);
}

updatePosition();