import z from 'zod';

export const FlagRecordSchema = z.record(z.string(), z.boolean());

export type FlagRecord = z.infer<typeof FlagRecordSchema>;

export const initialFlags: FlagRecord = {
  flag1: true,
  flag2: false,
};
