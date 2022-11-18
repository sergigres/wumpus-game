import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from './shared/shared.module';
import { HomePageComponent } from './pages/homepage/homepage.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    SharedModule
  ],
  declarations: [
    AppComponent,
    HomePageComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
