import { Application, Container } from 'pixi.js';
import { loadMap } from './utils/loader';
import { bgm } from './components/sounds';
import { Direction, Player } from './components/player';
import { createGridFromMatrix, loadPlayerAnimations, loadPlayerSprites } from './utils/sceneSetup';
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

  const popup = new Popup(app);
  app.stage.addChild(popup.container);

  const playerSprites = await loadPlayerSprites();
  const playerAnimations = await loadPlayerAnimations();
  const player = new Player('player1', 21, 31, playerSprites, playerAnimations);

  app.stage.addChild(player.container);
  player.container.position.x = app.screen.width / 2 - 40;
  player.container.position.y = app.screen.height / 2 - 160;

  bgm.play();

  const messages = [
    {
      text: ["Bienvenue dans Pokéfolio !"],
      positionX: 1680,
      positionY: 2400
    },
    {
      text: ["Ma chaîne Twitch :", "matt_la_menacee"],
      positionX: 1360,
      positionY: 1920
    },
    {
      text: ["Mon LinkedIn :", "Matteo Perisse"],
      positionX: 1600,
      positionY: 1920
    },
    {
      text: ["Mon GitHub :", "mperisse27"],
      positionX: 1840,
      positionY: 1920
    },
    {
      text: ["Mon mail :", "matteo.perisse@gmail.com"],
      positionX: 2080,
      positionY: 1920
    }
  ]

  let activeKeys: Set<string> = new Set();
  let popupDelayCounter = 0;

  app.ticker.add((_) =>
  {
    player.applyMovement();
    container.position.x = -player.position.x + app.screen.width / 2 - 40;
    container.position.y = -player.position.y + app.screen.height / 2 - 80;

    if (popupDelayCounter > 0) {
      popupDelayCounter--;
    }

    if (player.canMove) {
      if (activeKeys.has("W") || activeKeys.has("w") || activeKeys.has("ArrowUp")) {
        player.move(Direction.UP, matrix);
      } else if (activeKeys.has("S") || activeKeys.has("s") || activeKeys.has("ArrowDown")) {
        player.move(Direction.DOWN, matrix);
      } else if (activeKeys.has("A") || activeKeys.has("a") || activeKeys.has("ArrowLeft")) {
        player.move(Direction.LEFT, matrix);
      } else if (activeKeys.has("D") || activeKeys.has("d") || activeKeys.has("ArrowRight")) {
        player.move(Direction.RIGHT, matrix);
      }
    }

    if ((activeKeys.has(" ") || activeKeys.has("Enter")) && popupDelayCounter <= 0) {
      const popupAppeared = popup.getText(messages, player);
      player.canMove = !popupAppeared;
      popupDelayCounter = 30;
    }
  });

  window.addEventListener('keydown', (event) => handleKeyboardInput(event, activeKeys));
  window.addEventListener('keyup', (event) => handleKeyboardInput(event, activeKeys));
})();
