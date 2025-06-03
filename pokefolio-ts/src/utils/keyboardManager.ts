export const handleKeyboardInput = (event: KeyboardEvent, activeKeys: Set<string>) => {
  if (event.type === "keydown") {
    activeKeys.add(event.key);
  } else if (event.type === "keyup") {
    activeKeys.delete(event.key);
  }
}