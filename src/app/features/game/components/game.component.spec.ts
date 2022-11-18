import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { Board } from 'src/app/core/models/cell';
import { GameConfig } from 'src/app/core/models/game-config';
import { Direction } from 'src/app/core/models/player';
import { StartGameService } from '../../start/services/start-game.service';
import { GameComponent } from './game.component';
import { InfoComponent } from './info/info.component';


describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;
  let startGameService;
  let routerSpy = {navigate: jasmine.createSpy('navigate')};
  let startGameSpy: jasmine.Spy;
  const fakeBoard: Board = {
    rows: [
      { cells: [ { positionX: 0, positionY: 0 }, { positionX: 1, positionY: 0, hasWumpus: true }] },
      { cells: [ { positionX: 0, positionY: 1, hasGold: true }, { positionX: 1, positionY: 1, hasPit: true }] }
    ]
  };
  const fakeConfig: GameConfig = {
    playerName: 'default',
    cells: 10,
    arrows: 5,
    pits: 5
  }

  beforeEach(waitForAsync(() => {
    startGameService = jasmine.createSpyObj('StartGameService', ['buildGameBoard', 'gameConfig']);
    startGameSpy = startGameService.buildGameBoard.and.returnValue(of(fakeBoard));
    startGameService.gameConfig = fakeConfig;

    TestBed.configureTestingModule({
      declarations: [GameComponent, InfoComponent],
      imports: [RouterTestingModule.withRoutes([{path: 'game', component: GameComponent}]), ReactiveFormsModule],
      providers: [
        FormBuilder, 
        { provide: StartGameService, useValue: startGameService },
        { provide: Router, useValue: routerSpy }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should have build the board', () => {
    expect(startGameSpy).toHaveBeenCalled();
    expect(component.board.rows[0].cells[0].player).toBeDefined();
    setTimeout(() => {
      expect(component.board.rows.length).toEqual(fakeConfig.cells);
    }, 1000);
  });

  it('shoot', () => {
    const arrowNumber = fakeConfig.arrows;
    expect(component.gameConfig.arrows).toBe(arrowNumber);
    component.shoot(true);
    expect(component.gameConfig.arrows).toBe(arrowNumber - 1);
    component.advance(true);
    component.player.heading = Direction.Down;
    component.shoot(true);
    expect(component.gameConfig.arrows).toBe(arrowNumber - 2);
  });

  it('turn left', () => {
    expect(component.player.heading).toBe(Direction.Right);
    component.turnLeft(true);
    expect(component.player.heading).toBe(Direction.Up);
    component.turnLeft(true);
    component.turnLeft(true);
    component.turnLeft(true);
    expect(component.player.heading).toBe(Direction.Right);
  });

  it('turn right', () => {
    expect(component.player.heading).toBe(Direction.Right);
    component.turnRight(true);
    expect(component.player.heading).toBe(Direction.Down);
    component.turnRight(true);
    component.turnRight(true);
    component.turnRight(true);
    expect(component.player.heading).toBe(Direction.Right);
  });

  
  it('advance', () => {
    let x = component.player.positionX;
    let y = component.player.positionY;
    component.advance(true);
    expect(component.player.positionX).toEqual(x + 1);
    component.turnRight(true);
    component.advance(true);
    expect(component.player.positionY).toEqual(y + 1);
    component.turnRight(true);
    component.advance(true);
    expect(component.player.positionX).toEqual(x);
    component.turnRight(true);
    component.advance(true);
    expect(component.player.positionY).toEqual(y);
  });

  it('out of limits', () => {
    for(let i = 0; i < 3; i ++) {
      setTimeout(() => {
        component.advance(true);
      }, 1000); 
    }
    
    setTimeout(() => {
      expect(component.player.positionX).toEqual(component.gameConfig.cells - 1);  
    }, 1100);
  });

  it('play again', () => {
    component.playAgain();
    expect(startGameSpy).toHaveBeenCalledTimes(2);
  });

});
