import { PlayerAction } from "./playerAction";

export enum Direction {
  RIGHT = "RIGHT",
  LEFT = "LEFT",
  UP = "UP",
  DOWN = "DOWN",
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

export const getDirectionFromPlayerAction = (action: PlayerAction) => {
  switch (action) {
    case PlayerAction.UP:
      return Direction.UP;
    case PlayerAction.DOWN:
      return Direction.DOWN;
    case PlayerAction.LEFT:
      return Direction.LEFT;
    case PlayerAction.RIGHT:
      return Direction.RIGHT;
    default:
      return null;
  }
}

export const getDirectionFromText = (text: string) => {
  switch (text.toLowerCase()) {
    case "left":
      return Direction.LEFT
    case "right":
      return Direction.RIGHT
    case "down":
      return Direction.DOWN
    case "up":
      return Direction.UP
    default:
      return Direction.DOWN
  }
}