import { inject, Injectable, signal } from '@angular/core';
import { FlagRecord, initialFlags } from './types/flag-record';
import { initialResources, ResourceRecord } from './types/resources-record';
import {
  initialRelationships,
  RelationshipRecord,
} from './types/relationship-record';
import { Scene, SceneSchema } from './types/scene';
import { HttpClient } from '@angular/common/http';
import { map, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GameState {
  public questTitle = signal<string>('prologue');
  public sceneNumber = signal<string>('0');

  public flags = signal<FlagRecord>(initialFlags);
  public resources = signal<ResourceRecord>(initialResources);
  public relationships = signal<RelationshipRecord>(initialRelationships);

  public currentScene = signal<Scene | undefined>(undefined);

  private http = inject(HttpClient);

  public procedeToScene(sceneId: string) {
    if (sceneId === 'overworld') {
      this.questTitle.set('overworld');
      this.sceneNumber.set('0');
    } else {
      this.sceneNumber.set(sceneId);
    }

    const url = `/dialogue/${this.questTitle()}/scene${this.sceneNumber()}.json`;

    this.http
      .get<unknown>(url)
      .pipe(
        map((raw) => {
          const parsed = SceneSchema.safeParse(raw);
          if (!parsed.success) {
            const details = parsed.error.errors
              .map((e) => `${e.path.join('.') || '(root)'}: ${e.message}`)
              .join('; ');
            throw new Error(`Scene validation failed: ${details}`);
          }
          return parsed.data;
        }),
        catchError((err) => {
          console.error('Failed to load/validate scene', err);
          return throwError(() => err);
        })
      )
      .subscribe({
        next: (sceneObj) => {
          this.currentScene.set(sceneObj);
          console.log(this.currentScene());
        },
        error: () => {
          // already logged
        },
      });
  }
}
