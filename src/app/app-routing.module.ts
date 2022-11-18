import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/homepage/homepage.component';

const routes: Routes = [
  { path: '', redirectTo: '/start', pathMatch: 'full' },
  { 
    path: 'start', 
    component: HomePageComponent,
    loadChildren: () => import('./features/start/start.module').then(m => m.StartGameModule)
  },
  { 
    path: 'game', 
    component: HomePageComponent,
    loadChildren: () => import('./features/game/game.module').then(m => m.GameModule)
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
