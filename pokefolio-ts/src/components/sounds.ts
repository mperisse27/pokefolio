import { Howl } from 'howler';

export const bgm = new Howl({
  src: ['/sounds/bgm.mp3'],
  loop: true,
  volume: 0.05,
});

export const addEventToVolumeSlider = () => {
  const volumeSlider = document.getElementById('volume-slider') as HTMLInputElement;

  if (volumeSlider) {
    volumeSlider.addEventListener('input', () => {
      const newVolume = parseFloat(volumeSlider.value);
      bgm.volume(newVolume);
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
  if (pauseBGM) {
    bgm.pause();
  }
  const soundEffect = new Howl({
    src: [`/sounds/${soundName}.mp3`],
    volume: 0.05,
  });
  soundEffect.play();
  if (pauseBGM) {
    soundEffect.on('end', () => {
      bgm.play();
    });
  } 
}