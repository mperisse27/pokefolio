import { Application, Container } from 'pixi.js';
import { loadMap } from './utils/loader';
import { bgm } from './components/sounds';
import { Player } from './components/player';
import { createGridFromMatrix, fetchInteractiveElements, initializeApplication, loadPlayerAnimations, loadPlayerSprites } from './utils/sceneSetup';
import { Popup } from './components/popup';
import { getActionFromKey, handleKeyboardInput } from './utils/keyboardManager';
import { addFlagListeners, setupGui } from './gui';
import { Direction } from './types/direction';
import { NPC } from './components/npc';
import type { Sign } from './components/sign';

(async () =>
{
  await document.fonts.ready;
  
  const app = new Application();
  await app.init({ background: '#fff', resizeTo: window });

  await loadMap();

  let language: 'fr' | 'en' = 'fr';
  addFlagListeners((lang: 'fr' | 'en') => {
    language = lang;
  });

  initializeApplication(app);

  const container = new Container();
  app.stage.addChild(container);

  const matrix = await loadMap();
  //createGridFromMatrix(matrix, container);

  const popup = new Popup(app);
  app.stage.addChild(popup.container);

  const playerSprites = await loadPlayerSprites();
  const playerAnimations = await loadPlayerAnimations();
  const player = new Player('player1', 21, 31, playerSprites, playerAnimations);

  app.stage.addChild(player.container);
  player.container.position.x = app.screen.width / 2 - 40;
  player.container.position.y = app.screen.height / 2 - 160;

  bgm.play();
  const interactiveElements = await fetchInteractiveElements();
  interactiveElements.forEach((element) => {
    container.addChild(element.object.container);
  });

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
          player.move(Direction.UP, matrix, interactiveElements);
          break;
        case "DOWN":
          player.move(Direction.DOWN, matrix, interactiveElements);
          break;
        case "LEFT":
          player.move(Direction.LEFT, matrix, interactiveElements);
          break;
        case "RIGHT":
          player.move(Direction.RIGHT, matrix, interactiveElements);
          break;
        default:
          break;
      }
    }
    if (playerAction == "INTERACT" && popupDelayCounter <= 0) {
      const element = interactiveElements.find((element) => {
        return Math.abs(element.position.x - player.tilePosition.x) + Math.abs(element.position.y - player.tilePosition.y) === 1;
      });
      if (element) {
        const popupHidden = element.type == 'npc' ?
        (element.object as NPC).speak(player, popup, language) :
        (element.object as Sign).speak(popup, language);

        player.canMove = popupHidden;
        popupDelayCounter = 30;
      }
    }
  });

  window.addEventListener('keydown', (event) => handleKeyboardInput(event, activeKeys));
  window.addEventListener('keyup', (event) => handleKeyboardInput(event, activeKeys));

  setupGui();
})();
