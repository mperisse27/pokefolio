import { Direction, type Player } from "../components/player";
import type { PopupMessage } from "../types/popupMessage";
import type { Popup } from "../components/popup";

export const handleKeyboardInput = (event: KeyboardEvent, player: Player, matrix: number[][], popup: Popup, messages: PopupMessage[]) => {
  switch (event.key)
    {
      case 'W':
      case 'w':
      case 'ArrowUp':
        if (player.canMove) {
          player.move(Direction.UP, matrix);
        }
        break;
      case 'S':
      case 's':
      case 'ArrowDown':
        if (player.canMove) {
          player.move(Direction.DOWN, matrix);
        }
        break;
      case 'A':
      case 'a':
      case 'ArrowLeft':
        if (player.canMove) {
          player.move(Direction.LEFT, matrix);
        }
        break;
      case 'D':
      case 'd':
      case 'ArrowRight':
        if (player.canMove) {
          player.move(Direction.RIGHT, matrix);
        }
        break;
      case ' ':
      case 'Enter':
        player.canMove = !popup.getText(messages, player);
        break;
    }
  }