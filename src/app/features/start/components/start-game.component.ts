import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GameConfig, GameConfigFormGroup } from 'src/app/core/models/game-config';
import { StartGameService } from '../services/start-game.service';

@Component({
  selector: 'app-start-game',
  templateUrl: './start-game.component.html',
  styleUrls: [ './start-game.component.sass' ]
})
export class StartGameComponent {
  form: GameConfigFormGroup;
  gameConfig: GameConfig;

  constructor(private formBuilder: FormBuilder, 
              private router: Router,
              private startGameService: StartGameService) {
    this.form = this.formBuilder.group({
      playerName: ['', [Validators.required]],
      cells: [0, Validators.maxLength(3)],
      pits: [0, Validators.maxLength(3)],
      arrows: [0, Validators.maxLength(3)]
    }) as GameConfigFormGroup;
    this.gameConfig = startGameService.gameConfig;
    this.form.patchValue(this.gameConfig);
  }

  startGame() {
    this.gameConfig = this.form.value;
    this.startGameService.gameConfig = this.gameConfig;
    this.router.navigate(['game']);
  }
}
