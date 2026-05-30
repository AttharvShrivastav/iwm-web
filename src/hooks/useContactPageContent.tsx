import { useEffect, useState } from 'react';
import type { ContactPageContent } from '../content/contactContent';
import { contactPageFallback } from '../content/contactContent';
import { normalizeContactPageResponse } from '../cms/contactPageNormalizer';
import { mergeWithFallback } from '../cms/mergeWithFallback';

type ContentStatus = 'loading' | 'success' | 'fallback';

type UseContactPageContentResult = {
  content: ContactPageContent | null;
  status: ContentStatus;
  isLoading: boolean;
  isFallback: boolean;
  error: Error | null;
};

const API_TIMEOUT_MS = 8000;

export function useContactPageContent(): UseContactPageContentResult {
  const [content, setContent] = useState<ContactPageContent | null>(null);
  const [status, setStatus] = useState<ContentStatus>('loading');
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const timeoutId = window.setTimeout(() => {
      controller.abort();
    }, API_TIMEOUT_MS);

    async function loadContactPage() {
      try {
        const apiUrl = import.meta.env.VITE_CONTACT_PAGE_API_URL;

        setStatus('loading');
        setError(null);
        setContent(null);

        if (!apiUrl) {
          throw new Error('VITE_CONTACT_PAGE_API_URL is missing');
        }

        const response = await fetch(apiUrl, {
          method: 'GET',
          signal: controller.signal,
          headers: {
            Accept: 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Contact page API failed with status ${response.status}`);
        }

        const apiResponse = await response.json();

        if (!apiResponse?.status || !apiResponse?.data) {
          throw new Error('Contact page API returned invalid data');
        }

        const normalizedContent = normalizeContactPageResponse(apiResponse);

        const safeContent = mergeWithFallback(
          contactPageFallback,
          normalizedContent
        );

        if (!controller.signal.aborted) {
          setContent(safeContent);
          setStatus('success');
        }
      } catch (err) {
        const finalError =
          err instanceof Error ? err : new Error('Contact page API failed');

        if (!controller.signal.aborted) {
          console.warn(
            'Contact page API failed. Rendering fallback content.',
            finalError
          );

          setError(finalError);
          setContent(contactPageFallback);
          setStatus('fallback');
        } else {
          const timeoutError = new Error('Contact page API request timed out');

          console.warn(
            'Contact page API timed out. Rendering fallback content.',
            timeoutError
          );

          setError(timeoutError);
          setContent(contactPageFallback);
          setStatus('fallback');
        }
      } finally {
        window.clearTimeout(timeoutId);
      }
    }

    loadContactPage();

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