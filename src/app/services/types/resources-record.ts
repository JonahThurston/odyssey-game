import z from 'zod';

export const ResourceRecordSchema = z.record(z.string(), z.number());

export type ResourceRecord = z.infer<typeof ResourceRecordSchema>;

export const initialResources: ResourceRecord = {
  manpower: 50,
  supplies: 50,
  munitions: 50,
  wit: 50,
  physicality: 50,
};
