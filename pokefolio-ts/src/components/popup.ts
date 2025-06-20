import { Graphics, Container, Application, type Renderer, Text } from "pixi.js";

export class Popup {
  public line1: HTMLElement;
  public line2: HTMLElement;
  public fullLine1: string = "";
  public fullLine2: string = "";
  public lineCounter: number = 0;
  public container: HTMLElement;
  public text: string[] = [];
  public onClick: (() => void) | null = null;

  constructor() {
    this.container = document.getElementById("popup")!;
    this.line1 = document.getElementById("popup-line1")!;
    this.line2 = document.getElementById("popup-line2")!;
    this.lineCounter = 0;
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
    container.interactive = true;
    container.zIndex = 1000; // Ensure the popup is above other elements

    return { container, line1, line2 };
  }

  public changeText(text: string[], url?: string): boolean {
    if (this.lineCounter == 0) {
      this.container.classList.remove("hidden");
      this.fullLine1 = text[0] ?? "";
      this.fullLine2 = text[1] ?? "";
      this.lineCounter = 2;
      if (url) {
        this.container.onclick = () => window.open(url, "_blank")?.focus();
        this.container.classList.add("cursor-pointer");
      }
    }
    else if (this.lineCounter < text.length) {
      this.line1.textContent = this.line2.textContent;
      this.line2.textContent = "";
      this.fullLine1 = text[this.lineCounter - 1] ?? "";
      this.fullLine2 = text[this.lineCounter] ?? "";
      this.lineCounter++;
    }
    else {
      this.container.classList.add("hidden");
      this.line1.textContent = "";
      this.line2.textContent = "";
      this.fullLine1 = "";
      this.fullLine2 = "";
      this.lineCounter = 0;
      this.container.onclick = null;
      this.container.classList.remove("cursor-pointer");
    }
    return this.lineCounter == 0;
  }

  public print() {
    if ((this.line1.textContent ?? "").length < this.fullLine1.length) {
      this.line1.textContent ??= "";
      this.line1.textContent += this.fullLine1[(this.line1.textContent ?? "").length];
    }
    if ((this.line2.textContent ?? "").length < this.fullLine2.length && (this.line1.textContent ?? "").length == this.fullLine1.length) {
      this.line2.textContent ??= "";
      this.line2.textContent += this.fullLine2[(this.line2.textContent ?? "").length];
    }
  }
}