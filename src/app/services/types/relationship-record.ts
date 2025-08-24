import z from 'zod';

export const RelationshipRecordSchema = z.record(z.string(), z.number());

export type RelationshipRecord = z.infer<typeof RelationshipRecordSchema>;

export const initialRelationships: RelationshipRecord = {
  crew: 50,
  firstMate: 50,
};
