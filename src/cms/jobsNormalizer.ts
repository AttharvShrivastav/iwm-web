import type { JobsContent, JobContent } from '../content/jobsContent';

function cleanText(value?: string | null): string {
  return String(value || '')
    .replace(/\u2028/g, ' ')
    .replace(/\r\n/g, ' ')
    .replace(/\r/g, ' ')
    .replace(/\n/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function formatJobType(value?: string | null): string {
  const cleanValue = cleanText(value).toLowerCase();

  const map: Record<string, string> = {
    full_time: 'Full-Time',
    part_time: 'Part-Time',
    internship: 'Internship',
    contract: 'Contract',
    freelance: 'Freelance',
  };

  return map[cleanValue] || cleanValue || 'Full-Time';
}

type ApiJobsResponse = {
  status?: boolean;
  data?: any;
};

export function normalizeJobsResponse(
  apiResponse: ApiJobsResponse
): Partial<JobsContent> {
  const data = apiResponse?.data;

  if (!Array.isArray(data)) {
    return {
      jobs: [],
    };
  }

  const jobs: JobContent[] = data
    .filter((job: any) => Number(job.status) === 1)
    .map((job: any) => ({
      id: String(job.id || job.job_title),

      title: cleanText(job.job_title),

      description: cleanText(job.about_job),

      type: formatJobType(job.job_type),

      location: cleanText(job.location) || 'India',

      /**
       * API does not send detailed responsibilities yet.
       * Keep undefined.
       */
      details: undefined,
    }))
    .filter((job) => job.title && job.description);

  return {
    jobs,
  };
}