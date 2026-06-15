import type { SiteContent } from '../content/siteContent';
import { siteFallback } from '../content/siteContent';

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

function cleanPhoneHref(value?: string | null): string {
  const digits = cleanText(value).replace(/[^\d]/g, '');

  if (!digits) return '';

  /**
   * Indian number handling.
   * If number already starts with country code, use it.
   * Otherwise prefix +91.
   */
  if (digits.startsWith('91') && digits.length >= 12) {
    return `+${digits}`;
  }

  return `+91${digits}`;
}

type ApiWebInfoResponse = {
  status?: boolean;
  data?: any;
};

export function normalizeSiteContentResponse(
  apiResponse: ApiWebInfoResponse
): Partial<SiteContent> {
  const data = apiResponse?.data;

  if (!data) return {};

  const siteName = cleanText(data.site_name) || siteFallback.siteName;

  const contactNumber =
    cleanText(data.contact_number) || siteFallback.contactNumber;

  const whatsappNumber =
    cleanText(data.whatsapp_number) || siteFallback.whatsappNumber;

  const logoSrc = toAssetUrl(data.logo);

  return {
    siteName,

    siteTagline:
      cleanText(data.site_tagline) || siteFallback.siteTagline,

    logo: {
      src: logoSrc || siteFallback.logo.src,
      alt: siteName,
      fallbackSrc: siteFallback.logo.fallbackSrc,
    },

    favicon:
      toAssetUrl(data.favicon) || siteFallback.favicon,

    contactNumber,
    contactNumberHref:
      cleanPhoneHref(contactNumber) || siteFallback.contactNumberHref,

    whatsappNumber,
    whatsappHref:
      cleanPhoneHref(whatsappNumber) || siteFallback.whatsappHref,

    email:
      cleanText(data.email) || siteFallback.email,

    supportEmail:
      cleanText(data.support_email) || siteFallback.supportEmail,

    address:
    cleanText(data.address) ||
    siteFallback.address,

    secondaryAddress:
      cleanText(data.map_link) ||
      siteFallback.secondaryAddress,

    mapLink:
      cleanText(data.map_link) || siteFallback.mapLink,

    socialLinks: {
      facebook:
        cleanText(data.facebook_url) || siteFallback.socialLinks.facebook,

      instagram:
        cleanText(data.instagram_url) || siteFallback.socialLinks.instagram,

      twitter:
        cleanText(data.twitter_url) || siteFallback.socialLinks.twitter,

      youtube:
        cleanText(data.youtube_url) || siteFallback.socialLinks.youtube,

      linkedin:
        cleanText(data.linkedin_url) || siteFallback.socialLinks.linkedin,
    },

    footerText:
      cleanText(data.footer_text) || siteFallback.footerText,

    copyrightText:
      cleanText(data.copyright_text) || siteFallback.copyrightText,

    businessHours:
      cleanText(data.business_hours) || siteFallback.businessHours,
  };
}