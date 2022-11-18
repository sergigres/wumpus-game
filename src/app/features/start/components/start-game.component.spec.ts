import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { GameComponent } from '../../game/components/game.component';
import { StartGameService } from '../services/start-game.service';
import { StartGameComponent } from './start-game.component';


describe('StartGameComponent', () => {
  let component: StartGameComponent;
  let fixture: ComponentFixture<StartGameComponent>;
  let startGameService;
  let routerSpy = {navigate: jasmine.createSpy('navigate')};

  beforeEach(waitForAsync(() => {
    startGameService = jasmine.createSpyObj('StartGameService', {}, { gameConfig: { playerName: 'test' } });
    TestBed.configureTestingModule({
      declarations: [StartGameComponent],
      imports: [RouterTestingModule.withRoutes([{path: 'game', component: GameComponent}]), ReactiveFormsModule],
      providers: [
        FormBuilder, 
        { provide: StartGameService, useValue: startGameService },
        { provide: Router, useValue: routerSpy }
    ]
    }).compileComponents();

    fixture = TestBed.createComponent(StartGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should be created', () => {
    expect(component).toBeTruthy();
  });


  it('should have gotten the game config correctly and display it on the form', () => {
    expect(component.gameConfig.playerName).toEqual('test');
    expect(component.form.controls.playerName.value).toEqual('test');
  });

  it('should start the game', () => {
    component.startGame();
    expect (routerSpy.navigate).toHaveBeenCalledWith(['game']);
  });

});
