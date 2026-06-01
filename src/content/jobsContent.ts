export type JobContent = {
  id: string;
  title: string;
  description: string;
  type: string;
  location: string;
  details?: string[];
};

export type JobsContent = {
  jobs: JobContent[];
};

export const jobsFallback: JobsContent = {
  /**
   * Empty by default because client currently may have no openings.
   * If API fails, we should not show fake jobs.
   */
  jobs: [],
};