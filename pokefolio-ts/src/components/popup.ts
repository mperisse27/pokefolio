import { Graphics, Container, Application, type Renderer, Text } from "pixi.js";

export class Popup {
  public line1: Text;
  public line2: Text;
  public lineCounter: number = 0;
  public container: Container;
  public text: string[] = [];

  constructor(app: Application<Renderer>) {
    const { container, line1, line2 } = this.buildContainer(app);
    this.container = container;
    this.line1 = line1;
    this.line2 = line2;
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

    const line1 = new Text({
      text: "",
      style: {
        fontFamily: "my32bit",
        fontSize: 32,
        fill: 0x000000,
      }
    });
    line1.x = 16;
    line1.y = app.screen.height - boxHeight + 12;
    container.addChild(line1);
  
    const line2 = new Text({
      text: "",
      style: {
        fontFamily: "my32bit",
        fontSize: 32,
        fill: 0x000000,
      }
    });
    line2.x = 16;
    line2.y = app.screen.height - boxHeight + 50;
    container.addChild(line2);

    container.visible = false;
    container.zIndex = 1000; // Ensure the popup is above other elements

    return { container, line1, line2 };
  }

  public print(text: string[]) {
    if (this.lineCounter == 0) {
      this.container.visible = true;
      this.line1.text = text[0] ?? "";
      this.line2.text = text[1] ?? "";
      this.lineCounter = 2;
    }
    else if (this.lineCounter < text.length) {
      this.line1.text = text[this.lineCounter - 1] ?? "";
      this.line2.text = text[this.lineCounter] ?? "";
      this.lineCounter++;
    }
    else {
      this.container.visible = false;
      this.line1.text = "";
      this.line2.text = "";
      this.lineCounter = 0;
    }
    return this.lineCounter == 0;
  }
}