import { Graphics, Container, Application, type Renderer, Text } from "pixi.js";
import { Direction, type Player } from "./player";
import type { PopupMessage } from "../types/popupMessage";

export class Popup {
  public message1: Text;
  public message2: Text;
  public container: Container;
  public text: string[] = [];

  constructor(app: Application<Renderer>) {
    const { container, message1, message2 } = this.buildContainer(app);
    this.container = container;
    this.message1 = message1;
    this.message2 = message2;
  }

  buildContainer = (app: Application<Renderer>) => {
    const container = new Container();
    const boxWidth = app.screen.width;
    const boxHeight = 100;

    const textBox = new Graphics()
      .rect(0, 0, boxWidth, boxHeight)
      .fill(0xffffff)
      .stroke({ color: 0x000000, width: 8 });
    textBox.y = app.screen.height - boxHeight;
    textBox.x = 0;
    textBox.zIndex = -1;
    container.addChild(textBox);

    const message1 = new Text({
      text: "",
        style: {
        fontSize: 24,
        fill: 0x000000,
      }
    });
    message1.x = 16;
    message1.y = app.screen.height - boxHeight + 12;
    container.addChild(message1);
  
    const message2 = new Text({
      text: "",
        style: {
        fontSize: 24,
        fill: 0x000000,
      }
    });
    message2.x = 16;
    message2.y = app.screen.height - boxHeight + 50;
    container.addChild(message2);

    container.visible = false;

    return { container, message1, message2 };
  }

  public getText(messages: PopupMessage[], player: Player) {
    if (this.container.visible) {
      this.container.visible = false;
      this.message1.text = "";
      this.message2.text = "";
      return false;
    }
    let targetX = player.position.x;
    let targetY = player.position.y;
    switch (player.facing) {
      case Direction.UP:
        targetY -= 80;
        break;
      case Direction.DOWN:
        targetY += 80;
        break;
      case Direction.LEFT:
        targetX -= 80;
        break;
      case Direction.RIGHT:
        targetX += 80;
        break;
    }

    let messageFound = false;
    messages.forEach((message) => {
      if (message.positionX === targetX && message.positionY === targetY) {
        this.text = message.text;

        this.message1.text = this.text[0] || "";
        this.message2.text = this.text[1] || "";
        this.container.visible = true;
        messageFound = true;
      }
    })
    return messageFound;
  }
}