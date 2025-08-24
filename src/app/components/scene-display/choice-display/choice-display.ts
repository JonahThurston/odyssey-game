import { Component, inject, input } from '@angular/core';
import { GameState } from '../../../services/game-state';
import { Choice } from '../../../services/types/scene';

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
