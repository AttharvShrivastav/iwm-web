import { useEffect, useState } from 'react';

type UseContentOptions = {
  enabled?: boolean;
};

function isObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function mergeWithFallback<T>(fallback: T, cmsData: Partial<T> | null | undefined): T {
  if (!cmsData) {
    return fallback;
  }

  if (!isObject(fallback) || !isObject(cmsData)) {
    return cmsData as T;
  }

  const merged: Record<string, unknown> = { ...fallback };

  Object.keys(cmsData).forEach((key) => {
    const cmsValue = cmsData[key];
    const fallbackValue = (fallback as Record<string, unknown>)[key];

    if (
      cmsValue === undefined ||
      cmsValue === null ||
      cmsValue === ''
    ) {
      return;
    }

    if (isObject(fallbackValue) && isObject(cmsValue)) {
      merged[key] = mergeWithFallback(fallbackValue, cmsValue);
      return;
    }

    merged[key] = cmsValue;
  });

  return merged as T;
}

export function useContent<T>(
  resourceId: string,
  fallbackContent: T,
  options: UseContentOptions = {}
): T {
  const { enabled = true } = options;

  const [content, setContent] = useState<T>(fallbackContent);

  useEffect(() => {
    if (!enabled) {
      setContent(fallbackContent);
      return;
    }

    const controller = new AbortController();

    async function loadContent() {
      try {
        const cmsBaseUrl = import.meta.env.VITE_CMS_API_URL;

        if (!cmsBaseUrl) {
          setContent(fallbackContent);
          return;
        }

        const response = await fetch(`${cmsBaseUrl}/content/${resourceId}`, {
          method: 'GET',
          signal: controller.signal,
        });

        if (!response.ok) {
          setContent(fallbackContent);
          return;
        }

        const result = await response.json();
        const cmsContent = result?.data;

        const resolvedContent = mergeWithFallback(fallbackContent, cmsContent);

        setContent(resolvedContent);
      } catch (error) {
        if (!controller.signal.aborted) {
          setContent(fallbackContent);
        }
      }
    }

    loadContent();

    return () => {
      controller.abort();
    };
  }, [resourceId, fallbackContent, enabled]);

  return content;
}