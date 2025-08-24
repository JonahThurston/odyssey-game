import { Component, input } from '@angular/core';
import { Scene } from '../../services/types/scene';
import { MessageDisplay } from './message-display/message-display';
import { ChoiceDisplay } from './choice-display/choice-display';

@Component({
  selector: 'app-scene-display',
  imports: [MessageDisplay, ChoiceDisplay],
  templateUrl: './scene-display.html',
  styleUrl: './scene-display.css',
})
export class SceneDisplay {
  scene = input<Scene>();
}
