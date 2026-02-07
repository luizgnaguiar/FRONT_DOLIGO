import { useState, useCallback, useEffect, useRef } from 'react';
import { jobService } from '@api/services/job';
import { useJob } from './useJob';
import type { CreateJobDTO, JobDTO } from '@api/dtos/job';

interface UseRunJobOptions {
  onCompleted?: (job: JobDTO) => void;
  onFailed?: (job: JobDTO) => void;
}

/**
 * Hook to orchestrate job creation and monitoring.
 */
export const useRunJob = (options: UseRunJobOptions = {}) => {
  const [jobId, setJobId] = useState<string | null>(null);
  const handledRef = useRef<string | null>(null);

  // Poll only if we have a jobId
  const { data: job } = useJob(jobId || '', {
    enabled: !!jobId,
    interval: 1000,
  });

  useEffect(() => {
    if (!job) return;

    // If we already handled this completion state for this job, skip
    if (handledRef.current === job.id && ['COMPLETED', 'FAILED'].includes(job.status)) {
        return;
    }

    if (job.status === 'COMPLETED') {
      handledRef.current = job.id;
      options.onCompleted?.(job);
    } else if (job.status === 'FAILED') {
      handledRef.current = job.id;
      options.onFailed?.(job);
    }
  }, [job, options]);

  const startJob = useCallback(async (dto: CreateJobDTO) => {
    try {
      // Reset handled state for new job
      handledRef.current = null;
      const newJob = await jobService.create(dto);
      setJobId(newJob.id);
      return newJob;
    } catch (error) {
      console.error('Failed to start job', error);
      throw error;
    }
  }, []);

  const reset = useCallback(() => {
    setJobId(null);
    handledRef.current = null;
  }, []);

  return {
    startJob,
    job,
    isProcessing: job?.status === 'PENDING' || job?.status === 'PROCESSING',
    reset,
  };
};
