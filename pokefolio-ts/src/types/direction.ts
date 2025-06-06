export enum Direction {
  RIGHT,
  LEFT,
  UP,
  DOWN
}

export const getOppositeDirection = (direction: Direction): Direction => {
  switch (direction) {
    case Direction.RIGHT:
      return Direction.LEFT;
    case Direction.LEFT:
      return Direction.RIGHT;
    case Direction.UP:
      return Direction.DOWN;
    case Direction.DOWN:
      return Direction.UP;
    default:
      throw new Error("Invalid direction");
  }
}