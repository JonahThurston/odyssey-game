import { Component, inject, OnInit } from '@angular/core';
import { GameState } from '../../services/game-state';
import { ResourceBar } from '../../components/resource-bar/resource-bar';
import { SceneDisplay } from '../../components/scene-display/scene-display';
import { SocialBar } from '../../components/social-bar/social-bar';

@Component({
  selector: 'app-game-page',
  imports: [ResourceBar, SceneDisplay, SocialBar],
  templateUrl: './game-page.html',
  styleUrl: './game-page.css',
})
export class GamePage implements OnInit {
  stateManager = inject(GameState);

  ngOnInit(): void {
    this.stateManager.procedeToScene(this.stateManager.sceneNumber());
  }
}
