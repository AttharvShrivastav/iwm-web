import { useEffect, useState } from 'react';
import type { ServicesPageContent } from '../content/servicesContent';
import { servicesPageFallback } from '../content/servicesContent';
import { normalizeServicesPageResponse } from '../cms/servicePageNormalizer';
import { mergeWithFallback } from '../cms/mergeWithFallback';

type ContentStatus = 'loading' | 'success' | 'fallback';

type UseServicesPageContentResult = {
  content: ServicesPageContent | null;
  status: ContentStatus;
  isLoading: boolean;
  isFallback: boolean;
  error: Error | null;
};

const API_TIMEOUT_MS = 8000;

export function useServicesPageContent(): UseServicesPageContentResult {
  const [content, setContent] = useState<ServicesPageContent | null>(null);
  const [status, setStatus] = useState<ContentStatus>('loading');
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const timeoutId = window.setTimeout(() => {
      controller.abort();
    }, API_TIMEOUT_MS);

    async function loadServicesPage() {
      try {
        const apiUrl = import.meta.env.VITE_SERVICES_API_URL;

        setStatus('loading');
        setError(null);
        setContent(null);

        if (!apiUrl) {
          throw new Error('VITE_SERVICES_API_URL is missing');
        }

        const response = await fetch(apiUrl, {
          method: 'GET',
          signal: controller.signal,
          headers: {
            Accept: 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Services API failed with status ${response.status}`);
        }

        const apiResponse = await response.json();

        if (!apiResponse?.status || !apiResponse?.data) {
          throw new Error('Services API returned invalid data');
        }

        const normalizedContent = normalizeServicesPageResponse(apiResponse);

        const safeContent = mergeWithFallback(
          servicesPageFallback,
          normalizedContent
        );

        if (!controller.signal.aborted) {
          setContent(safeContent);
          setStatus('success');
        }
      } catch (err) {
        const finalError =
          err instanceof Error ? err : new Error('Services API failed');

        if (!controller.signal.aborted) {
          console.warn(
            'Services API failed. Rendering fallback content.',
            finalError
          );

          setError(finalError);
          setContent(servicesPageFallback);
          setStatus('fallback');
        } else {
          const timeoutError = new Error('Services API request timed out');

          console.warn(
            'Services API timed out. Rendering fallback content.',
            timeoutError
          );

          setError(timeoutError);
          setContent(servicesPageFallback);
          setStatus('fallback');
        }
      } finally {
        window.clearTimeout(timeoutId);
      }
    }

    loadServicesPage();

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