export type PlayerAction = "UP" | "DOWN" | "LEFT" | "RIGHT" | "INTERACT" | "";

export const handleKeyboardInput = (event: KeyboardEvent, activeKeys: Set<string>) => {
  if (event.type === "keydown") {
    activeKeys.add(event.key);
  } else if (event.type === "keyup") {
    activeKeys.delete(event.key);
  }
}

export const getActionFromKey = (activeKeys: Set<string>): PlayerAction => {
  if (activeKeys.has("W") || activeKeys.has("w") || activeKeys.has("Z") || activeKeys.has("z") || activeKeys.has("ArrowUp")) {
    return "UP";
  } else if (activeKeys.has("S") || activeKeys.has("s") || activeKeys.has("ArrowDown")) {
    return "DOWN";
  } else if (activeKeys.has("A") || activeKeys.has("a") || activeKeys.has("Q") || activeKeys.has("q") || activeKeys.has("ArrowLeft")) {
    return "LEFT";
  } else if (activeKeys.has("D") || activeKeys.has("d") || activeKeys.has("ArrowRight")) {
    return "RIGHT";
  } else if (activeKeys.has(" ") || activeKeys.has("Enter")) {
    return "INTERACT";
  }
  return "";
}