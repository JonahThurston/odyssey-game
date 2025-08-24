import { Component, inject, input, output } from '@angular/core';
import { Choice } from '../../../services/types/scene';
import { GameState } from '../../../services/game-state';

@Component({
  selector: 'app-choice-display',
  imports: [],
  templateUrl: './choice-display.html',
  styleUrl: './choice-display.css',
})
export class ChoiceDisplay {
  choice = input.required<Choice>();
  stateManager = inject(GameState);

  choose() {
    this.stateManager.procedeToScene(this.choice().nextSceneId);
  }
}
