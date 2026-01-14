import { Application, Container } from 'pixi.js';
import { loadMap, loadTopLeftPosition } from './utils/loader';
import { Player } from './components/player';
import { createGroundFromMatrix, createObstaclesFromMatrix, fetchInteractiveElements, initializeApplication, loadPlayerAnimations, loadPlayerSprites } from './utils/sceneSetup';
import { getActionFromKey, handleKeyboardInput } from './utils/keyboardManager';
import { setupGui, showZonePopup } from './gui';
import { Direction, getDirectionFromPlayerAction } from './types/direction';
import { NPC } from './components/npc';
import type { Sign } from './components/sign';
import { Popup } from './components/popup';
import { PlayerAction } from './types/playerAction';
import { createWalkableMatrix, isWalkableTile } from './utils/matrixChecks';
import ZoneTypes from './types/zones';
import { t } from './utils/i18n';

(async () =>
{
  await document.fonts.ready;

  const app = new Application();
  await app.init({ background: '#fff', resizeTo: window });
  app.ticker.maxFPS = 90;

  initializeApplication(app);

  const groundLayer = new Container();
  app.stage.addChild(groundLayer);

  const objectsLayer = new Container();
  app.stage.addChild(objectsLayer);

  const { groundMatrix, objectsMatrix, zonesMatrix } = await loadMap(); // Load export from Tiled
  const allTiles = await createGroundFromMatrix(groundMatrix, groundLayer);
  const allObstacles = await createObstaclesFromMatrix(objectsMatrix, objectsLayer);

  const popup = new Popup();

  const topLeftPos = await loadTopLeftPosition(); //Used to recalibrate positions if map extended at top or left
  const startPos = { x: -40 - topLeftPos.x, y: -1 - topLeftPos.y };
  const playerSprites = await loadPlayerSprites();
  const playerAnimations = await loadPlayerAnimations();
  const player = new Player('player1', startPos.x, startPos.y, playerSprites, playerAnimations);

  objectsLayer.addChild(player.container);
  player.container.position.x = app.screen.width / 2 - 40;
  player.container.position.y = app.screen.height / 2 - 160;

  const interactiveElements = await fetchInteractiveElements(topLeftPos);
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
    if (player.tilePosition.y <= 9) { //Endless staircase
      player.tilePosition.y += 2;
      player.position.y += 160;
      player.destination.y += 160;
    }
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
      if (player.canMove || popup.lineCounter > 0) {
        const frontTile = player.getFrontTilePosition();
        const element = interactiveElements.find((element) => {
          return element.position.x == frontTile.x && element.position.y == frontTile.y;
        });
        if (element) {
          const popupHidden = element.type == 'npc' ?
          (element.object as NPC).speak(player, popup) :
          (element.object as Sign).speak(popup);
  
          player.canMove = popupHidden;
          popupDelayCounter = 30;
        }
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
          const zoneBeforeMove = zonesMatrix[player.tilePosition.y]?.[player.tilePosition.x] ?? 0;
          const zoneAfterMove = zonesMatrix[newY]?.[newX] ?? 0;
          if (zoneBeforeMove != zoneAfterMove && zoneAfterMove != 0) {
            showZonePopup(t(ZoneTypes[zoneAfterMove as keyof typeof ZoneTypes]?.id)[0]);
          }
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

  setupGui(activeButtons, player);
})();
