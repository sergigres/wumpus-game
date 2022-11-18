import { Injectable } from '@angular/core';
import { observable, Observable } from 'rxjs';
import { Board, Row, Cell } from 'src/app/core/models/cell';
import { GameConfig } from 'src/app/core/models/game-config';

@Injectable({ providedIn: 'root' })
export class StartGameService {
  private configKey = 'GameConfig';
  private boardKey = 'Board';
  private _gameConfig: GameConfig;
  private _board: Board;

  constructor() {
    this._gameConfig = {
      playerName: 'default',
      cells: 10,
      pits: 5,
      arrows: 5
    };
    this._board = {
      rows: []
    };
    localStorage.setItem(this.configKey, JSON.stringify(this._gameConfig));
  }

  get gameConfig(): GameConfig {
    this._gameConfig = JSON.parse(localStorage.getItem(this.configKey) as string);
    return this._gameConfig;
  }

  get board(): Board {
    const board = JSON.parse(localStorage.getItem(this.boardKey) as string);
    return board;
  }

  set gameConfig(value: GameConfig) {
    this._gameConfig = value;
    localStorage.setItem(this.configKey, JSON.stringify(this._gameConfig));
  }

  buildGameBoard(): Observable<Board> {
    const buildingBoard = new Observable<Board>((observer) => {
      this._board.rows = [];
      for(let i = 0; i < this._gameConfig.cells; i++) {
        const row: Row = { cells: [] };
        
        for(let j = 0; j < this._gameConfig.cells; j++) {
          const cell: Cell = { positionX: j, positionY: i };
          row.cells.push(cell);
        }
  
        this._board.rows.push(row);
      }
  
      localStorage.setItem(this.boardKey, JSON.stringify(this._board));
      this.setGold();
      this.setPits();
      this.setWumpus();

      observer.next(this._board);
      observer.complete();
    });

    return buildingBoard;
  }

  private setWumpus() {
    let freeCell = false;
    while(!freeCell) {
      const x = Math.floor(Math.random() * (this._gameConfig.cells));
      const y = Math.floor(Math.random() * (this._gameConfig.cells));
      if (!this.cellOccupied(x, y)) {
        freeCell = true;
        this._board.rows[y].cells[x].hasWumpus = true;
        if (x-1 >=0) { this._board.rows[y].cells[x-1].smells = true; }
        if (x+1 < this._gameConfig.cells) { this._board.rows[y].cells[x+1].smells = true; }
        if (y-1 >=0) { this._board.rows[y-1].cells[x].smells = true; }
        if (y+1 < this._gameConfig.cells) { this._board.rows[y+1].cells[x].smells = true; }
        console.log('The bumpus is at position: ' + x + '-' + y);
      }
    }
  }

  private setPits() {
    for(let i = 0; i < this._gameConfig.pits; i ++) {
      const x = Math.floor(Math.random() * (this._gameConfig.cells));
      const y = Math.floor(Math.random() * (this._gameConfig.cells));
      if (this.cellOccupied(x, y)) {
        i --;
      } else {
        this._board.rows[y].cells[x].hasPit = true;
        if (x-1 >=0) { this._board.rows[y].cells[x-1].breeze = true; }
        if (x+1 < this._gameConfig.cells) { this._board.rows[y].cells[x+1].breeze = true; }
        if (y-1 >=0) { this._board.rows[y-1].cells[x].breeze = true; }
        if (y+1 < this._gameConfig.cells) { this._board.rows[y+1].cells[x].breeze = true; }
      }
    }
  }

  private setGold() {
    let goldPlaced = false;
    while(!goldPlaced) {
      const x = Math.floor(Math.random() * (this._gameConfig.cells));
      const y = Math.floor(Math.random() * (this._gameConfig.cells));
      if (!this.cellOccupied(x, y)) {
        this._board.rows[y].cells[x].hasGold = true;
        goldPlaced = true;
        console.log('The gold is at position: ' + x + '-' + y);
      } 
    }
  }

  private cellOccupied(x: number, y: number): boolean | undefined {
    const cell = this._board.rows[y].cells[y];
    return cell.hasWumpus || cell.hasPit || cell.hasGold || (cell.positionX === 0 && cell.positionY === 0);
  }
}
