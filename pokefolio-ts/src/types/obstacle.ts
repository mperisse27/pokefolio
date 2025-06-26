import type { Texture } from "pixi.js";

export class Obstacle {
  id: number;
  name: string;
  height: number;
  width: number;
  hitbox: { x: number, y: number };
  texture: Texture;

  constructor(
    id: number,
    name: string,
    height: number,
    width: number,
    hitbox: { x: number, y: number },
    texture: Texture
  ) {
    this.id = id;
    this.name = name;
    this.height = height;
    this.width = width;
    this.hitbox = hitbox;
    this.texture = texture;
  }
}