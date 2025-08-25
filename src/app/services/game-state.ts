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

  public procedeToScene(sceneId: string, skipEffects?: boolean) {
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
            //chat generated code to make the error readable
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
      .subscribe((sceneObj) => {
        this.currentScene.set(sceneObj);

        if (!skipEffects && sceneObj.effects) {
          const { resourceEffects, relationshipEffects, flagEffects } =
            sceneObj.effects;
          this.applyEffects(resourceEffects, relationshipEffects, flagEffects);
        }

        console.log(this.currentScene());
      });
  }

  public applyEffects(
    resourceEffects?: ResourceRecord,
    relationshipEffects?: RelationshipRecord,
    flagEffects?: string[],
    undo?: boolean
  ) {
    let multiplier = 1;
    if (undo) {
      multiplier = -1;
    }
    if (resourceEffects) {
      this.resources.update((prevRecord) => {
        const updatedRecord = { ...prevRecord };

        for (const resource in resourceEffects) {
          if (!(resource in updatedRecord)) {
            throw new Error(`Unknown resource key: ${resource}`);
          }

          updatedRecord[resource] =
            updatedRecord[resource] + multiplier * resourceEffects[resource];
        }

        return updatedRecord;
      });
    }

    if (relationshipEffects) {
      this.relationships.update((prevRecord) => {
        const updatedRecord = { ...prevRecord };

        for (const relationship in relationshipEffects) {
          if (!(relationship in updatedRecord)) {
            throw new Error(`Unknown relationship key: ${relationship}`);
          }

          updatedRecord[relationship] =
            updatedRecord[relationship] +
            multiplier * relationshipEffects[relationship];
        }

        return updatedRecord;
      });
    }

    if (flagEffects) {
      console.log(`flag effects: ${flagEffects}`);
      this.flags.update((prevRecord) => {
        const updatedRecord = { ...prevRecord };

        for (const flag of flagEffects) {
          if (!(flag in updatedRecord)) {
            throw new Error(`Unknown flag key: ${flag}`);
          }

          if (undo) {
            updatedRecord[flag] = false;
          } else {
            updatedRecord[flag] = true;
          }
        }

        return updatedRecord;
      });
    }
  }
}
