import { Container, Sprite } from "pixi.js";
import type { Position } from "../types/position";

export enum Direction {
  RIGHT,
  LEFT,
  UP,
  DOWN
}

export class Player {
  public position: Position;
  public destination: Position;
  public tilePosition: Position;
  public id: string;
  public sprites: Record<Direction, Sprite>;
  public animations: Record<Direction, Sprite[]>;
  public container: Container;
  public sprite: Sprite;
  public facing: Direction = Direction.DOWN;
  public canMove: boolean = true;
  public moveFrame: number = 0;

  constructor(
    id: string,
    positionX: number = 0,
    positionY: number = 0,
    sprites: Record<Direction, Sprite>,
    animations: Record<Direction, Sprite[]>
  ) {
    this.id = id;
    this.position = { x: positionX * 80, y: positionY * 80 };
    this.destination = { x: positionX * 80, y: positionY * 80 };
    this.tilePosition = { x: positionX, y: positionY };
    this.sprites = sprites;
    this.animations = animations;

    // Création du conteneur
    this.container = new Container();

    // Positionner tous les sprites et les ajouter au container
    for (const dir in sprites) {
      const sprite = sprites[dir as unknown as Direction];
      sprite.x = 0;
      sprite.y = 0;
      sprite.visible = false;
      this.container.addChild(sprite);
    }

    // Sprite actif initialement
    this.sprite = sprites[Direction.DOWN];
    this.sprite.visible = true;

    // Positionner le container
    this.container.x = this.position.x;
    this.container.y = this.position.y;
  }

  public move(direction: Direction, matrix: number[][]) {
    if (!this.canMove) {
      return;
    }
    if (this.facing !== direction) {
      this.changeDirection(direction);
    }
    else {
      switch (direction) {
        case Direction.RIGHT:
          if (matrix[this.tilePosition.y][this.tilePosition.x + 1] !== 11) {
            this.destination.x = this.position.x + 80;
            this.tilePosition.x += 1;
            this.canMove = false;
          }
          break;
        case Direction.LEFT:
          if (matrix[this.tilePosition.y][this.tilePosition.x - 1] !== 11) {
            this.destination.x = this.position.x - 80;
            this.tilePosition.x -= 1;
            this.canMove = false;
          }
          break;
        case Direction.UP:
          if (matrix[this.tilePosition.y - 1][this.tilePosition.x] !== 11) {
            this.destination.y = this.position.y - 80;
            this.tilePosition.y -= 1;
            this.canMove = false;
          }
          break;
        case Direction.DOWN:
          if (matrix[this.tilePosition.y + 1][this.tilePosition.x] !== 11) {
            this.destination.y = this.position.y + 80;
            this.tilePosition.y += 1;
            this.canMove = false;
          }
          break;
      }
    }
  }

  public applyMovement() {
    if (this.moveFrame == 8) {
      this.canMove = true;
      this.moveFrame = 0;
    }
    else if (this.position.x !== this.destination.x || this.position.y !== this.destination.y) {
      switch (this.facing) {
        case Direction.RIGHT:
          this.position.x += 10;
          break;
        case Direction.LEFT:
          this.position.x -= 10;
          break;
        case Direction.UP:
          this.position.y -= 10;
          break;
        case Direction.DOWN:
          this.position.y += 10;
          break;
      }
      this.moveFrame++;
    }
  }

  private changeDirection(direction: Direction) {
    this.facing = direction;
    this.sprite = this.sprites[direction];

    for (const dir in this.sprites) {
      this.sprites[dir as unknown as Direction].visible = false;
    }
    this.sprite.visible = true;
  }
}