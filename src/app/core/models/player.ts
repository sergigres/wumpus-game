export interface Player {
  positionX: number;
  positionY: number;
  heading: Direction;
}

export enum Direction {
  Right = 1,
  Down,
  Left,
  Up,
}