import { Container, type Sprite } from "pixi.js";
import type { Position } from "../types/position";
import type { Popup } from "./popup";

export class Sign {
  public sprite: Sprite;
  public tilePosition: Position;
  public container: Container;
  public position: Position;
  public text: { en: string[], fr: string[] };
  public url?: string;

  constructor(
    sprite: Sprite,
    positionX: number = 0,
    positionY: number = 0,
    text: { en: string[], fr: string[] },
    url?: string
  ) {
    this.sprite = sprite;
    this.tilePosition = { x: positionX, y: positionY };
    this.position = { x: positionX * 80, y: positionY * 80 };
    this.text = text;
    this.url = url;

    this.container = new Container();
    this.container.x = this.position.x;
    this.container.y = this.position.y;
    this.container.zIndex = positionY;
    this.container.addChild(this.sprite);
  }

  public speak = (popup: Popup, lang: "fr" | "en") => {
    return popup.changeText(this.text[lang], this.url);
  }
}