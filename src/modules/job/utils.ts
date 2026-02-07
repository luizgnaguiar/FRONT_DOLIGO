import type { JobStatus } from '@api/dtos/job';

export const isJobFinished = (status: JobStatus): boolean => {
  return ['COMPLETED', 'FAILED', 'CANCELLED'].includes(status);
};

export const shouldPollJob = (status?: JobStatus): boolean => {
  if (!status) return true; // Poll if we don't know status yet
  return !isJobFinished(status);
};
