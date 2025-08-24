import { FlagRecordSchema } from './flag-record';
import { RelationshipRecordSchema } from './relationship-record';
import { ResourceRecordSchema } from './resources-record';
import { z } from 'zod';

//quest has many scenes
//scenes have onEnter effects, many messages, and multiple choices
//effects have a list of resource names and numbers, and a list of relationship names and numbers
//messages have a speaker, text
//choices have text, an optional stat + difficulty, an optional flag lock, and a nextScene link
const MessageSchema = z
  .object({
    id: z.number(),
    speaker: z.string(),
    text: z.string(),
  })
  .strict();

const ChoiceSchema = z
  .object({
    id: z.number(),
    text: z.string(),
    nextSceneId: z.string(),
    skill: z.tuple([z.string(), z.number()]).optional(),
    flagLock: FlagRecordSchema.optional(),
  })
  .strict();

const EffectsSchema = z
  .object({
    resourceEffects: ResourceRecordSchema.optional(),
    relationshipEffects: RelationshipRecordSchema.optional(),
    flagEffects: z.array(z.string()).optional(),
  })
  .strict();

export const SceneSchema = z
  .object({
    id: z.string(),
    prevSceneId: z.string(),
    effects: EffectsSchema.optional(),
    messages: z.array(MessageSchema),
    choices: z.array(ChoiceSchema),
  })
  .strict();

export type Scene = z.infer<typeof SceneSchema>;
export type Message = z.infer<typeof MessageSchema>;
export type Choice = z.infer<typeof ChoiceSchema>;
