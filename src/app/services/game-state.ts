import { Injectable, signal } from '@angular/core';
import { FlagRecord, initialFlags } from './records/flag-record';
import { initialResources, ResourceRecord } from './records/resources-record';
import {
  initialRelationships,
  RelationshipRecord,
} from './records/relationship-record';

@Injectable({
  providedIn: 'root',
})
export class GameState {
  public questNumber = signal<number>(0);
  public sceneNumber = signal<number>(0);

  public flags = signal<FlagRecord>(initialFlags);
  public resources = signal<ResourceRecord>(initialResources);
  public relationships = signal<RelationshipRecord>(initialRelationships);
}
