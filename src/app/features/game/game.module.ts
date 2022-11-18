import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ButtonsComponent } from "./components/buttons/buttons.component";
import { CellComponent } from "./components/cell/cell.component";
import { GameComponent } from "./components/game.component";
import { InfoComponent } from "./components/info/info.component";
import { GameRoutingModule } from "./game-routing.module";

@NgModule({
  providers: [
  ],
  declarations: [
    GameComponent,
    CellComponent,
    InfoComponent,
    ButtonsComponent
  ],
  imports: [
    GameRoutingModule,
    CommonModule
  ]
})
export class GameModule { }
