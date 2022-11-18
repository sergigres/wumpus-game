import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: [ './homepage.component.sass' ]
})
export class HomePageComponent implements OnInit {
  
  constructor(private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle('Wumpus game!');
  }
}
