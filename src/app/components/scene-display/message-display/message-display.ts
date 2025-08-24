import { Component, input } from '@angular/core';
import { Message } from '../../../services/types/scene';

@Component({
  selector: 'app-message-display',
  imports: [],
  templateUrl: './message-display.html',
  styleUrl: './message-display.css',
})
export class MessageDisplay {
  message = input.required<Message>();
}
