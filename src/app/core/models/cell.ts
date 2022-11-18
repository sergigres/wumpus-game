import { Player } from "./player";

export interface Cell {
  positionX?: number;
  positionY?: number;
  player?: Player;
  hasWumpus?: boolean;
  hasPit?: boolean;
  hasGold?: boolean;
  smells?: boolean;
  breeze?: boolean;
  visited?: boolean;
}

export interface Row {
  cells: Cell[];
}

export interface Board {
  rows: Row[];
}