import { useEffect, useState } from 'react';
import type { PeoplePageContent } from '../content/peopleContent';
import { peoplePageFallback } from '../content/peopleContent';
import { normalizePeoplePageResponse } from '../cms/peoplePageNormalizer';
import { mergeWithFallback } from '../cms/mergeWithFallback';

type ContentStatus = 'loading' | 'success' | 'fallback';

type UsePeoplePageContentResult = {
  content: PeoplePageContent | null;
  status: ContentStatus;
  isLoading: boolean;
  isFallback: boolean;
  error: Error | null;
};

const API_TIMEOUT_MS = 8000;

export function usePeoplePageContent(): UsePeoplePageContentResult {
  const [content, setContent] = useState<PeoplePageContent | null>(null);
  const [status, setStatus] = useState<ContentStatus>('loading');
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const timeoutId = window.setTimeout(() => {
      controller.abort();
    }, API_TIMEOUT_MS);

    async function loadPeoplePage() {
      try {
        const apiUrl = import.meta.env.VITE_PEOPLE_API_URL;

        setStatus('loading');
        setError(null);
        setContent(null);

        if (!apiUrl) {
          throw new Error('VITE_PEOPLE_API_URL is missing');
        }

        const response = await fetch(apiUrl, {
          method: 'GET',
          signal: controller.signal,
          headers: {
            Accept: 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`People API failed with status ${response.status}`);
        }

        const apiResponse = await response.json();

        if (!apiResponse?.status || !apiResponse?.data) {
          throw new Error('People API returned invalid data');
        }

        const normalizedContent = normalizePeoplePageResponse(apiResponse);

        const safeContent = mergeWithFallback(
          peoplePageFallback,
          normalizedContent
        );

        if (normalizedContent.leadership?.leaders) {
          safeContent.leadership.leaders =
            normalizedContent.leadership.leaders;
        }

        if (normalizedContent.sipahiVoices?.groups) {
          safeContent.sipahiVoices.groups =
            normalizedContent.sipahiVoices.groups;
        }

        if (!controller.signal.aborted) {
          setContent(safeContent);
          setStatus('success');
        }
      } catch (err) {
        const finalError =
          err instanceof Error ? err : new Error('People API failed');

        if (!controller.signal.aborted) {
          console.warn(
            'People API failed. Rendering fallback content.',
            finalError
          );

          setError(finalError);
          setContent(peoplePageFallback);
          setStatus('fallback');
        }
      } finally {
        window.clearTimeout(timeoutId);
      }
    }

    loadPeoplePage();

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