import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Cell } from 'src/app/core/models/cell';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: [ './buttons.component.sass' ]
})
export class ButtonsComponent {
  @Input()
  cell: Cell = { };

  @Output() turnLeft = new EventEmitter<boolean>();
  @Output() turnRight = new EventEmitter<boolean>();
  @Output() advance = new EventEmitter<boolean>();
  @Output() shoot = new EventEmitter<boolean>();


  doTurnLeft() {
    this.turnLeft.emit(true);
  }
  
  doTurnRight() {
    this.turnRight.emit(true);
  }
  
  doAdvance() {
    this.advance.emit(true);
  }
  
  doShoot() {
    this.shoot.emit(true);
  }
}