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

        const safeContent = mergeWithFallback(
          homePageFallback,
          normalizedContent
        );

        /**
         * Important:
         * Preserve API-driven Home About text exactly.
         *
         * Why:
         * mergeWithFallback may treat an empty string as "missing".
         * But for Home About, highlightText is intentionally empty
         * when the API sends the full description in one field.
         *
         * Without this lock, fallback highlightText gets appended,
         * causing the paragraph to appear duplicated.
         */
        if (normalizedContent.about) {
          safeContent.about = {
            ...safeContent.about,
            ...normalizedContent.about,
          };
        }

        /**
         * Preserve CMS-driven service count/items exactly.
         * Useful for DiscoverServices so fallback items do not sneak back in.
         */
        if (normalizedContent.discoverServices?.items) {
          safeContent.discoverServices.items =
            normalizedContent.discoverServices.items;
        }

        /**
         * Preserve CMS-driven industries exactly when API sends them.
         * This keeps shared Industries consistent across Home and Services page.
         */
        if (normalizedContent.industries?.items) {
          safeContent.industries.items = normalizedContent.industries.items;
        }

        if (!controller.signal.aborted) {
          setContent(safeContent);
          setStatus('success');
        }
      } catch (err) {
        const finalError =
          err instanceof Error ? err : new Error('Home API failed');

        if (!controller.signal.aborted) {
          setError(finalError);
          setContent(homePageFallback);
          setStatus('fallback');
        }
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