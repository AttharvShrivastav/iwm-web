import type { PeoplePageContent } from '../content/peopleContent';
import { peoplePageFallback } from '../content/peopleContent';

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

function isHindiText(value?: string | null): boolean {
  return /[\u0900-\u097F]/.test(String(value || ''));
}

function groupTestimonials(items: any[], groupSize = 2) {
  const groups = [];

  for (let i = 0; i < items.length; i += groupSize) {
    groups.push(items.slice(i, i + groupSize));
  }

  return groups;
}

type ApiPeopleResponse = {
  status?: boolean;
  data?: any;
};

export function normalizePeoplePageResponse(
  apiResponse: ApiPeopleResponse
): Partial<PeoplePageContent> {
  const data = apiResponse?.data;

  if (!data) return {};

  const normalizedLeaders = Array.isArray(data.people)
    ? data.people.map((person: any, index: number) => {
        const fallbackLeader =
          peoplePageFallback.leadership.leaders[index] ||
          peoplePageFallback.leadership.leaders[0];

        const apiImage = person.image ? toAssetUrl(person.image) : '';

        return {
          name:
            cleanText(person.name) ||
            fallbackLeader.name,

          designation:
            cleanText(person.designation) ||
            fallbackLeader.designation,

          /**
           * API currently does not send email.
           * Keep fallback email if available.
           */
          email:
            fallbackLeader.email,

          image:
            apiImage ||
            fallbackLeader.image,

          fallbackImage:
            fallbackLeader.fallbackImage ||
            fallbackLeader.image,
        };
      })
    : peoplePageFallback.leadership.leaders;

  const testimonialItems = Array.isArray(
    data.testimonial?.test_monial_items
  )
    ? data.testimonial.test_monial_items
    : [];

  const normalizedTestimonials = testimonialItems.map(
    (item: any, index: number) => {
      const fallbackGroupIndex = Math.floor(index / 2);
      const fallbackItemIndex = index % 2;

      const fallbackQuote =
        peoplePageFallback.sipahiVoices.groups[fallbackGroupIndex]?.[
          fallbackItemIndex
        ] ||
        peoplePageFallback.sipahiVoices.groups[0]?.[0];

      return {
        id:
          Number(item.id) ||
          fallbackQuote?.id ||
          index + 1,

        name:
          cleanText(item.name) ||
          fallbackQuote?.name ||
          'IWM Team Member',

        role:
          cleanText(item.designation) ||
          fallbackQuote?.role ||
          '',

        statement:
          cleanText(item.message) ||
          fallbackQuote?.statement ||
          '',

        /**
         * API currently does not send testimonial images.
         * Keep fallback images for layout stability.
         */
        image:
          fallbackQuote?.image ||
          '/assets/people/sipahis/sipahi-1.jpg',

        fallbackImage:
          fallbackQuote?.fallbackImage ||
          fallbackQuote?.image,

        yearsWithIwm:
          cleanText(item.from) ||
          fallbackQuote?.yearsWithIwm,

        isHindi:
          isHindiText(item.message) ||
          fallbackQuote?.isHindi ||
          false,
      };
    }
  );

  return {
    hero: {
      label: peoplePageFallback.hero.label,

      title:
        cleanText(data.hero?.title) ||
        peoplePageFallback.hero.title,

      subtitle:
        cleanText(data.hero?.subtitle) ||
        peoplePageFallback.hero.subtitle,

      image:
        toAssetUrl(data.hero?.image) ||
        peoplePageFallback.hero.image,

      topRightLink:
        peoplePageFallback.hero.topRightLink,
    },

    leadership: {
      sectionLabel: peoplePageFallback.leadership.sectionLabel,
      heading: peoplePageFallback.leadership.heading,
      copiedLabel: peoplePageFallback.leadership.copiedLabel,
      leaders: normalizedLeaders,
    },

    sipahiVoices: {
      sectionLabel:
        cleanText(data.testimonial?.heading) ||
        peoplePageFallback.sipahiVoices.sectionLabel,

      heading:
        cleanText(data.testimonial?.headline) ||
        peoplePageFallback.sipahiVoices.heading,

      description:
        cleanText(data.testimonial?.description) ||
        peoplePageFallback.sipahiVoices.description,

      groups: normalizedTestimonials.length
        ? groupTestimonials(normalizedTestimonials, 2)
        : peoplePageFallback.sipahiVoices.groups,
    },

    /**
     * API does not send careers/jobs yet.
     * Keep fallback careers and apply content.
     */
    careers: peoplePageFallback.careers,
    apply: peoplePageFallback.apply,
  };
}