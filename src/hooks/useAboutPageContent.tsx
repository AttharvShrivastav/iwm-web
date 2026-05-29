import { useEffect, useState } from 'react';
import type { AboutPageContent } from '../content/aboutContent';
import { aboutPageFallback } from '../content/aboutContent';
import { normalizeAboutPageResponse } from '../cms/aboutPageNormalizer';
import { mergeWithFallback } from '../cms/mergeWithFallback';

type ContentStatus = 'loading' | 'success' | 'fallback';

type UseAboutPageContentResult = {
  content: AboutPageContent | null;
  status: ContentStatus;
  isLoading: boolean;
  isFallback: boolean;
  error: Error | null;
};

const API_TIMEOUT_MS = 8000;

export function useAboutPageContent(): UseAboutPageContentResult {
  const [content, setContent] = useState<AboutPageContent | null>(null);
  const [status, setStatus] = useState<ContentStatus>('loading');
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const timeoutId = window.setTimeout(() => {
      controller.abort();
    }, API_TIMEOUT_MS);

    async function loadAboutPage() {
      try {
        const apiUrl = import.meta.env.VITE_ABOUT_API_URL;

        setStatus('loading');
        setError(null);
        setContent(null);

        if (!apiUrl) {
          throw new Error('VITE_ABOUT_API_URL is missing');
        }

        const response = await fetch(apiUrl, {
          method: 'GET',
          signal: controller.signal,
          headers: {
            Accept: 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`About API failed with status ${response.status}`);
        }

        const apiResponse = await response.json();

        if (!apiResponse?.status || !apiResponse?.data) {
          throw new Error('About API returned invalid data');
        }

        const normalizedContent = normalizeAboutPageResponse(apiResponse);

        const safeContent = mergeWithFallback(
          aboutPageFallback,
          normalizedContent
        );

        if (!controller.signal.aborted) {
          setContent(safeContent);
          setStatus('success');
        }
      } catch (err) {
        const finalError =
          err instanceof Error ? err : new Error('About API failed');

        if (!controller.signal.aborted) {
          console.warn(
            'About API failed. Rendering fallback content.',
            finalError
          );

          setError(finalError);
          setContent(aboutPageFallback);
          setStatus('fallback');
        } else {
          const timeoutError = new Error('About API request timed out');

          console.warn(
            'About API timed out. Rendering fallback content.',
            timeoutError
          );

          setError(timeoutError);
          setContent(aboutPageFallback);
          setStatus('fallback');
        }
      } finally {
        window.clearTimeout(timeoutId);
      }
    }

    loadAboutPage();

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