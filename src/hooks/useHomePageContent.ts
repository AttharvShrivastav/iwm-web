import { useEffect, useState } from 'react';
import type { HomePageContent } from '../content/homeContent';
import { homePageFallback } from '../content/homeContent';
import { normalizeHomePageResponse } from '../components/cms/homePageNormalizer';
import { mergeWithFallback } from '../components/cms/mergeWithFallback';

type UseHomePageContentResult = {
  content: HomePageContent | null;
  isLoading: boolean;
  error: Error | null;
};

export function useHomePageContent(): UseHomePageContentResult {
  const [content, setContent] = useState<HomePageContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadHomePage() {
      try {
        const apiUrl = import.meta.env.VITE_HOME_API_URL;

        if (!apiUrl) {
          throw new Error('VITE_HOME_API_URL is missing');
        }

        setIsLoading(true);
        setError(null);

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

        const normalizedContent = normalizeHomePageResponse(apiResponse);

        /**
         * We are not rendering fallback first.
         * We only use fallback here to fill missing fields after API comes.
         */
        const safeContent = mergeWithFallback(
          homePageFallback,
          normalizedContent
        );

        if (!controller.signal.aborted) {
          setContent(safeContent);
        }
      } catch (err) {
        if (!controller.signal.aborted) {
          setError(err instanceof Error ? err : new Error('Home API failed'));
          setContent(null);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    loadHomePage();

    return () => {
      controller.abort();
    };
  }, []);

  return {
    content,
    isLoading,
    error,
  };
}