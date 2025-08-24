import { Component, inject } from '@angular/core';
import { GameState } from '../../services/game-state';

@Component({
  selector: 'app-resource-bar',
  imports: [],
  templateUrl: './resource-bar.html',
  styleUrl: './resource-bar.css',
})
export class ResourceBar {
  stateManager = inject(GameState);
  resources = ['manpower', 'supplies', 'munitions'];
  stats = ['wit', 'physicality'];

  getValue(key: string): string {
    const record = this.stateManager.resources();
    if (key in record) {
      return record[key].toString();
    } else {
      return `error: could not find: ${key}`;
    }
  }
}
