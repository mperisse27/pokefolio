import { Container, type Sprite } from "pixi.js";
import type { Position } from "../types/position";
import type { Popup } from "./popup";
import { t } from "../utils/i18n";
import { TILE_SIZE } from "../utils/constants";

export class Sign {
  public sprite: Sprite;
  public tilePosition: Position;
  public container: Container;
  public position: Position;
  public textKey: string;
  public url?: string;
  public details?: string;

  constructor(
    sprite: Sprite,
    positionX: number = 0,
    positionY: number = 0,
    textKey: string,
    url?: string,
    details?: string
  ) {
    this.sprite = sprite;
    this.tilePosition = { x: positionX, y: positionY };
    this.position = { x: positionX * TILE_SIZE, y: positionY * TILE_SIZE };
    this.url = url;
    this.textKey = textKey;
    this.details = details;

    this.container = new Container();
    this.container.x = this.position.x;
    this.container.y = this.position.y;
    this.container.zIndex = positionY;
    this.container.addChild(this.sprite);
  }

  public speak = (popup: Popup) => {
    return popup.changeText(t(this.textKey), this.url, this.details);
  }
}