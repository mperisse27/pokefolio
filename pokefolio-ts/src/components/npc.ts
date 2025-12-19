import { Container, Sprite } from "pixi.js";
import { Direction, getOppositeDirection } from "../types/direction";
import type { Position } from "../types/position";
import type { Player } from "./player";
import type { Popup } from "./popup";
import { t } from "../utils/i18n";
import { TILE_SIZE } from "../utils/constants";

export class NPC {
  public name: string;
  public tilePosition: Position;
  public position: Position;
  public facing: Direction;
  public sprites: Record<Direction, Sprite>;
  public sprite: Sprite;
  public container: Container;
  public textKey: string;

  constructor(
    name: string,
    positionX: number = 0,
    positionY: number = 0,
    sprites: Record<Direction, Sprite>,
    facing: Direction,
    textKey: string
  ) {
    this.name = name;
    this.tilePosition = { x: positionX, y: positionY };
    this.position = { x: positionX * TILE_SIZE, y: positionY * TILE_SIZE };
    this.facing = facing;
    this.sprites = sprites;
    this.textKey = textKey;

    this.container = new Container();
    this.container.x = this.position.x;
    this.container.y = this.position.y;
    this.container.zIndex = positionY;

    for (const dir in this.sprites) {
      const sprite = this.sprites[dir as unknown as Direction];
      sprite.x = 0;
      sprite.y = -TILE_SIZE; //Sprites are 2 tiles high, so we offset by one tile to align with the tile
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

  /**
   * Gets the text related to this NPC and initiates a popup.
   * @param player The instance of the player
   * @param popup The instance of the popup
   */
  public speak(player: Player, popup: Popup) {
    this.changeDirection(getOppositeDirection(player.facing));
    const text = [...t(this.textKey)];
    text[0] = `${this.name}: ${text[0]}`;
    return popup.changeText(text);
  }
}