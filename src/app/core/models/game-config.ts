import { AbstractControl, FormGroup } from "@angular/forms";

export interface GameConfig {
  playerName: string;
  cells: number;
  pits: number;
  arrows: number;
}

export interface GameConfigFormGroup extends FormGroup {
  value: GameConfig;
  controls: {
    playerName: AbstractControl;
    cells: AbstractControl;
  };
}

export enum Agent {
  Wumpus = 1,
  Pit,
  Gold
}