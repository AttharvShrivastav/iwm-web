import { useEffect, useState } from 'react';
import type { HomePageContent } from '../content/homeContent';
import { homePageFallback } from '../content/homeContent';
import { normalizeHomePageResponse } from '../cms/homePageNormalizer';
import { mergeWithFallback } from '../cms/mergeWithFallback';

type ContentStatus = 'loading' | 'success' | 'fallback';

type UseHomePageContentResult = {
  content: HomePageContent | null;
  status: ContentStatus;
  isLoading: boolean;
  isFallback: boolean;
  error: Error | null;
};

const API_TIMEOUT_MS = 8000;

export function useHomePageContent(): UseHomePageContentResult {
  const [content, setContent] = useState<HomePageContent | null>(null);
  const [status, setStatus] = useState<ContentStatus>('loading');
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const timeoutId = window.setTimeout(() => {
      controller.abort();
    }, API_TIMEOUT_MS);

    async function loadHomePage() {
      try {
        const apiUrl = import.meta.env.VITE_HOME_API_URL;

        setStatus('loading');
        setError(null);
        setContent(null);

        if (!apiUrl) {
          throw new Error('VITE_HOME_API_URL is missing');
        }

        const response = await fetch(apiUrl, {
          method: 'GET',
          signal: controller.signal,
          headers: {
            Accept: 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Home API failed with status ${response.status}`);
        }

        const apiResponse = await response.json();

        if (!apiResponse?.status || !apiResponse?.data) {
          throw new Error('Home API returned invalid data');
        }

        const normalizedContent = normalizeHomePageResponse(apiResponse);

        /**
         * API succeeded.
         * We merge with fallback only to fill missing fields.
         * This does NOT render fallback first.
         */
        const safeContent = mergeWithFallback(
          homePageFallback,
          normalizedContent
        );

        if (!controller.signal.aborted) {
          setContent(safeContent);
          setStatus('success');
        }
      } catch (err) {
        const finalError =
          err instanceof Error ? err : new Error('Home API failed');

        /**
         * API failed.
         * Now, and only now, fallback is allowed to render.
         * This means GSAP still mounts only once.
         */
        setError(finalError);
        setContent(homePageFallback);
        setStatus('fallback');
      } finally {
        window.clearTimeout(timeoutId);
      }
    }

    loadHomePage();

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