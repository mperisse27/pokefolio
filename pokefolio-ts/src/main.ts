import { Application, Assets, Container, Sprite } from 'pixi.js';

(async () =>
{
    const creategrassGrid = (width: number, height: number) => {
      for (let i = 0; i < width * height; i++) {
          const grass = new Sprite(grassTexture);
          grass.scale.set(5);
  
          grass.x = Math.floor((i % width) - (width / 2))  * 80;
          grass.y = Math.floor(Math.floor(i / width) - (height / 2)) * 80;
          container.addChild(grass);
      }
    }
    // Create a new application
    const app = new Application();

    // Initialize the application
    await app.init({ background: '#1099bb', resizeTo: window });

    // Append the application canvas to the document body
    document.body.appendChild(app.canvas);

    // Create and add a container to the stage
    const container = new Container();

    app.stage.addChild(container);

    // Load the bunny texture
    const grassTexture = await Assets.load('src/assets/grass.png');
    const playerTexture = await Assets.load('src/assets/player.png');
    const player2Texture = await Assets.load('src/assets/player2.png');
    grassTexture.baseTexture.scaleMode = 'nearest';
    playerTexture.baseTexture.scaleMode = 'nearest';
    player2Texture.baseTexture.scaleMode = 'nearest';

    // Create a 5x5 grid of bunnies in the container
    creategrassGrid(200, 200);

    // Create a player sprite
    const player = new Sprite(playerTexture);
    player.scale.set(5);
    player.x = 400;
    player.y = 400;
    container.addChild(player);

    // Create a house sprite
    const houseTexture = await Assets.load('src/assets/house.png');
    houseTexture.baseTexture.scaleMode = 'nearest';
    const house = new Sprite(houseTexture);
    house.scale.set(5);
    house.x = 400;
    house.y = 320;
    container.addChild(house);

    // Create Magnemite sprite
    const magnemiteTexture = await Assets.load('src/assets/magnemite.png');
    const magnemiteTexture2 = await Assets.load('src/assets/magnemite2.png');
    magnemiteTexture.baseTexture.scaleMode = 'nearest';
    magnemiteTexture2.baseTexture.scaleMode = 'nearest';
    const magnemite = new Sprite(magnemiteTexture);
    magnemite.scale.set(5);
    magnemite.x = 600;
    magnemite.y = 400;
    container.addChild(magnemite);

    let texture = 0;
    // Listen for animate update
    let elapsed = 0;
    app.ticker.add((time) =>
    {
      elapsed += 1;
      if (elapsed >= 30) {
        if (texture === 0) {
          player.texture = playerTexture
          magnemite.texture = magnemiteTexture;
          texture = 1
        } else {
          player.texture = player2Texture
          magnemite.texture = magnemiteTexture2;
          texture = 0
        }
        elapsed = 0 // reset le timer

        // if (Math.random() < 0.5) {
        //   if (Math.random() < 0.25) {
        //     magnemite.x -= 80;
        //   }
        //   else {
        //     magnemite.x += 80;
        //   }
        // }
      }
      magnemite.x -= 1;
    });
    window.addEventListener('keydown', (event) =>
      {
        switch (event.key)
        {
          case 'ArrowUp':
            player.y -= 80;
            break;
          case 'ArrowDown':
            player.y += 80;
            break;
          case 'ArrowLeft':
            player.x -= 80;
            break;
          case 'ArrowRight':
            player.x += 80;
            break;
          case ' ':
            container.position.x = container.position.x - 80;
            break;
        }
        if (Math.floor(-container.x + app.screen.width)/80 - Math.floor(player.x/80) < 3) {
          container.position.x = container.position.x - 80;
        }
        if (Math.floor(player.x/80) - Math.floor(-container.x/80) < 3) {
          container.position.x = container.position.x + 80;
        }
        console.log(Math.floor(player.x/80) - Math.floor(-container.x/80)); 
      });
})();
