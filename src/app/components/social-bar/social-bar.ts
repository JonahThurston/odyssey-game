import { Component, inject } from '@angular/core';
import { GameState } from '../../services/game-state';

@Component({
  selector: 'app-social-bar',
  imports: [],
  templateUrl: './social-bar.html',
  styleUrl: './social-bar.css',
})
export class SocialBar {
  stateManager = inject(GameState);

  morality = ['honor', 'mercy'];
  relationships = ['crew', 'firstMate'];

  getValue(key: string): string {
    const record = this.stateManager.relationships();
    if (key in record) {
      return record[key].toString();
    } else {
      return `error: could not find: ${key}`;
    }
  }
}
