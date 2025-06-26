import { Assets, Sprite, Texture } from "pixi.js";

export const loadSprite = (positionX: number, positionY: number, texture: Texture) => {
  const sprite = new Sprite(texture);
  sprite.scale.set(5);
  sprite.x = positionX;
  sprite.y = positionY;
  return sprite;
}

export const loadSpriteAndTexture = async (positionX: number, positionY: number, texturePath: string) => {
  const texture = await loadTexture(texturePath);
  const sprite = new Sprite(texture);
  sprite.scale.set(5);
  sprite.x = positionX;
  sprite.y = positionY;
  return sprite;
}

export const loadTexture = async (texturePath: string) => {
  const texture = await Assets.load(texturePath);
  texture.baseTexture.scaleMode = 'nearest';
  return texture as Texture;
}

export const loadMap = async () => {
  const res = await fetch('/mapData/map.json');
  const mapData = await res.json();
  const chunks = mapData.layers[0].chunks;
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;

  for (const chunk of chunks) {
    minX = Math.min(minX, chunk.x);
    minY = Math.min(minY, chunk.y);
    maxX = Math.max(maxX, chunk.x + chunk.width);
    maxY = Math.max(maxY, chunk.y + chunk.height);
  }

  const width = maxX - minX;
  const height = maxY - minY;

  const tilesMatrix: number[][] = Array.from({ length: height }, () =>
    Array(width).fill(0)
  );

  for (const chunk of chunks) {
    const { x: chunkX, y: chunkY, width: chunkWidth, height: chunkHeight, data } = chunk;
  
    for (let j = 0; j < chunkHeight; j++) {
      for (let i = 0; i < chunkWidth; i++) {
        const tileId = data[j * chunkWidth + i];
  
        const globalX = chunkX + i - minX;
        const globalY = chunkY + j - minY;
  
        // Vérification de limites (au cas où)
        if (
          globalY >= 0 && globalY < height &&
          globalX >= 0 && globalX < width
        ) {
          tilesMatrix[globalY][globalX] = tileId;
        }
      }
    }
  }
  return tilesMatrix;
}