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
  return texture;
}