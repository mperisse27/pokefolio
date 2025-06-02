import { Direction, type Player } from "../types/player";
import type { PopupMessage } from "../types/popupMessage";
import type { Popup } from "../components/popup";

export const handleKeyboardInput = (event: KeyboardEvent, player: Player, matrix: number[][], popup: Popup, messages: PopupMessage[]) => {
  switch (event.key)
    {
      case 'ArrowUp':
        if (!player.isMoving) {
          player.move(Direction.UP, matrix);
        }
        break;
      case 'ArrowDown':
        if (!player.isMoving) {
          player.move(Direction.DOWN, matrix);
        }
        break;
      case 'ArrowLeft':
        if (!player.isMoving) {
          player.move(Direction.LEFT, matrix);
        }
        break;
      case 'ArrowRight':
        if (!player.isMoving) {
          player.move(Direction.RIGHT, matrix);
        }
        break;
      case 'Enter':
        player.canMove = !popup.getText(messages, player);
        break;
      case ' ':
        player.canMove = !popup.getText(messages, player);
        break;
    }
  }