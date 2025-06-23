import { PlayerAction } from "../types/playerAction";

export const handleKeyboardInput = (event: KeyboardEvent, activeKeys: Set<string>) => {
  if (event.type === "keydown") {
    activeKeys.add(event.key);
  } else if (event.type === "keyup") {
    activeKeys.delete(event.key);
  }
}

export const getActionFromKey = (activeKeys: Set<string>): PlayerAction[] => {
  const actions: PlayerAction[] = [];
  if (activeKeys.has(" ") || activeKeys.has("Enter")) {
    actions.push(PlayerAction.INTERACT);
  }

  if (activeKeys.has("S") || activeKeys.has("s") || activeKeys.has("ArrowDown")) {
    actions.push(PlayerAction.DOWN);
  }
  if (activeKeys.has("A") || activeKeys.has("a") || activeKeys.has("Q") || activeKeys.has("q") || activeKeys.has("ArrowLeft")) {
    actions.push(PlayerAction.LEFT);
  }
  if (activeKeys.has("D") || activeKeys.has("d") || activeKeys.has("ArrowRight")) {
    actions.push(PlayerAction.RIGHT);
  }
  if (activeKeys.has("W") || activeKeys.has("w") || activeKeys.has("Z") || activeKeys.has("z") || activeKeys.has("ArrowUp")) {
    actions.push(PlayerAction.UP);
  }

  if (activeKeys.has("Shift")) {
    actions.push(PlayerAction.SPRINT);
  }
  return actions;
}