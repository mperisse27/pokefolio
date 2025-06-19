import type { NPC } from "../components/npc";
import type { Sign } from "../components/sign";
import type { Position } from "./position";

export type InteractiveElement = {
  position: Position;
  object: Sign | NPC;
  type: 'sign' | 'npc';
} 