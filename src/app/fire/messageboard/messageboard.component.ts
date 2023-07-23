import { Component } from '@angular/core';

@Component({
  selector: 'app-messageboard',
  templateUrl: './messageboard.component.html',
  styleUrls: ['./messageboard.component.css']
})
export class MessageboardComponent {
  constructor(){
    console.log('this is message board')
  }
}
