import { Howl } from 'howler';

export const bgm = new Howl({
  src: ['src/assets/bgm.mp3'],
  loop: true,
  volume: 0.4,
});