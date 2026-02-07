import { apiClient } from '../client';
import type { JobDTO, CreateJobDTO } from '../dtos/job';

/**
 * Job Domain Service.
 * 
 * According to Phase 7.2:
 * - Read status of async jobs.
 * - Create new jobs.
 */

export const jobService = {
  /**
   * Get job status by ID.
   */
  getById: async (id: string, signal?: AbortSignal): Promise<JobDTO> => {
    const response = await apiClient.get<JobDTO>(`/jobs/${id}`, { signal });
    return response.data;
  },

  /**
   * Create a new job.
   */
  create: async (data: CreateJobDTO): Promise<JobDTO> => {
    const response = await apiClient.post<JobDTO>('/jobs', data);
    return response.data;
  },

  /**
   * Cancel a job.
   */
  cancel: async (id: string): Promise<void> => {
    await apiClient.post(`/jobs/${id}/cancel`);
  },
};
