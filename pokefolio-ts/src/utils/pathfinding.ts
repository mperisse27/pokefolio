import { AStarFinder } from 'astar-typescript';

// For now only tests
let newMatrix = Array.from({ length: 50 }, () => Array.from({ length: 50 }, () => Math.random() > 0.1 ? 0 : 1));

const aStarInstance = new AStarFinder({
  grid: {
    matrix: newMatrix
  },
  diagonalAllowed: false,
});

const start = { x: 0, y: 0 }; // Starting point
const end = { x:40 , y: 40 }; // Destination point

// Find the path from start to end
const startTime = performance.now();
const path = aStarInstance.findPath(start, end);
const endTime = performance.now();

// Log the time taken to find the path
console.log(`Pathfinding took ${endTime - startTime} milliseconds`);
console.log('Path from start to end:', path);
console.log(newMatrix);