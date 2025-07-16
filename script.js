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

// Animación de fuentes en experiencia
const expTitles = document.querySelectorAll('.exp-title');
const expIntervals = new Map();

// Mapear videos a experiencias por índice (orden actual)
const bgVideos = {
  0: 'assets/videos/together.mp4', // Together
  1: 'assets/videos/dangerousanimals.mp4', // Dangerous Animals
  5: 'media/sea-of-spores.mp4' // Sea of Spores (última)
};

expTitles.forEach((title, idx) => {
  let expStep = 0;
  let intervalId = null;

  function expChangeFont() {
    expStep++;
    if (expStep % randomInt(2, 3) === 0) {
      title.style.fontFamily = officialFont;
    } else {
      const randomFont = crazyFonts[Math.floor(Math.random() * crazyFonts.length)];
      title.style.fontFamily = randomFont;
    }
  }

  title.addEventListener('mouseenter', () => {
    expStep = 0;
    expChangeFont();
    intervalId = setInterval(expChangeFont, 500);
    expIntervals.set(title, intervalId);
  });

  title.addEventListener('mouseleave', () => {
    clearInterval(expIntervals.get(title));
    title.style.fontFamily = officialFont;
  });

  // Mostrar solo una experiencia abierta a la vez (sin alternar)
  title.addEventListener('click', () => {
    const item = title.parentElement;
    const wasOpen = item.classList.contains('open');
    // Cerrar todas las experiencias abiertas
    document.querySelectorAll('.experience-item.open').forEach((openItem) => {
      openItem.classList.remove('open');
    });
    // Si la experiencia no estaba abierta, abrirla y mostrar video si corresponde
    if (!wasOpen) {
      item.classList.add('open');
      if (bgVideos[idx]) {
        showBgMedia('video', bgVideos[idx]);
      } else {
        hideBgMedia();
      }
    } else {
      // Si se cerró, ocultar video
      hideBgMedia();
    }
  });
});

// Mostrar video de fondo para experiencias específicas
function showBgMedia(mediaType, mediaSrc) {
  const bgMedia = document.getElementById('exp-bg-media');
  if (mediaType === 'video') {
    bgMedia.innerHTML = `<video src="${mediaSrc}" autoplay loop muted playsinline preload="auto" style="object-fit:cover; width:100vw; height:100vh;"></video>`;
  }
  bgMedia.classList.add('active');
  // Forzar reflow para que la transición funcione
  void bgMedia.offsetWidth;
  bgMedia.classList.remove('fade-out');
  bgMedia.classList.add('fade-in');
  document.body.classList.add('bg-translucent');
}
function hideBgMedia() {
  const bgMedia = document.getElementById('exp-bg-media');
  bgMedia.classList.remove('fade-in');
  bgMedia.classList.add('fade-out');
  setTimeout(() => {
    bgMedia.classList.remove('active');
    bgMedia.classList.remove('fade-out');
    bgMedia.innerHTML = '';
    document.body.classList.remove('bg-translucent');
  }, 400);
}

// Asociar fondo de video a experiencias específicas
const expItems = document.querySelectorAll('.experience-item');
expItems.forEach((item, idx) => {
  const title = item.querySelector('.exp-title');
  // Mapear videos a experiencias por índice (orden actual)
  if (idx === 0) { // Together
    title.addEventListener('click', (e) => {
      e.stopPropagation();
      showBgMedia('video', 'assets/videos/together.mp4');
    });
  } else if (title.textContent.includes('Dangerous Animals')) {
    title.addEventListener('click', (e) => {
      e.stopPropagation();
      showBgMedia('video', 'assets/videos/dangerousanimals.mp4');
    });
  } else if (title.textContent.includes("From Earth's Heart to Yours")) {
    title.addEventListener('click', (e) => {
      e.stopPropagation();
      showBgMedia('video', 'assets/videos/golda3s.mp4');
    });
  } else if (title.textContent.includes('Glimpse at the Future')) {
    title.addEventListener('click', (e) => {
      e.stopPropagation();
      showBgMedia('video', 'assets/videos/glimpse.mp4');
    });
  } else if (title.textContent.includes('Sea of Spores')) {
    title.addEventListener('click', (e) => {
      e.stopPropagation();
      showBgMedia('video', 'assets/videos/seaofspores.mp4');
    });
  }
});

// Cerrar fondo de video al hacer click en cualquier parte del fondo
const bgMediaDiv = document.getElementById('exp-bg-media');
bgMediaDiv.addEventListener('click', hideBgMedia);

document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.exp-gallery video').forEach(video => {
    video.addEventListener('mouseenter', () => {
      video.play();
    });
    video.addEventListener('mouseleave', () => {
      video.pause();
      video.currentTime = 0;
    });
  });
});

// --- Carrusel auto-scroll infinito ---
document.querySelectorAll('.exp-gallery').forEach(gallery => {
  // Evitar duplicar si ya fue duplicado
  if (!gallery.dataset.infinite) {
    gallery.innerHTML += gallery.innerHTML;
    gallery.dataset.infinite = 'true';
  }

  let scrollInterval;
  const speed = 0.7; // píxeles por frame
  const resetPoint = gallery.scrollWidth / 2;

  function autoScroll() {
    if (gallery.scrollLeft >= resetPoint) {
      gallery.scrollLeft = 0;
    } else {
      gallery.scrollLeft += speed;
    }
  }

  function startAutoScroll() {
    if (!scrollInterval) {
      scrollInterval = setInterval(autoScroll, 16); // ~60fps
    }
  }

  function stopAutoScroll() {
    clearInterval(scrollInterval);
    scrollInterval = null;
  }

  gallery.addEventListener('mouseenter', stopAutoScroll);
  gallery.addEventListener('mouseleave', startAutoScroll);

  // Iniciar auto-scroll
  startAutoScroll();
});
// --- Fin carrusel auto-scroll infinito --- 