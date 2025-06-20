import type { Texture } from "pixi.js";

export class Tile {
  id: number;
  name: string;
  texture: Texture;
  type: string;
  isWalkable: boolean;

  constructor(
    id: number,
    name: string,
    type: string,
    isWalkable: boolean,
    texture: Texture
  ) {
    this.id = id;
    this.name = name;
    this.texture = texture;
    this.type = type;
    this.isWalkable = isWalkable;
  }
}