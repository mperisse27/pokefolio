import { Application, Sprite, type Container, type ContainerChild } from "pixi.js";
import { loadSprite, loadSpriteAndTexture, loadTexture } from "./loader";
import { Direction } from "../types/direction";
import type { InteractiveElement } from "../types/interactiveElement";
import { NPC } from "../components/npc";
import { Sign } from "../components/sign";

export const createGridFromMatrix = async (matrix: number[][], container: Container<ContainerChild>) => {
  const grassTexture = await loadTexture('/tiles/grass.png');
  const roadTexture = await loadTexture('/tiles/road.png');
  const waterTexture = await loadTexture('/tiles/water.png');
  const signTexture = await loadTexture('/tiles/sign.png');
  const flowerTexture = await loadTexture('/tiles/flower.png');
  matrix.forEach((row, i) => {
    row.forEach(async (cell, j) => {
      if (cell === 1) {
        const flowers = loadSprite(j * 80, i * 80, flowerTexture);
        flowers.zIndex = -1; // Ensure tree is above road
        container.addChild(flowers);
      }
      else if (cell === 3) {
        const grass = loadSprite(j * 80, i * 80, grassTexture);
        grass.zIndex = -1; // Ensure grass is above road
        container.addChild(grass);
      }
      else if (cell === 10) {
        const road = loadSprite(j * 80, i * 80, roadTexture);
        road.zIndex = -1; // Ensure road is behind grass
        container.addChild(road);
      }
      else if (cell === 11) {
        const sign = loadSprite(j * 80, i * 80, signTexture);
        sign.zIndex = -1; // Ensure sign is above grass
        container.addChild(sign);
      }
      else {
        const water = loadSprite(j * 80, i * 80, waterTexture);
        water.zIndex = -1; // Ensure tree is above grass
        container.addChild(water);
      }
    });
  });
}

export const loadPlayerSprites = async () => {
  const playerSpriteUp = await loadSpriteAndTexture(0, 0, '/player/player-up.png');
  playerSpriteUp.zIndex = 1; // Ensure player is above other sprites
  const playerSpriteDown = await loadSpriteAndTexture(0, 0, '/player/player-down.png');
  playerSpriteDown.zIndex = 1; // Ensure player is above other sprites
  const playerSpriteLeft = await loadSpriteAndTexture(0, 0, '/player/player-left.png');
  playerSpriteLeft.zIndex = 1; // Ensure player is above other sprites
  const playerSpriteRight = await loadSpriteAndTexture(0, 0, '/player/player-right.png');
  playerSpriteRight.zIndex = 1; // Ensure player is above other sprites
  const playerSprites: Record<Direction, Sprite> = {
    [Direction.UP]: new Sprite(playerSpriteUp),
    [Direction.DOWN]: new Sprite(playerSpriteDown),
    [Direction.LEFT]: new Sprite(playerSpriteLeft),
    [Direction.RIGHT]: new Sprite(playerSpriteRight),
  };

  return playerSprites;
}

export const loadPlayerAnimations = async () => {
  const playerAnimationUp = await Promise.all([
    loadSpriteAndTexture(0, 0, '/player/player-up.png'),
    loadSpriteAndTexture(0, 0, '/player/player-up-walk1.png'),
    loadSpriteAndTexture(0, 0, '/player/player-up.png'),
    loadSpriteAndTexture(0, 0, '/player/player-up-walk2.png'),
  ]);

  const playerAnimationDown = await Promise.all([
    loadSpriteAndTexture(0, 0, '/player/player-down.png'),
    loadSpriteAndTexture(0, 0, '/player/player-down-walk1.png'),
    loadSpriteAndTexture(0, 0, '/player/player-down.png'),
    loadSpriteAndTexture(0, 0, '/player/player-down-walk2.png'),
  ]);

  const playerAnimationLeft = await Promise.all([
    loadSpriteAndTexture(0, 0, '/player/player-left.png'),
    loadSpriteAndTexture(0, 0, '/player/player-left-walk1.png'),
    loadSpriteAndTexture(0, 0, '/player/player-left.png'),
    loadSpriteAndTexture(0, 0, '/player/player-left-walk2.png'),
  ]);

  const playerAnimationRight = await Promise.all([
    loadSpriteAndTexture(0, 0, '/player/player-right.png'),
    loadSpriteAndTexture(0, 0, '/player/player-right-walk1.png'),
    loadSpriteAndTexture(0, 0, '/player/player-right.png'),
    loadSpriteAndTexture(0, 0, '/player/player-right-walk2.png'),
  ]);

  const playerAnimations: Record<Direction, Sprite[]> = {
    [Direction.UP]: playerAnimationUp.map(sprite => new Sprite(sprite)),
    [Direction.DOWN]: playerAnimationDown.map(sprite => new Sprite(sprite)),
    [Direction.LEFT]: playerAnimationLeft.map(sprite => new Sprite(sprite)),
    [Direction.RIGHT]: playerAnimationRight.map(sprite => new Sprite(sprite)),
  };

  return playerAnimations;
}

export const initializeApplication = (app: Application) => {
  document.body.style.margin = '0';
  document.body.style.padding = '0';
  document.body.style.overflow = 'hidden';

  app.canvas.style.display = 'block';
  app.canvas.style.width = '100vw';
  app.canvas.style.height = '100vh';

  app.renderer.resize(window.innerWidth, window.innerHeight);

  document.body.appendChild(app.canvas);
}

export const fetchInteractiveElements = async () => {
  const messagesJson = await fetch('/messages.json');
  const elements = await messagesJson.json();
  const interactiveElements: InteractiveElement[] = [];

  const npcSprites = await loadPlayerSprites(); //TODO: load NPC sprites from a different source

  elements.forEach((element: any) => {
    let newElement;
    if (element.type === 'npc') {
      newElement = new NPC(
        element.name,
        element.positionX,
        element.positionY,
        npcSprites,
        Direction.LEFT,
        {
          en: element.textEn,
          fr: element.textFr,
        }
      );
    }
    else if (element.type == 'sign') {
      newElement = new Sign(
        npcSprites[Direction.UP],
        element.positionX,
        element.positionY,
        {
          en: element.textEn,
          fr: element.textFr,
        }
      );
    }

    if (newElement) {
      interactiveElements.push({
        position: { x: element.positionX, y: element.positionY },
        object: newElement,
        type: element.type,
      });
    }
  });
  return interactiveElements;
}