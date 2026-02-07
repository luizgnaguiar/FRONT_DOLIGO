import { z } from 'zod';

/**
 * Job Schemas.
 * 
 * According to Phase 7.1.
 */

export const JobStatusSchema = z.enum(['PENDING', 'PROCESSING', 'COMPLETED', 'FAILED', 'CANCELLED']);

export const JobSchema = z.object({
  id: z.string().uuid(),
  type: z.string(),
  status: JobStatusSchema,
  progress: z.number().min(0).max(100).optional(),
  result: z.record(z.string(), z.unknown()).optional(),
  error: z.string().optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const CreateJobSchema = z.object({
  type: z.string().min(1),
  payload: z.record(z.string(), z.unknown()).optional(),
});
