import type { InteractiveElement } from "../types/interactiveElement";
import type { Obstacle } from "../types/obstacle";
import type { Tile } from "../types/tile";

export const isWalkableTile = (x: number, y: number, walkableMatrix: number[][]) => {
  if (y < 0 || y >= walkableMatrix.length || x < 0 || x >= walkableMatrix[0].length) return false;
  return walkableMatrix[y][x] === 0;
}

export const createWalkableMatrix = (groundMatrix: number[][], obstaclesMatrix: number[][], allTiles: Tile[], allObstacles: Obstacle[], interactiveElements: InteractiveElement[]) => {
  const walkableMatrix: number[][] =  Array.from({ length: groundMatrix.length }, () => Array(groundMatrix[0].length).fill(0));
  
  for (let y = 0; y < groundMatrix.length; y++) {
    for (let x = 0; x < groundMatrix[0].length; x++) {
      const tile = allTiles.find(t => t.id == groundMatrix[y][x]);
      if (!tile || !tile.isWalkable) {
        walkableMatrix[y][x] = 1;
      }
      const obstacle = allObstacles.find(o => o.id == obstaclesMatrix[y][x]);
      if (obstacle) {
        // Mark the area occupied by the obstacle as non-walkable
        for (let obsY = 0; obsY < obstacle.hitbox.y; obsY++) {
          for (let obsX = 0; obsX < obstacle.hitbox.x; obsX++) {
            walkableMatrix[y - obsY][x + obsX] = 1; // Adjusting for the obstacle's position
          }
        }
      }
      if (interactiveElements.some(element => element.position.x === x && element.position.y === y)) {
        walkableMatrix[y][x] = 1; // Mark interactive elements as non-walkable
      }
    }
  }

  return walkableMatrix;
}