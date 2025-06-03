import { Container, Graphics, Sprite, Text, TextStyle, type Application, type Renderer } from "pixi.js";

export class OptionsMenu {
  public button: Container;
  public menu: Container;

  constructor(app: Application<Renderer>, franceFlag: Sprite, ukFlag: Sprite) {
    const { button, menu } = this.buildContainer(app, franceFlag, ukFlag);
    this.button = button;
    this.menu = menu;
  }

  buildContainer = (app: Application<Renderer>, franceFlag: Sprite, ukFlag: Sprite) => {
    const buttonContainer = new Container();
    buttonContainer.zIndex = 1000;
    buttonContainer.x = app.screen.width - 100;
    buttonContainer.y = 20;

    const menuContainer = new Container();
    menuContainer.x = 0;
    menuContainer.y = 0;

    const helpMenuContent = new Graphics()
      .filletRect(0, 0, 300, 400, 16)
      .fill({color: 0x000000, alpha: 0.8});
    helpMenuContent.x = app.screen.width / 2 - 150;
    helpMenuContent.y = app.screen.height / 2 - 200;
    menuContainer.addChild(helpMenuContent);
    menuContainer.zIndex = 1000;

    franceFlag.interactive = true;
    franceFlag.width = 48;
    franceFlag.height = 32;
    franceFlag.x = helpMenuContent.x + 60;
    franceFlag.y = helpMenuContent.y + 24;
    franceFlag.onclick = () => {
      console.log('Langue : français');
    };
    menuContainer.addChild(franceFlag);

    ukFlag.interactive = true;
    ukFlag.width = 48;
    ukFlag.height = 32;
    ukFlag.x = helpMenuContent.x + helpMenuContent.width - ukFlag.width - 60;
    ukFlag.y = helpMenuContent.y + 24;
    ukFlag.onclick = () => {
      console.log('Language: English');
    };
    menuContainer.addChild(ukFlag);

    const helpButton = new Graphics()
      .filletRect(0, 0, 72, 72, 16)
      .fill({color: 0x999999, alpha: 0.9});
    helpButton.interactive = true;
    helpButton.onclick = (_) => {
      menuContainer.visible = !menuContainer.visible;
    };
    helpButton.onmouseenter = (_) => {
      helpButton.fill({ color: 0xffffff, alpha: 0.9 });
    };
    buttonContainer.addChild(helpButton);

    const helpText = new Text(
      {
        text: "?",
        style: new TextStyle({
          fontSize: 48,
          fill: 0xffffff,
          align: "center",
        }),
        anchor: { x: 0.5, y: 0.5 },
      }
    )
    helpText.x = 36;
    helpText.y = 36;
    buttonContainer.addChild(helpText);

    return { button: buttonContainer, menu: menuContainer};
  };
}