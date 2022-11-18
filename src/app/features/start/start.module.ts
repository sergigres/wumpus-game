import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { StartGameComponent } from "./components/start-game.component";
import { StartGameService } from "./services/start-game.service";
import { StartRoutingModule } from "./start-routing.module";

@NgModule({
  providers: [
    StartGameService,
  ],
  declarations: [
    StartGameComponent
  ],
  imports: [
    ReactiveFormsModule,
    StartRoutingModule
  ]
})
export class StartGameModule { }
