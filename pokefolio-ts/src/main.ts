import { Application, Assets, Container, Sprite } from 'pixi.js';
import { loadMap } from './utils/loader';
import { bgm } from './sounds';
import { Direction, Player } from './types/player';
import { createGridFromMatrix, loadPlayerSprites } from './utils/sceneSetup';
import { Popup } from './components/popup';
import { handleKeyboardInput } from './utils/keyboardManager';

(async () =>
{
  // Create a new application
  const app = new Application();

  // Initialize the application
  await app.init({ background: '#1099bb', resizeTo: window });

  await loadMap();

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

  const matrix = await loadMap();
  createGridFromMatrix(matrix, container);

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

  const popup = new Popup(app);
  app.stage.addChild(popup.container);

  const playerSprites = await loadPlayerSprites(400, 400);
  const player = new Player('player1', 400, 400, playerSprites);

  app.stage.addChild(player.container);
  player.container.position.x = app.screen.width / 2 - 40;
  player.container.position.y = app.screen.height / 2 - 160;

  bgm.play();

  const messages = [
    {
      text: "Bienvenue dans Pokéfolio !",
      positionX: 400,
      positionY: 400
    },
  ]

  let texture = 0;
  // Listen for animate update
  let elapsed = 0;
  app.ticker.add((_) =>
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
    player.applyMovement();
    container.position.x = -player.positionX + app.screen.width / 2 - 40;
    container.position.y = -player.positionY + app.screen.height / 2 - 80;
    magnemite.x -= 1;
  });
  window.addEventListener('keydown', (event) =>
    {
      handleKeyboardInput(event, player, matrix, popup, messages);
    }
  );
})();
