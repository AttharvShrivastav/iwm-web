import { useEffect, useState } from 'react';
import type { JobsContent } from '../content/jobsContent';
import { jobsFallback } from '../content/jobsContent';
import { normalizeJobsResponse } from '../cms/jobsNormalizer';
import { mergeWithFallback } from '../cms/mergeWithFallback';

type ContentStatus = 'loading' | 'success' | 'fallback';

type UseJobsContentResult = {
  content: JobsContent | null;
  status: ContentStatus;
  isLoading: boolean;
  isFallback: boolean;
  error: Error | null;
};

const API_TIMEOUT_MS = 8000;

export function useJobsContent(): UseJobsContentResult {
  const [content, setContent] = useState<JobsContent | null>(null);
  const [status, setStatus] = useState<ContentStatus>('loading');
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const timeoutId = window.setTimeout(() => {
      controller.abort();
    }, API_TIMEOUT_MS);

    async function loadJobs() {
      try {
        const apiUrl = import.meta.env.VITE_JOBS_API_URL;

        setStatus('loading');
        setError(null);
        setContent(null);

        if (!apiUrl) {
          throw new Error('VITE_JOBS_API_URL is missing');
        }

        const response = await fetch(apiUrl, {
          method: 'GET',
          signal: controller.signal,
          headers: {
            Accept: 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Jobs API failed with status ${response.status}`);
        }

        const apiResponse = await response.json();

        if (!apiResponse?.status || !Array.isArray(apiResponse?.data)) {
          throw new Error('Jobs API returned invalid data');
        }

        const normalizedContent = normalizeJobsResponse(apiResponse);

        const safeContent = mergeWithFallback(
          jobsFallback,
          normalizedContent
        );

        /**
         * Preserve API job list exactly.
         * If API sends 0 active jobs, show 0 jobs.
         */
        if (normalizedContent.jobs) {
          safeContent.jobs = normalizedContent.jobs;
        }

        if (!controller.signal.aborted) {
          setContent(safeContent);
          setStatus('success');
        }
      } catch (err) {
        const finalError =
          err instanceof Error ? err : new Error('Jobs API failed');

        if (!controller.signal.aborted) {
          console.warn('Jobs API failed. Rendering fallback jobs.', finalError);

          setError(finalError);
          setContent(jobsFallback);
          setStatus('fallback');
        }
      } finally {
        window.clearTimeout(timeoutId);
      }
    }

    loadJobs();

    return () => {
      window.clearTimeout(timeoutId);
      controller.abort();
    };
  }, []);

  return {
    content,
    status,
    isLoading: status === 'loading',
    isFallback: status === 'fallback',
    error,
  };
}