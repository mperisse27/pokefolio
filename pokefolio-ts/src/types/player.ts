import type { Sprite } from "pixi.js";

export enum Direction {
  RIGHT,
  LEFT,
  UP,
  DOWN
}

export class Player {
  public positionX: number;
  public positionY: number;
  public destinationX: number;
  public destinationY: number;
  public id: string;
  public sprite: Sprite;
  public isMoving: boolean = false;

  constructor(
    id: string,
    positionX: number = 0,
    positionY: number = 0,
    sprite: Sprite
  ) {
    this.id = id;
    this.positionX = positionX;
    this.positionY = positionY;
    this.destinationX = positionX;
    this.destinationY = positionY;
    this.sprite = sprite;
  }

  public move(direction: Direction) {
    switch (direction) {
      case Direction.RIGHT:
        this.destinationX = this.positionX + 80;
        break;
      case Direction.LEFT:
        this.destinationX = this.positionX - 80;
        break;
      case Direction.UP:
        this.destinationY = this.positionY - 80;
        break;
      case Direction.DOWN:
        this.destinationY = this.positionY + 80;
        break;
      default:
        break;
    }
    this.isMoving = true;
  }
}