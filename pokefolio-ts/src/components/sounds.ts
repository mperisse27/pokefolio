import { Howl } from 'howler';

let soundEffectVolume = 0.05;

export const bgm = new Howl({
  src: ['/sounds/bgm.mp3'],
  loop: true,
  volume: soundEffectVolume,
});

export const addEventToVolumeSlider = () => {
  const volumeSlider = document.getElementById('volume-slider') as HTMLInputElement;

  if (volumeSlider) {
    volumeSlider.addEventListener('input', () => {
      const newVolume = parseFloat(volumeSlider.value);
      bgm.volume(newVolume);
      soundEffectVolume = newVolume;
    });
  }
};

export const toggleMusic = (isSoundOn: boolean) => {
  if (isSoundOn) {
    bgm.pause();
  } else {
    bgm.play();
  }
};

export const playSoundEffect = (soundName: string, pauseBGM: boolean = false) => {
  if (!bgm.playing()) return; //If BGM is off, everything should be off
  if (pauseBGM) {
    bgm.pause();
  }
  const soundEffect = new Howl({
    src: [`/sounds/${soundName}.mp3`],
    volume: soundEffectVolume,
  });
  soundEffect.play();
  if (pauseBGM) {
    soundEffect.on('end', () => {
      bgm.play();
    });
  } 
}