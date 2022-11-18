import { Component, ViewChild } from '@angular/core';
import { Board } from 'src/app/core/models/cell';
import { GameConfig } from 'src/app/core/models/game-config';
import { Direction, Player } from 'src/app/core/models/player';
import { StartGameService } from '../../start/services/start-game.service';
import { InfoComponent } from './info/info.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: [ './game.component.sass' ]
})
export class GameComponent {
  @ViewChild(InfoComponent) info!: InfoComponent;
  gameConfig: GameConfig;
  board: Board;
  player: Player;
  gameOver = false;
  gotGold = false;

  constructor(private startGameService: StartGameService) {
    this.gameConfig = this.startGameService.gameConfig;
    this.board = { rows: [] };
    this.player = { positionX: 0, positionY: 0, heading: Direction.Right };
    this.startGameService.buildGameBoard().subscribe((board: Board) => {
      this.board = board;
      this.board.rows[0].cells[0].player = this.player;
      this.board.rows[0].cells[0].visited = true;
    });
  }

  turnLeft(event: boolean) {
    const direction: number = this.player.heading;
    if (direction - 1 < 1) {
      this.player.heading = 4;
    } else {
      this.player.heading--;
    }

    this.board.rows[this.player.positionY].cells[this.player.positionX].player = this.player;
  }

  turnRight(event: boolean) {
    const direction: number = this.player.heading;
    if (direction + 1 > 4) {
      this.player.heading = 1;
    } else {
      this.player.heading++;
    }

    this.board.rows[this.player.positionY].cells[this.player.positionX].player = this.player;
  }

  advance(event: boolean) {
    switch(this.player.heading) {
      case(Direction.Up):
        if (this.player.positionY === 0) {
          this.info.newMessage('Wall!');
          return false;
        }
        this.move(this.player.positionX, this.player.positionY - 1);
        break;
      case(Direction.Right):
        if (this.player.positionX === this.gameConfig.cells - 1) {
          this.info.newMessage('Wall!');
          return false;
        }
        this.move(this.player.positionX + 1, this.player.positionY);
        break;
      case(Direction.Down):
        if (this.player.positionY === this.gameConfig.cells - 1) {
          this.info.newMessage('Wall!');
          return false;
        }
        this.move(this.player.positionX, this.player.positionY + 1);
        break;
      case(Direction.Left):
        if (this.player.positionX === 0) {
          this.info.newMessage('Wall!');
          return false;
        }
        this.move(this.player.positionX - 1, this.player.positionY);
        break;
    }
    return true;
  }

  private move(positionX: number, positionY: number) {
    this.board.rows[this.player.positionY].cells[this.player.positionX].player = undefined;
    this.player.positionX = positionX;
    this.player.positionY = positionY;
    this.board.rows[positionY].cells[positionX].player = this.player;
    this.board.rows[positionY].cells[positionX].visited = true;

    this.checkGold();
    this.checkSmells();
    this.checkBreeze();
    this.checkPit();
    this.checkWumpus(this.player.positionX, this.player.positionY);
  }

  private checkSmells() {
    if (this.board.rows[this.player.positionY].cells[this.player.positionX].smells) {
      this.info.newMessage('It smells like Wumpus spirit...');
    }
  }

  private checkBreeze() {
    if (this.board.rows[this.player.positionY].cells[this.player.positionX].breeze) {
      this.info.newMessage('You feel the breeze from the void...');
    }
  }

  private checkGold() {
    if (this.board.rows[this.player.positionY].cells[this.player.positionX].hasGold) {
      this.gotGold = true;
      this.board.rows[this.player.positionY].cells[this.player.positionX].hasGold = false;
      this.info.newMessage('You found the gold!');
    }
  }

  private checkPit() {
    if (this.board.rows[this.player.positionY].cells[this.player.positionX].hasPit) {
      this.info.newMessage('You fell into a pit and I guess you are dead now...');
      this.gameOver = true;
    }
  }
  
  private checkWumpus(x: number, y: number, arrow = false) {
    const myCell = this.board.rows[y].cells[x]; 
    if (myCell.hasWumpus) {
      if (arrow) {
        this.info.newMessage('Congratulations! You killed the Wumpus. Poor thing...');
      } else {
        this.info.newMessage('You meet the Wumpus. The Wumpus kills you. The game is over');
      }

      this.gameOver = true;
    } else {
      if (arrow) {
        this.info.newMessage('You missed the shot...');
      }
    }
  }

  shoot(event: boolean) {
    if (this.gameConfig.arrows > 0) {
      this.gameConfig.arrows--;
      let x = this.player.positionX;
      let y = this.player.positionY;
      switch(this.player.heading) {
        case(Direction.Up): y--; break;
        case(Direction.Right): x++; break;
        case(Direction.Down): y++; break;
        case(Direction.Left): x--; break;
      }

      this.checkWumpus(x, y, true);
    }
  }

  playAgain() {
    this.gameConfig.arrows = 5;
    this.player = { positionX: 0, positionY: 0, heading: Direction.Right };
    this.startGameService.buildGameBoard().subscribe((board: Board) => {
      this.board = board;
      this.board.rows[0].cells[0].player = this.player;
      this.board.rows[0].cells[0].visited = true;
    });
    this.gameOver = false;
    this.info.reset();
  }
}
