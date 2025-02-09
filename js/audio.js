// Fungsi untuk memainkan sound effect
function playButtonSound() {
  const clickSound = new Audio("../asset/sounds/click.mp3");
  clickSound.volume = 0.5;
  clickSound.play();
}

// Fungsi untuk memainkan sound inventory
function playInventorySound() {
  const inventorySound = new Audio("../asset/sounds/inventory.mp3");
  inventorySound.volume = 0.5;
  inventorySound.play();
}

// Fungsi untuk memainkan sound crafting
function playCraftSound() {
  const craftSound = new Audio("../asset/sounds/craft.mp3");
  craftSound.volume = 0.5;
  craftSound.play();
}
