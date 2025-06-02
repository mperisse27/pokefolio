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

    const textBox = new Graphics();
    textBox.beginFill(0xffffff);
    textBox.drawRect(0, 0, boxWidth, boxHeight);
    textBox.endFill();
    textBox.y = app.screen.height - boxHeight;
    textBox.x = 0;
    textBox.zIndex = -1;
    container.addChild(textBox);

    // Add borders
    const borderLeft = new Graphics();
    borderLeft.beginFill(0x000000);
    borderLeft.drawRect(0, 0, 8, boxHeight);
    borderLeft.endFill();
    borderLeft.x = 0;
    borderLeft.y = app.screen.height - boxHeight;
    container.addChild(borderLeft);

    const borderRight = new Graphics();
    borderRight.beginFill(0x000000);
    borderRight.drawRect(boxWidth - 8, 0, 8, boxHeight);
    borderRight.endFill();
    borderRight.x = 0;
    borderRight.y = app.screen.height - boxHeight;
    container.addChild(borderRight);

    const borderTop = new Graphics();
    borderTop.beginFill(0x000000);
    borderTop.drawRect(0, 0, boxWidth, 8);
    borderTop.endFill();
    borderTop.x = 0;
    borderTop.y = app.screen.height - boxHeight;
    container.addChild(borderTop);

    const borderBottom = new Graphics();
    borderBottom.beginFill(0x000000);
    borderBottom.drawRect(0, boxHeight - 8, boxWidth, 8);
    borderBottom.endFill();
    borderBottom.x = 0;
    borderBottom.y = app.screen.height - boxHeight;
    container.addChild(borderBottom);

    const message1 = new Text("", {
      fontSize: 24,
      fill: 0x000000,
    });
    message1.x = 16;
    message1.y = app.screen.height - boxHeight + 12;
    container.addChild(message1);
  
    const message2 = new Text("", {
      fontSize: 24,
      fill: 0x000000,
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
      return;
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