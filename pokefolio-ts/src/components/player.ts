import { Container, Sprite } from "pixi.js";
import type { Position } from "../types/position";
import { Direction } from "../types/direction";
import type { NPC } from "./npc";
import type { Sign } from "./sign";
import type { InteractiveElement } from "../types/interactiveElement";

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
  spriteIndex: number;

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
    this.spriteIndex = 0;

    this.container = new Container();
    this.container.x = this.position.x;
    this.container.y = this.position.y;
    this.container.zIndex = this.tilePosition.y;

    for (const dir in sprites) {
      const sprite = sprites[dir as unknown as Direction];
      sprite.x = 0;
      sprite.y = 0;
      sprite.visible = false;
      this.container.addChild(sprite);
    }

    this.sprite = sprites[Direction.DOWN];
    this.sprite.visible = true;
  }

  public move(direction: Direction, matrix: number[][], interactiveElements: InteractiveElement[]) {
    if (!this.canMove) {
      return;
    }
    if (this.facing !== direction) {
      this.changeDirection(direction);
    }
    switch (direction) {
      case Direction.RIGHT:
        if (this.isWalkableTile(matrix, this.tilePosition.x + 1, this.tilePosition.y, interactiveElements)) {
          this.destination.x = this.position.x + 80;
          this.tilePosition.x += 1;
          this.canMove = false;
        }
        break;
      case Direction.LEFT:
        if (this.isWalkableTile(matrix, this.tilePosition.x - 1, this.tilePosition.y, interactiveElements)) {
          this.destination.x = this.position.x - 80;
          this.tilePosition.x -= 1;
          this.canMove = false;
        }
        break;
      case Direction.UP:
        if (this.isWalkableTile(matrix, this.tilePosition.x, this.tilePosition.y - 1, interactiveElements)) {
          this.destination.y = this.position.y - 80;
          this.tilePosition.y -= 1;
          this.canMove = false;
          this.container.zIndex = this.tilePosition.y;
        }
        break;
      case Direction.DOWN:
        if (this.isWalkableTile(matrix, this.tilePosition.x, this.tilePosition.y + 1, interactiveElements)) {
          this.destination.y = this.position.y + 80;
          this.tilePosition.y += 1;
          this.canMove = false;
          this.container.zIndex = this.tilePosition.y;
        }
        break;
    }
  }

  public applyMovement() {
    if (this.moveFrame == 16) {
      this.canMove = true;
      this.moveFrame = 0;
    }
    else if (this.position.x !== this.destination.x || this.position.y !== this.destination.y) {
      switch (this.facing) {
        case Direction.RIGHT:
          this.position.x += 5;
          break;
        case Direction.LEFT:
          this.position.x -= 5;
          break;
        case Direction.UP:
          this.position.y -= 5;
          break;
        case Direction.DOWN:
          this.position.y += 5;
          break;
      }
      if (this.moveFrame % 8 === 0) {
        this.spriteIndex = (this.spriteIndex + 1) % this.animations[this.facing].length;
        this.sprite.texture = this.animations[this.facing][this.spriteIndex].texture;
      }
      this.moveFrame++;
    }
  }

  private changeDirection(direction: Direction) {
    this.facing = direction;
    this.sprite = this.sprites[direction];
    this.spriteIndex = 0;

    for (const dir in this.sprites) {
      this.sprites[dir as unknown as Direction].visible = false;
    }
    this.sprite.visible = true;
  }

  private isWalkableTile(matrix: number[][], x: number, y: number, interactiveElements:InteractiveElement[]): boolean {
    return matrix[y][x] !== 11 && matrix[y][x] !== 1 && !interactiveElements.some(element =>
      element.position.x === x && element.position.y === y
    );
  }
}