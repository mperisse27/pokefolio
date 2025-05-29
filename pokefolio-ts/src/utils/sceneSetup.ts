import type { Container, ContainerChild } from "pixi.js";
import { loadSprite, loadTexture } from "./loader";

export const createGridFromMatrix = async (matrix: number[][], container: Container<ContainerChild>) => {
  const grassTexture = await loadTexture('src/assets/tiles/grass.png');
  const roadTexture = await loadTexture('src/assets/tiles/road.png');
  const waterTexture = await loadTexture('src/assets/tiles/water.png');
  const signTexture = await loadTexture('src/assets/tiles/sign.png');
  matrix.forEach((row, i) => {
    row.forEach(async (cell, j) => {
      if (cell === 3) {
        const grass = loadSprite(j * 80, i * 80, grassTexture);
        grass.zIndex = -1; // Ensure grass is above road
        container.addChild(grass);
      }
      else if (cell === 10) {
        const road = loadSprite(j * 80, i * 80, roadTexture);
        road.zIndex = -1; // Ensure road is behind grass
        container.addChild(road);
      }
      else if (cell === 11) {
        const sign = loadSprite(j * 80, i * 80, signTexture);
        sign.zIndex = -1; // Ensure sign is above grass
        container.addChild(sign);
      }
      else {
        const tree = loadSprite(j * 80, i * 80, waterTexture);
        tree.zIndex = -1; // Ensure tree is above grass
        container.addChild(tree);
      }
    });
  });
}