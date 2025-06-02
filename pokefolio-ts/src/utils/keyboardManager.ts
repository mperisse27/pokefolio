import { Direction, type Player } from "../components/player";
import type { PopupMessage } from "../types/popupMessage";
import type { Popup } from "../components/popup";

export const handleKeyboardInput = (event: KeyboardEvent, player: Player, matrix: number[][], popup: Popup, messages: PopupMessage[]) => {
  switch (event.key)
    {
      case 'ArrowUp':
        if (player.canMove) {
          player.move(Direction.UP, matrix);
        }
        break;
      case 'ArrowDown':
        if (player.canMove) {
          player.move(Direction.DOWN, matrix);
        }
        break;
      case 'ArrowLeft':
        if (player.canMove) {
          player.move(Direction.LEFT, matrix);
        }
        break;
      case 'ArrowRight':
        if (player.canMove) {
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