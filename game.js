const player = document.getElementById('player');
const rumah = document.querySelector('.rumah');
let x = 0;
let y = 0;
const speed = 10;

document.addEventListener('keydown', (e) => {
    const rumahRect = rumah.getBoundingClientRect();
    const playerRect = player.getBoundingClientRect();

    switch(e.key) {
        case 'ArrowRight':
        case 'd':
        case 'D':
            if(x + speed + playerRect.width <= window.innerWidth && 
               !(x + speed + playerRect.width > rumahRect.left && y + playerRect.height > rumahRect.top && y < rumahRect.bottom)) {
                x += speed;
            }
            break;
        case 'ArrowLeft': 
        case 'a':
        case 'A':
            if(x - speed >= 0 && 
               !(x - speed < rumahRect.right && y + playerRect.height > rumahRect.top && y < rumahRect.bottom)) {
                x -= speed;
            }
            break;
        case 'ArrowUp':
        case 'w':
        case 'W':
            if(y - speed >= 0 && 
               !(y - speed < rumahRect.bottom && x + playerRect.width > rumahRect.left && x < rumahRect.right)) {
                y -= speed;
            }
            break;
        case 'ArrowDown':
        case 's':
        case 'S':
            if(y + speed + playerRect.height <= window.innerHeight && 
               !(y + speed + playerRect.height > rumahRect.top && x + playerRect.width > rumahRect.left && x < rumahRect.right)) {
                y += speed;
            }
            break;
    }
    player.style.left = x + 'px';
    player.style.top = y + 'px';
});