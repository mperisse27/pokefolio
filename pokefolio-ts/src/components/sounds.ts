import { Howl } from 'howler';

export const bgm = new Howl({
  src: ['/sounds/bgm.mp3'],
  loop: true,
  volume: 0.4,
});