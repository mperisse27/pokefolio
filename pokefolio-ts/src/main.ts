import { Application, Container } from 'pixi.js';
import { loadMap } from './utils/loader';
import { addEventToVolumeSlider, bgm } from './components/sounds';
import { Direction, Player } from './components/player';
import { createGridFromMatrix, initializeApplication, loadPlayerAnimations, loadPlayerSprites } from './utils/sceneSetup';
import { Popup } from './components/popup';
import { getActionFromKey, handleKeyboardInput } from './utils/keyboardManager';
import { addFlagListeners } from './gui';

(async () =>
{
  const app = new Application();
  await app.init({ background: '#fff', resizeTo: window });

  await loadMap();

  let language: 'fr' | 'en' = 'fr';
  addFlagListeners((lang: 'fr' | 'en') => {
    language = lang;
  });

  initializeApplication(app);

  const container = new Container();
  //app.stage.addChild(container);

  const matrix = await loadMap();
  createGridFromMatrix(matrix, container);

  const popup = new Popup(app);
  app.stage.addChild(popup.container);

  const playerSprites = await loadPlayerSprites();
  const playerAnimations = await loadPlayerAnimations();
  const player = new Player('player1', 21, 31, playerSprites, playerAnimations);

  //app.stage.addChild(player.container);
  player.container.position.x = app.screen.width / 2 - 40;
  player.container.position.y = app.screen.height / 2 - 160;

  bgm.play();

  const messagesJson = await fetch('/messages.json');
  const messages = await messagesJson.json();

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

    const playerAction = getActionFromKey(activeKeys);

    if (player.canMove) {
      switch (playerAction)
      {
        case "UP":
          player.move(Direction.UP, matrix);
          break;
        case "DOWN":
          player.move(Direction.DOWN, matrix);
          break;
        case "LEFT":
          player.move(Direction.LEFT, matrix);
          break;
        case "RIGHT":
          player.move(Direction.RIGHT, matrix);
          break;
        default:
          break;
      }
    }
    if (playerAction == "INTERACT" && popupDelayCounter <= 0) {
      const popupAppeared = popup.getText(messages, player, language);
      player.canMove = !popupAppeared;
      popupDelayCounter = 30;
    }
  });

  window.addEventListener('keydown', (event) => handleKeyboardInput(event, activeKeys));
  window.addEventListener('keyup', (event) => handleKeyboardInput(event, activeKeys));

  addEventToVolumeSlider();
})();
