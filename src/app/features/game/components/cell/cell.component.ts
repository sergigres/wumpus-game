import { Component, Input } from '@angular/core';
import { Cell } from 'src/app/core/models/cell';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: [ './cell.component.sass' ]
})
export class CellComponent {
  @Input()
  cell: Cell = { };

  @Input()
  gameOver = false;
}