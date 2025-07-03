const logo = document.getElementById('logo');

const officialFont = "'Roboto Mono', monospace";
const crazyFonts = [
  "'Indie Flower', cursive",
  "'Pacifico', cursive",
  "'Lobster', cursive",
  "'Bangers', cursive",
  "'WindSong', cursive",
  "'Caveat', cursive",
  "'Permanent Marker', cursive",
  "'Press Start 2P', cursive",
  "'Monoton', cursive",
  "'Rubik Moonrocks', cursive"
];

let step = 0;

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function changeFont() {
  step++;
  // Cada 1 o 2 pasos, volver a la fuente oficial
  if (step % randomInt(2, 3) === 0) {
    logo.style.fontFamily = officialFont;
  } else {
    const randomFont = crazyFonts[Math.floor(Math.random() * crazyFonts.length)];
    logo.style.fontFamily = randomFont;
  }
}

// Inicializar con la fuente oficial
logo.style.fontFamily = officialFont;

setInterval(changeFont, 500); 