import { TestBed, getTestBed } from '@angular/core/testing';
import { Board } from 'src/app/core/models/cell';
import { StartGameService } from './start-game.service';

describe('StartGameService', () => {
  let injector: TestBed;
  let service: StartGameService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StartGameService],
    });

    injector = getTestBed();
    service = injector.get(StartGameService);
  });

  it('constructor should build default data', () => {
      expect(service.gameConfig.playerName).toBe('default');
  });

  it('buildGameBoard', () => {
    service.buildGameBoard().subscribe((board: Board)=> {
      let pits = 0;
      let gold = 0;
      let wumpus = 0;
      for (let i = 0; i < service.gameConfig.cells; i++) {
        for (let j = 0; j < service.gameConfig.cells; j++) {
          const row = board.rows[j].cells[i];
          if (row && row.hasPit) {
            pits++;
          }
          if (row && row.hasGold) {
            gold++;
          }
          if (row && row.hasWumpus) {
            wumpus++;
          }
        }
      }
  
      expect(pits).toEqual(service.gameConfig.pits);
      expect(gold).toEqual(1);
      expect(wumpus).toEqual(1);
    });
});

});