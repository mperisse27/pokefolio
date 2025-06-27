import { Application, Container } from 'pixi.js';
import { loadMap } from './utils/loader';
import { bgm } from './components/sounds';
import { Player } from './components/player';
import { createGroundFromMatrix, createObstaclesFromMatrix, fetchInteractiveElements, initializeApplication, loadPlayerAnimations, loadPlayerSprites } from './utils/sceneSetup';
import { getActionFromKey, handleKeyboardInput } from './utils/keyboardManager';
import { addFlagListeners, setupGui } from './gui';
import { Direction, getDirectionFromPlayerAction } from './types/direction';
import { NPC } from './components/npc';
import type { Sign } from './components/sign';
import { Popup } from './components/popup';
import { PlayerAction } from './types/playerAction';
import { createWalkableMatrix, isWalkableTile } from './utils/matrixChecks';

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

  const groundLayer = new Container();
  app.stage.addChild(groundLayer);

  const objectsLayer = new Container();
  app.stage.addChild(objectsLayer);

  const { groundMatrix, objectsMatrix } = await loadMap();
  const allTiles = await createGroundFromMatrix(groundMatrix, groundLayer);
  const allObstacles = await createObstaclesFromMatrix(objectsMatrix, objectsLayer);

  const popup = new Popup();

  const playerSprites = await loadPlayerSprites();
  const playerAnimations = await loadPlayerAnimations();
  const player = new Player('player1', 16, 16, playerSprites, playerAnimations);

  objectsLayer.addChild(player.container);
  player.container.position.x = app.screen.width / 2 - 40;
  player.container.position.y = app.screen.height / 2 - 160;

  bgm.play();
  const interactiveElements = await fetchInteractiveElements();
  interactiveElements.forEach((element) => {
    objectsLayer.addChild(element.object.container);
  });

  const walkableMatrix = createWalkableMatrix(groundMatrix, objectsMatrix, allTiles, allObstacles, interactiveElements);

  let activeKeys: Set<string> = new Set();
  let activeButtons: Set<string> = new Set();
  let popupDelayCounter = 0;

  app.ticker.add((_) =>
  {
    player.applyMovement();
    if (!popup.container.classList.contains('hidden')) {
      popup.print();
    }
    groundLayer.position.x = -player.position.x + app.screen.width / 2 - 40;
    groundLayer.position.y = -player.position.y + app.screen.height / 2 - 80;
    objectsLayer.position.x = -player.position.x + app.screen.width / 2 - 40;
    objectsLayer.position.y = -player.position.y + app.screen.height / 2 - 80;
    player.container.position.x = player.position.x;
    player.container.position.y = player.position.y - 80;

    if (popupDelayCounter > 0) {
      popupDelayCounter--;
    }

    const playerActions = getActionFromKey(activeKeys, activeButtons);
    if (playerActions.includes(PlayerAction.INTERACT) && popupDelayCounter <= 0) {
      const frontTile = player.getFrontTilePosition();
      const element = interactiveElements.find((element) => {
        return element.position.x == frontTile.x && element.position.y == frontTile.y;
      });
      if (element) {
        const popupHidden = element.type == 'npc' ?
        (element.object as NPC).speak(player, popup, language) :
        (element.object as Sign).speak(popup, language);

        player.canMove = popupHidden;
        popupDelayCounter = 30;
      }
    }
    if (player.canMove) {
      const direction = playerActions.map(action => getDirectionFromPlayerAction(action)).find(direction => direction !== null);
      if (direction) {
        player.changeDirection(direction);
        const sprint = playerActions.includes(PlayerAction.SPRINT);
        const newX = player.tilePosition.x + (direction == Direction.RIGHT ? 1 : direction == Direction.LEFT ? -1 : 0);
        const newY = player.tilePosition.y + (direction == Direction.DOWN ? 1 : direction == Direction.UP ? -1 : 0);

        if (isWalkableTile(newX, newY, walkableMatrix)) {
          player.move(direction, sprint);
        }
      }
    }
  });

  window.addEventListener('keydown', (event) => handleKeyboardInput(event, activeKeys));
  window.addEventListener('keyup', (event) => handleKeyboardInput(event, activeKeys));

  window.addEventListener('resize', () => {
    app.renderer.resize(window.innerWidth, window.innerHeight);
    player.container.position.x = app.screen.width / 2 - 40;
    player.container.position.y = app.screen.height / 2 - 160;
  });

  setupGui(activeButtons);
})();
