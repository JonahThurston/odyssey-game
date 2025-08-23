import { inject, Injectable, linkedSignal, signal } from '@angular/core';
import { FlagRecord, initialFlags } from './types/flag-record';
import { initialResources, ResourceRecord } from './types/resources-record';
import {
  initialRelationships,
  RelationshipRecord,
} from './types/relationship-record';
import { Scene } from './types/scene';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GameState {
  public questTitle = signal<string>('prologue');
  public sceneNumber = signal<number>(0);

  public flags = signal<FlagRecord>(initialFlags);
  public resources = signal<ResourceRecord>(initialResources);
  public relationships = signal<RelationshipRecord>(initialRelationships);

  public currentScene = signal<Scene | undefined>(undefined);

  private http = inject(HttpClient);

  public procedeToScene(sceneId: number) {
    if (sceneId === -1) {
      this.questTitle.set('overworld');
      this.sceneNumber.set(0);
    } else {
      this.sceneNumber.set(sceneId);
    }

    const url = `/dialogue/${this.questTitle()}/scene${this.sceneNumber()}.json`;
    let sceneJson: any;

    this.http.get(url).subscribe((res) => {
      sceneJson = res;
    });

    const sceneObj = JSON.parse(sceneJson);
    //TODO: verify that sceneObj is  scene
    this.currentScene.set(sceneObj);
  }
}
