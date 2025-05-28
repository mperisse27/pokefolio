import { Application, Assets, Container, Sprite } from 'pixi.js';
import { loadSprite, loadSpriteAndTexture, loadTexture } from './loader';
import { bgm } from './sounds';
import { Direction, Player } from './types/player';

(async () =>
{
  const createGridFromMatrix = async (matrix: number[][]) => {
    const grassTexture = await loadTexture('src/assets/tiles/grass.png');
    const roadTexture = await loadTexture('src/assets/tiles/road.png');
    const waterTexture = await loadTexture('src/assets/tiles/water.png');
    matrix.forEach((row, i) => {
      row.forEach(async (cell, j) => {
        if (cell === 1) {
          const grass = loadSprite(j * 80, i * 80, grassTexture);
          grass.zIndex = -1; // Ensure grass is above road
          container.addChild(grass);
        }
        if (cell === 2) {
          const road = loadSprite(j * 80, i * 80, roadTexture);
          road.zIndex = -1; // Ensure road is behind grass
          container.addChild(road);
        }
        if (cell === 3) {
          const tree = loadSprite(j * 80, i * 80, waterTexture);
          tree.zIndex = -1; // Ensure tree is above grass
          container.addChild(tree);
        }
      });
    });
  }
  // Create a new application
  const app = new Application();

  // Initialize the application
  await app.init({ background: '#1099bb', resizeTo: window });


  // Remove default margins and padding from body
  document.body.style.margin = '0';
  document.body.style.padding = '0';
  document.body.style.overflow = 'hidden';
  
  // Style the canvas to fill viewport completely
  app.canvas.style.display = 'block';
  app.canvas.style.width = '100vw';
  app.canvas.style.height = '100vh';

  // Append the application canvas to the document body
  document.body.appendChild(app.canvas);

  // Create and add a container to the stage
  const container = new Container();

  app.renderer.resize(window.innerWidth, window.innerHeight);
  
  app.stage.addChild(container);

  const matrix: number[][] = Array.from({ length: 100 }, () =>
    Array.from({ length: 100 }, () => Math.floor(Math.random() * 3) + 1)
  );
  createGridFromMatrix(matrix);
  
  const playerSprite = await loadSpriteAndTexture(400, 400, 'src/assets/player.png');
  container.addChild(playerSprite);

  // Create a house sprite
  const house = await loadSpriteAndTexture(400, 320, 'src/assets/house.png');
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
        magnemite.texture = magnemiteTexture;
        texture = 1
      } else {
        magnemite.texture = magnemiteTexture2;
        texture = 0
      }
      elapsed = 0 // reset le timer
    }
    if (player.destinationX !== player.positionX || player.destinationY !== player.positionY) {
      if (player.destinationX > player.positionX) {
        player.positionX += 4;
        player.sprite.x = player.positionX;
        container.position.x -= 4;
      } else if (player.destinationX < player.positionX) {
        player.positionX -= 4;
        player.sprite.x = player.positionX;
        container.position.x += 4;
      }
      if (player.destinationY > player.positionY) {
        player.positionY += 4;
        player.sprite.y = player.positionY;
        container.position.y -= 4;
      } else if (player.destinationY < player.positionY) {
        player.positionY -= 4;
        player.sprite.y = player.positionY;
        container.position.y += 4;
      }
    }
    if (player.destinationX === player.positionX && player.destinationY === player.positionY) {
      player.isMoving = false;
    }
    magnemite.x -= 1;
  });
  window.addEventListener('keydown', (event) =>
    {
      switch (event.key)
      {
        case 'ArrowUp':
          if (!player.isMoving) {
            if (matrix[Math.floor(player.positionY/80) - 1][Math.floor(player.positionX/80)] !== 3) {
              player.move(Direction.UP);
            }
          }
          break;
        case 'ArrowDown':
          if (!player.isMoving) {
            if (matrix[Math.floor(player.positionY/80) + 1][Math.floor(player.positionX/80)] !== 3) {
              player.move(Direction.DOWN);
            }
          }
          break;
        case 'ArrowLeft':
          if (!player.isMoving) {
            if (matrix[Math.floor(player.positionY/80)][Math.floor(player.positionX/80) - 1] !== 3) {
              player.move(Direction.LEFT);
            }
          }
          break;
        case 'ArrowRight':
          if (!player.isMoving) {
            if (matrix[Math.floor(player.positionY/80)][Math.floor(player.positionX/80) + 1] !== 3) {
              player.move(Direction.RIGHT);
            }
          }
          break;
        case 'Enter':
          bgm.play();
          break;
      }
    }
  );
})();
