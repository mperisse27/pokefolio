import { Container, Sprite } from "pixi.js";
import type { Position } from "../types/position";
import { Direction } from "../types/direction";

export class Player {
  public position: Position; //Graphical position in pixels
  public destination: Position; //Graphical destination in pixels
  public tilePosition: Position; //Logical position in tiles
  public id: string;
  public sprites: Record<Direction, Sprite>;
  public animations: Record<Direction, Sprite[]>;
  public container: Container;
  public sprite: Sprite;
  public facing: Direction = Direction.DOWN;
  public canMove: boolean = true;
  moveFrame: number = 0;
  spriteIndex: number = 0;
  sprinting: boolean = false;

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

  public move(direction: Direction, sprint: boolean) {
    switch (direction) {
      case Direction.RIGHT:
        this.destination.x = this.position.x + 80;
        this.tilePosition.x += 1;
        this.canMove = false;
        this.sprinting = sprint;
        break;
      case Direction.LEFT:
        this.destination.x = this.position.x - 80;
        this.tilePosition.x -= 1;
        this.canMove = false;
        this.sprinting = sprint;
        break;
      case Direction.UP:
        this.destination.y = this.position.y - 80;
        this.tilePosition.y -= 1;
        this.canMove = false;
        this.container.zIndex = this.tilePosition.y;
        this.sprinting = sprint;
        break;
      case Direction.DOWN:
        this.destination.y = this.position.y + 80;
        this.tilePosition.y += 1;
        this.canMove = false;
        this.container.zIndex = this.tilePosition.y;
        this.sprinting = sprint;
        break;
    }
  }

  public applyMovement() {
    if (this.moveFrame == 16) { //Moving one tile is 16 frames
      this.canMove = true;
      this.sprinting = false;
      this.moveFrame = 0;
    }
    else if (this.position.x !== this.destination.x || this.position.y !== this.destination.y) {
      const delta = this.sprinting ? 10 : 5;
      switch (this.facing) {
        case Direction.RIGHT:
          this.position.x += delta;
          break;
        case Direction.LEFT:
          this.position.x -= delta;
          break;
        case Direction.UP:
          this.position.y -= delta;
          break;
        case Direction.DOWN:
          this.position.y += delta;
          break;
      }
      if (this.moveFrame % 8 === 0) {
        this.spriteIndex = (this.spriteIndex + 1) % this.animations[this.facing].length;
        this.sprite.texture = this.animations[this.facing][this.spriteIndex].texture;
      }
      this.moveFrame += this.sprinting ? 2 : 1;
    }
  }

  public changeDirection(direction: Direction) {
    this.facing = direction;
    this.sprite = this.sprites[direction];

    for (const dir in this.sprites) {
      this.sprites[dir as unknown as Direction].visible = false;
    }
    this.sprite.visible = true;
  }

  public getFrontTilePosition(): Position {
    switch (this.facing) {
      case Direction.RIGHT:
        return { x: this.tilePosition.x + 1, y: this.tilePosition.y };
      case Direction.LEFT:
        return { x: this.tilePosition.x - 1, y: this.tilePosition.y };
      case Direction.UP:
        return { x: this.tilePosition.x, y: this.tilePosition.y - 1 };
      case Direction.DOWN:
        return { x: this.tilePosition.x, y: this.tilePosition.y + 1 };
      default:
        return { x: this.tilePosition.x, y: this.tilePosition.y };
    }
  }
}