import { FlagRecord } from './flag-record';
import { RelationshipRecord } from './relationship-record';
import { ResourceRecord } from './resources-record';

//quest has many scenes
//scenes have onEnter effects, many messages, and multiple choices
//effects have a list of resource names and numbers, and a list of relationship names and numbers
//messages have a speaker, text
//choices have text, an optional stat + difficulty, an optional flag lock, and a nextScene link
export type Scene = {
  id: number;
  prevSceneId: number;
  effects?: {
    resourceEffects?: ResourceRecord;
    relationshipEffects?: RelationshipRecord;
    flagEffects: string[];
  };
  messages: Message[];
  question: Choice[];
};

type Message = {
  speaker: string;
  text: string;
};

type Choice = {
  text: string;
  skill?: [string, 'easy' | 'medium' | 'hard' | 'daunting'];
  flagLock?: FlagRecord;
  nextSceneId: number;
};
