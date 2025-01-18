const player = document.getElementById('player');
let x = 0;
let y = 0;
const speed = 10;
document.addEventListener('keydown', (e) => {
    switch(e.key) {
        case 'ArrowRight':
        case 'd':
        case 'D':
            if(x + speed + player.width <= window.innerWidth) {
                x += speed;
            }
            break;
        case 'ArrowLeft': 
        case 'a':
        case 'A':
            if(x - speed >= 0) {
                x -= speed;
            }
            break;
        case 'ArrowUp':
        case 'w':
        case 'W':
            if(y - speed >= 0) {
                y -= speed;
            }
            break;
        case 'ArrowDown':
        case 's':
        case 'S':
            if(y + speed + player.height <= window.innerHeight) {
                y += speed;
            }
            break;
    }
    player.style.left = x + 'px';
    player.style.top = y + 'px';
});