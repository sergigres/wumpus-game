import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StartGameComponent } from './components/start-game.component';
const routes: Routes = [
  {
    path: '',
    component: StartGameComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})export class StartRoutingModule { }