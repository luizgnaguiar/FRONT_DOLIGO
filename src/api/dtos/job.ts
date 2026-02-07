import type { ID } from './common';

/**
 * Job DTOs for asynchronous operations.
 * 
 * According to Phase 7.1:
 * - Contract for async jobs status and results.
 */

export type JobStatus = 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'CANCELLED';

export interface JobDTO extends ID {
  type: string; // e.g., 'EXPORT_INVOICES', 'GENERATE_PDF'
  status: JobStatus;
  progress?: number; // 0-100
  result?: Record<string, unknown>; // Flexible result payload (e.g., downloadUrl)
  error?: string; // Error message if failed
  createdAt: string;
  updatedAt: string;
}

export interface CreateJobDTO {
  type: string;
  payload?: Record<string, unknown>;
}
