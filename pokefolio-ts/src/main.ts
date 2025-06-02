import { Application, Assets, Container, Sprite } from 'pixi.js';
import { loadMap } from './utils/loader';
import { bgm } from './sounds';
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

  app.ticker.add((_) =>
  {
    player.applyMovement();
    container.position.x = -player.position.x + app.screen.width / 2 - 40;
    container.position.y = -player.position.y + app.screen.height / 2 - 80;
  });
  window.addEventListener('keydown', (event) =>
    {
      handleKeyboardInput(event, player, matrix, popup, messages);
    }
  );
})();
