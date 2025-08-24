import { Component, inject } from '@angular/core';
import { GameState } from '../../services/game-state';

@Component({
  selector: 'app-game-page',
  imports: [],
  templateUrl: './game-page.html',
  styleUrl: './game-page.css',
})
export class GamePage {
  private stateManager = inject(GameState);

  testState() {
    this.stateManager.procedeToScene('0');
  }
}
