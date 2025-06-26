import { Application, Sprite, type Container, type ContainerChild } from "pixi.js";
import { loadSprite, loadSpriteAndTexture, loadTexture } from "./loader";
import { Direction } from "../types/direction";
import type { InteractiveElement } from "../types/interactiveElement";
import { NPC } from "../components/npc";
import { Sign } from "../components/sign";
import { Tile } from "../types/tile";

export const createGridFromMatrix = async (matrix: number[][], container: Container<ContainerChild>) => {
  const tileJSON = await fetch('/mapData/tiles.json');
  const tileData = await tileJSON.json() as {
    id: number,
    name: string,
    type: string,
    isWalkable: boolean
  }[];
  const allTiles: Tile[] = await Promise.all(
    tileData.map(async (tile) => {
      const texture = await loadTexture(`/tiles/ground/${tile.name}.png`);
      return new Tile(tile.id, tile.name, tile.type, tile.isWalkable, texture);
    })
  );
  matrix.forEach((row, i) => {
    row.forEach(async (cell, j) => {
      const texture = allTiles.find(t => t.id === cell)?.texture;
      if (texture) {
        const tile = loadSprite(j * 80, i * 80, texture);
        tile.zIndex = -1;
        container.addChild(tile);
      }
    });
  });
  return allTiles;
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
  const messagesJson = await fetch('/mapData/messages.json');
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
        },
        element.url
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