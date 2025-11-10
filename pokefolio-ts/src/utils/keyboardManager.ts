import { PlayerAction } from "../types/playerAction";

export const handleKeyboardInput = (event: KeyboardEvent, activeKeys: Set<string>) => {
  //Prevent issues with pressing Shift giving different results like "a" and "A"
  const keyToAnalyse = event.key.length === 1 ? event.key.toUpperCase() : event.key;

  if (event.type === "keydown") {
    activeKeys.add(keyToAnalyse);
  } else if (event.type === "keyup") {
    activeKeys.delete(keyToAnalyse);
  }
}

export const getActionFromKey = (activeKeys: Set<string>, activeButtons: Set<string>): PlayerAction[] => {
  const actions: PlayerAction[] = [];
  if (activeKeys.has(" ") || activeKeys.has("Enter") || activeButtons.has("interact")) {
    actions.push(PlayerAction.INTERACT);
  }

  if (activeKeys.has("S") || activeKeys.has("ArrowDown") || activeButtons.has("down")) {
    actions.push(PlayerAction.DOWN);
  }
  if (activeKeys.has("A") || activeKeys.has("Q") || activeKeys.has("ArrowLeft") || activeButtons.has("left")) {
    actions.push(PlayerAction.LEFT);
  }
  if (activeKeys.has("D") || activeKeys.has("ArrowRight") || activeButtons.has("right")) {
    actions.push(PlayerAction.RIGHT);
  }
  if (activeKeys.has("W") || activeKeys.has("Z") || activeKeys.has("ArrowUp") || activeButtons.has("up")) {
    actions.push(PlayerAction.UP);
  }

  if (activeKeys.has("Shift") || activeButtons.has("sprint")) {
    actions.push(PlayerAction.SPRINT);
  }
  return actions;
}