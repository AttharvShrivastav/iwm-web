import { useEffect, useState } from 'react';
import type { SiteContent } from '../content/siteContent';
import { siteFallback } from '../content/siteContent';
import { normalizeSiteContentResponse } from '../cms/siteContentNormalizer';
import { mergeWithFallback } from '../cms/mergeWithFallback';

type ContentStatus = 'loading' | 'success' | 'fallback';

type UseSiteContentResult = {
  content: SiteContent | null;
  status: ContentStatus;
  isLoading: boolean;
  isFallback: boolean;
  error: Error | null;
};

const API_TIMEOUT_MS = 8000;

export function useSiteContent(): UseSiteContentResult {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [status, setStatus] = useState<ContentStatus>('loading');
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const timeoutId = window.setTimeout(() => {
      controller.abort();
    }, API_TIMEOUT_MS);

    async function loadSiteContent() {
      try {
        const apiUrl = import.meta.env.VITE_WEBINFO_API_URL;

        setStatus('loading');
        setError(null);
        setContent(null);

        if (!apiUrl) {
          throw new Error('VITE_WEBINFO_API_URL is missing');
        }

        const response = await fetch(apiUrl, {
          method: 'GET',
          signal: controller.signal,
          headers: {
            Accept: 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`WebInfo API failed with status ${response.status}`);
        }

        const apiResponse = await response.json();

        if (!apiResponse?.status || !apiResponse?.data) {
          throw new Error('WebInfo API returned invalid data');
        }

        const normalizedContent = normalizeSiteContentResponse(apiResponse);

        const safeContent = mergeWithFallback(siteFallback, normalizedContent);

        if (!controller.signal.aborted) {
          setContent(safeContent);
          setStatus('success');
        }
      } catch (err) {
        const finalError =
          err instanceof Error ? err : new Error('WebInfo API failed');

        if (!controller.signal.aborted) {
          console.warn(
            'WebInfo API failed. Rendering fallback site content.',
            finalError
          );

          setError(finalError);
          setContent(siteFallback);
          setStatus('fallback');
        }
      } finally {
        window.clearTimeout(timeoutId);
      }
    }

    loadSiteContent();

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