import { Application, Assets, Container, Sprite } from 'pixi.js';
import { loadSprite } from './loader';
import { Howl, Howler } from 'howler';
import { bgm } from './sounds';
import { Player } from './types/player';

(async () =>
{
  const creategrassGrid = (width: number, height: number) => {
    for (let i = 0; i < width * height; i++) {
        const grass = new Sprite(grassTexture);
        grass.scale.set(5);

        grass.x = Math.floor((i % width) - (width / 2)) * 80;
        grass.y = Math.floor(Math.floor(i / width) - (height / 2)) * 80;
        container.addChild(grass);
    }
  }
  const createGridFromMatrix = async (matrix: number[][]) => {
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
        if (matrix[i][j] === 1) {
          const grass = await loadSprite('src/assets/tiles/grass.png', j * 80, i * 80);
          container.addChild(grass);
        }
      }
    }
  }
  // Create a new application
  const app = new Application();

  // Initialize the application
  await app.init({ background: '#1099bb', resizeTo: window });

  // Append the application canvas to the document body
  document.body.appendChild(app.canvas);

  // Create and add a container to the stage
  const container = new Container();

  app.stage.addChild(container);

  // Load the bunny texture
  const grassTexture = await Assets.load('src/assets/tiles/grass.png');
  const playerTexture = await Assets.load('src/assets/player.png');
  const player2Texture = await Assets.load('src/assets/player2.png');
  grassTexture.baseTexture.scaleMode = 'nearest';
  playerTexture.baseTexture.scaleMode = 'nearest';
  player2Texture.baseTexture.scaleMode = 'nearest';

  // Create a 5x5 grid of bunnies in the container
  creategrassGrid(200, 200);

  // Create a player sprite
  const playerSprite = new Sprite(playerTexture);
  playerSprite.scale.set(5);
  playerSprite.x = 400;
  playerSprite.y = 400;
  container.addChild(playerSprite);

  // Create a house sprite
  const houseTexture = await Assets.load('src/assets/house.png');
  houseTexture.baseTexture.scaleMode = 'nearest';
  const house = new Sprite(houseTexture);
  house.scale.set(5);
  house.x = 400;
  house.y = 320;
  container.addChild(house);

  // Create Magnemite sprite
  const magnemiteTexture = await Assets.load('src/assets/magnemite.png');
  const magnemiteTexture2 = await Assets.load('src/assets/magnemite2.png');
  magnemiteTexture.baseTexture.scaleMode = 'nearest';
  magnemiteTexture2.baseTexture.scaleMode = 'nearest';
  const magnemite = new Sprite(magnemiteTexture);
  magnemite.scale.set(5);
  magnemite.x = 600;
  magnemite.y = 400;
  container.addChild(magnemite);

  const player = new Player('player1', playerSprite.x, playerSprite.y, playerSprite);

  bgm.play();

  let texture = 0;
  // Listen for animate update
  let elapsed = 0;
  app.ticker.add((time) =>
  {
    elapsed += 1;
    if (elapsed >= 30) {
      if (texture === 0) {
        // playerSprite.texture = playerTexture
        magnemite.texture = magnemiteTexture;
        texture = 1
      } else {
        // playerSprite.texture = player2Texture
        magnemite.texture = magnemiteTexture2;
        texture = 0
      }
      elapsed = 0 // reset le timer
    }
    if (player.destinationX !== player.positionX || player.destinationY !== player.positionY) {
      if (player.destinationX > player.positionX) {
        player.positionX += 4;
        playerSprite.x = player.positionX;
      } else if (player.destinationX < player.positionX) {
        player.positionX -= 4;
        playerSprite.x = player.positionX;
      }
      if (player.destinationY > player.positionY) {
        player.positionY += 4;
        playerSprite.y = player.positionY;
      } else if (player.destinationY < player.positionY) {
        player.positionY -= 4;
        playerSprite.y = player.positionY;
      }
    }
    magnemite.x -= 1;
  });
  window.addEventListener('keydown', (event) =>
    {
      switch (event.key)
      {
        case 'ArrowUp':
          player.destinationY = player.positionY - 80;
          break;
        case 'ArrowDown':
          player.destinationY = player.positionY + 80;
          break;
        case 'ArrowLeft':
          player.destinationX = player.positionX - 80;
          break;
        case 'ArrowRight':
          player.destinationX = player.positionX + 80;
          break;
        case 'Enter':
          bgm.play();
          break;
      }
      if (Math.floor(-container.x + app.screen.width)/80 - Math.floor(playerSprite.x/80) < 3) {
        container.position.x = container.position.x - 80;
      }
      if (Math.floor(playerSprite.x/80) - Math.floor(-container.x/80) < 3) {
        container.position.x = container.position.x + 80;
      }
    }
  );
})();
