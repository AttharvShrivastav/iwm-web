import type { ContactPageContent } from '../content/contactContent';
import { contactPageFallback } from '../content/contactContent';

const ASSET_BASE_URL = import.meta.env.VITE_CMS_ASSET_URL || '';

function toAssetUrl(path?: string | null): string {
  if (!path) return '';

  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  const cleanBase = ASSET_BASE_URL.replace(/\/$/, '');
  const cleanPath = path.replace(/^\//, '');

  return `${cleanBase}/${cleanPath}`;
}

function cleanText(value?: string | null): string {
  return String(value || '')
    .replace(/\u2028/g, ' ')
    .replace(/\r\n/g, ' ')
    .replace(/\r/g, ' ')
    .replace(/\n/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

type ApiContactResponse = {
  status?: boolean;
  data?: any;
};

export function normalizeContactPageResponse(
  apiResponse: ApiContactResponse
): Partial<ContactPageContent> {
  const data = apiResponse?.data;

  if (!data) return {};

  return {
    hero: {
      label: contactPageFallback.hero.label,
      title: cleanText(data.hero?.title) || contactPageFallback.hero.title,
      subtitle:
        cleanText(data.hero?.subtitle) || contactPageFallback.hero.subtitle,
      image: toAssetUrl(data.hero?.image) || contactPageFallback.hero.image,
      topRightLink: contactPageFallback.hero.topRightLink,
    },

    /**
     * API currently only sends hero data.
     * Keep remaining contact information from fallback until shared/site API is ready.
     */
    contactInfo: contactPageFallback.contactInfo,
    form: contactPageFallback.form,
    mapEmbedUrl: contactPageFallback.mapEmbedUrl,
  };
}