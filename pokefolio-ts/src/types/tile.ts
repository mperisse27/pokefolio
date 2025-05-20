import type { TileType } from "./tileType";

export class Tile {
  x: number;
  y: number;
  image: string;
  type: TileType;
  isWalkable: boolean;

  constructor(
    x: number = 0,
    y: number = 0,
    image: string,
    type: TileType,
    isWalkable: boolean = true
  ) {
    this.x = x;
    this.y = y;
    this.image = image;
    this.type = type;
    this.isWalkable = isWalkable;
  }
}