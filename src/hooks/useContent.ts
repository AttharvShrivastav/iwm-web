import { useEffect, useState } from 'react';

type UseContentOptions = {
  enabled?: boolean;
};

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

        if (!cmsContent) {
          setContent(fallbackContent);
          return;
        }

        setContent({
          ...fallbackContent,
          ...cmsContent,
        });
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