import { Container, type Sprite } from "pixi.js";
import type { Position } from "../types/position";
import type { Popup } from "./popup";
import { t } from "../utils/i18n";
import { TILE_SIZE } from "../utils/constants";
import type { AchievementManager } from "./achievements";
import { playSoundEffect } from "./sounds";

export class Sign {
  public sprite: Sprite;
  public tilePosition: Position;
  public container: Container;
  public position: Position;
  public textKey: string;
  public url?: string;
  public details?: string;
  public pokeball?: boolean;

  constructor(
    sprite: Sprite,
    positionX: number = 0,
    positionY: number = 0,
    textKey: string,
    url?: string,
    details?: string,
    pokeball?: boolean
  ) {
    this.sprite = sprite;
    this.tilePosition = { x: positionX, y: positionY };
    this.position = { x: positionX * TILE_SIZE, y: positionY * TILE_SIZE };
    this.url = url;
    this.textKey = textKey;
    this.details = details;
    this.pokeball = pokeball;

    this.container = new Container();
    this.container.x = this.position.x;
    this.container.y = this.position.y;
    this.container.zIndex = positionY;
    this.container.addChild(this.sprite);
  }

  public speak = (popup: Popup, achievementManager: AchievementManager) => {
    const canMove = popup.changeText(t(this.textKey), this.url, this.details);
    if (this.pokeball) {
      achievementManager.foundPokeballs.add(this.tilePosition);
      if (this.textKey !== "pokeballFound") { // This check prevents retriggering the same pokeball
        playSoundEffect("obtainedItem", true);
        this.textKey = "pokeballFound";
      }
    }
    return canMove;
  }
}