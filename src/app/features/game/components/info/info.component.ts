import { Component } from '@angular/core';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: [ './info.component.sass' ]
})
export class InfoComponent {
  messages: string[];

  constructor() {
    this.messages = ['Welcome to the hunt for the Wumpus!'];
  }

  newMessage(message: string) {
    this.messages.push(message);
  }

  reset() {
    this.messages = [];
  }
}