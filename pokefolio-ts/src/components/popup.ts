import { Application, Graphics, Text, type Renderer } from "pixi.js";

export const createPopup = (text: string, app: Application<Renderer>) => {
  const textBox = new Graphics();
  const boxWidth = app.screen.width;
  const boxHeight = 100;

  textBox.beginFill(0xffffff); // blanc
  textBox.drawRect(0, 0, boxWidth, boxHeight);
  textBox.endFill();
  app.stage.addChild(textBox);

  // Positionner la boîte en bas de l'écran
  textBox.y = app.screen.height - boxHeight;
  textBox.x = 0;

  // Cacher la boîte au départ
  textBox.visible = false;

  const message = new Text(text, {
    fontSize: 24,
    fill: 0x000000,
  });
  message.x = 20;
  message.y = app.screen.height - boxHeight + 20;
  
  message.visible = false;
  app.stage.addChild(message);

  return { textBox, message };
}