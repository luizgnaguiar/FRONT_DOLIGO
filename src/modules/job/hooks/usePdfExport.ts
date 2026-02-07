import { useRunJob } from './useRunJob';
import type { JobDTO } from '@api/dtos/job';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const usePdfExport = (_type: string = 'EXPORT_PDF') => {
  return useRunJob({
    onCompleted: (job: JobDTO) => {
      // Assuming result contains a url or we need to fetch the file
      // If the backend returns a signed URL in result:
      const url = job.result?.downloadUrl as string;
      if (url) {
        window.open(url, '_blank');
      }
    },
    onFailed: (job: JobDTO) => {
      console.error('PDF Generation failed:', job.error);
      // PENDENTE: Show toast error
    }
  });
};
