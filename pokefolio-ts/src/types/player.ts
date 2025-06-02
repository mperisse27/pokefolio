import { Container, Sprite } from "pixi.js";

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
  public sprites: Record<Direction, Sprite>;
  public container: Container;
  public sprite: Sprite;
  public isMoving: boolean = false;
  public facing: Direction = Direction.DOWN;
  public canMove: boolean = true;

  constructor(
    id: string,
    positionX: number = 0,
    positionY: number = 0,
    sprites: Record<Direction, Sprite>
  ) {
    this.id = id;
    this.positionX = positionX;
    this.positionY = positionY;
    this.destinationX = positionX;
    this.destinationY = positionY;
    this.sprites = sprites;

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
    this.container.x = this.positionX;
    this.container.y = this.positionY;
  }

  public move(direction: Direction, matrix: number[][]) {
    if (!this.canMove) {
      return;
    }
    if (this.facing !== direction) {
      this.changeDirection(direction);
    } else {
      switch (direction) {
        case Direction.RIGHT:
          if (matrix[Math.floor(this.positionY/80)][Math.floor(this.positionX/80) + 1] !== 11) {
            this.destinationX = this.positionX + 80;
          }
          break;
        case Direction.LEFT:
          if (matrix[Math.floor(this.positionY/80)][Math.floor(this.positionX/80) - 1] !== 11) {
            this.destinationX = this.positionX - 80;
          }
          break;
        case Direction.UP:
          if (matrix[Math.floor(this.positionY/80) - 1][Math.floor(this.positionX/80)] !== 11) {
            this.destinationY = this.positionY - 80;
          }
          break;
        case Direction.DOWN:
          if (matrix[Math.floor(this.positionY/80) + 1][Math.floor(this.positionX/80)] !== 11) {
            this.destinationY = this.positionY + 80;
          }
          break;
      }
      this.isMoving = true;
    }
  }

  public applyMovement() {
    let moved = false;

    if (this.destinationX > this.positionX) {
      this.positionX += 8;
      moved = true;
    } else if (this.destinationX < this.positionX) {
      this.positionX -= 8;
      moved = true;
    }

    if (this.destinationY > this.positionY) {
      this.positionY += 8;
      moved = true;
    } else if (this.destinationY < this.positionY) {
      this.positionY -= 8;
      moved = true;
    }

    // this.container.x = this.positionX;
    // this.container.y = this.positionY;

    this.isMoving = moved;
  }

  private changeDirection(direction: Direction) {
    this.facing = direction;
    this.sprite = this.sprites[direction];

    // Mettre à jour les visibilités
    for (const dir in this.sprites) {
      this.sprites[dir as unknown as Direction].visible = false;
    }
    this.sprite.visible = true;
  }
}