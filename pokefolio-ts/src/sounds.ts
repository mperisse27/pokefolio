import { Howl, Howler } from 'howler';

// Musique de fond (loopée)
export const bgm = new Howl({
  src: ['src/assets/bgm.mp3'],
  loop: true,
  volume: 0.4,
});

// Effets sonores
const sounds = {
  step: new Howl({ src: ['assets/step.wav'], volume: 1.0 }),
  menu: new Howl({ src: ['assets/menu.mp3'], volume: 0.6 }),
  attack: new Howl({ src: ['assets/attack.wav'], volume: 0.8 }),
};

// Démarrer la musique
bgm.play();

// Jouer un son d’effet ponctuel
window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
    sounds.step.play();
  }
  if (e.key === 'Enter') {
    sounds.menu.play();
  }
});
