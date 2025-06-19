import { Container, Sprite } from "pixi.js";
import { Direction, getOppositeDirection } from "../types/direction";
import type { Position } from "../types/position";
import type { Player } from "./player";
import type { Popup } from "./popup";

export class NPC {
  public name: string;
  public tilePosition: Position;
  public position: Position;
  public facing: Direction;
  public sprites: Record<Direction, Sprite>;
  public sprite: Sprite;
  public container: Container;
  public dialogue: { en: string[], fr: string[] };

  constructor(
    name: string,
    positionX: number = 0,
    positionY: number = 0,
    sprites: Record<Direction, Sprite>,
    facing: Direction,
    dialogue: { en: string[], fr: string[] }
  ) {
    this.name = name;
    this.tilePosition = { x: positionX, y: positionY };
    this.position = { x: positionX * 80, y: positionY * 80 };
    this.facing = facing;
    this.sprites = sprites;
    this.dialogue = dialogue;

    this.container = new Container();
    this.container.x = this.position.x;
    this.container.y = this.position.y;
    this.container.zIndex = positionY;

    for (const dir in this.sprites) {
      const sprite = this.sprites[dir as unknown as Direction];
      sprite.x = 0;
      sprite.y = -80; //Sprites are 2 tiles high, so we offset by -80 to align with the tile
      sprite.visible = false;
      this.container.addChild(sprite);
    }
    this.sprite = this.sprites[facing];
    this.sprite.visible = true;
  }

  public changeDirection(direction: Direction) {
    if (this.facing !== direction) {
      this.sprite.visible = false;
      this.sprite = this.sprites[direction];
      this.sprite.visible = true;
      this.facing = direction;
    }
  }

  public speak(player: Player, popup: Popup, lang: "fr" | "en") {
    this.changeDirection(getOppositeDirection(player.facing));
    const text = [...this.dialogue[lang]];
    text[0] = `${this.name}: ${text[0]}`;
    return popup.print(text);
  }
}