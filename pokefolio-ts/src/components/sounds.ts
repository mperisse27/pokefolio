import { Howl } from 'howler';

export const bgm = new Howl({
  src: ['/sounds/bgm.mp3'],
  loop: true,
  volume: 0.4,
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