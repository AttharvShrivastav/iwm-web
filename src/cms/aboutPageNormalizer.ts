import type { AboutPageContent } from '../content/aboutContent';
import { aboutPageFallback } from '../content/aboutContent';

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

function splitParagraphs(value?: string | null): string[] {
  return String(value || '')
    .replace(/\u2028/g, '\n')
    .split(/\n\s*\n|\r\n\s*\r\n/)
    .map((paragraph) =>
      paragraph
        .replace(/\r\n/g, ' ')
        .replace(/\r/g, ' ')
        .replace(/\n/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
    )
    .filter(Boolean);
}

function splitValuesDescription(description?: string | null) {
  const cleanDescription = cleanText(description);

  if (!cleanDescription) {
    return {
      mainText: undefined,
      highlightText: undefined,
    };
  }

  const splitPoint = 'Relentless innovation.';

  if (cleanDescription.includes(splitPoint)) {
    const [before, after] = cleanDescription.split(splitPoint);

    return {
      mainText: `${before}${splitPoint}`.trim(),
      highlightText: after.trim(),
    };
  }

  return {
    mainText: cleanDescription,
    highlightText: aboutPageFallback.values.highlightText,
  };
}

type ApiAboutResponse = {
  status?: boolean;
  data?: any;
};

export function normalizeAboutPageResponse(
  apiResponse: ApiAboutResponse
): Partial<AboutPageContent> {
  const data = apiResponse?.data;

  if (!data) return {};

  const valuesText = splitValuesDescription(data.about?.description);

  return {
    hero: {
      label: aboutPageFallback.hero.label,
      title: cleanText(data.hero?.title) || aboutPageFallback.hero.title,
      subtitle: cleanText(data.hero?.subtitle) || aboutPageFallback.hero.subtitle,
      image: toAssetUrl(data.hero?.image) || aboutPageFallback.hero.image,
      topRightLink: aboutPageFallback.hero.topRightLink,
    },

    values: {
      label: cleanText(data.about?.heading) || aboutPageFallback.values.label,
      mainText: valuesText.mainText || aboutPageFallback.values.mainText,
      highlightText:
        valuesText.highlightText || aboutPageFallback.values.highlightText,

      /**
       * API currently does not send value cards.
       * Keep fallback cards so the ValuesSection animation and layout stay stable.
       */
      values: aboutPageFallback.values.values,
    },

    location: {
      sectionLabel: aboutPageFallback.location.sectionLabel,
      heading: aboutPageFallback.location.heading,
      locations: Array.isArray(data.locations) && data.locations.length
        ? data.locations.map((location: any) => ({
            state:
              cleanText(location.State) ||
              cleanText(location.state) ||
              aboutPageFallback.location.locations[0]?.state,
            city:
              cleanText(location.city) ||
              aboutPageFallback.location.locations[0]?.city,
          }))
        : aboutPageFallback.location.locations,
    },

    foundersNote: {
      sectionLabel:
        cleanText(data.founder?.heading) ||
        aboutPageFallback.foundersNote.sectionLabel,

      image: {
        src: toAssetUrl(data.founder?.image) || aboutPageFallback.foundersNote.image.src,
        alt:
          cleanText(data.founder?.name) ||
          aboutPageFallback.foundersNote.image.alt,
        fallbackSrc: aboutPageFallback.foundersNote.image.fallbackSrc,
      },

      quote:
        cleanText(data.founder?.headline) ||
        aboutPageFallback.foundersNote.quote,

      paragraphs: splitParagraphs(data.founder?.decription).length
        ? splitParagraphs(data.founder?.decription)
        : aboutPageFallback.foundersNote.paragraphs,

      founderName:
        cleanText(data.founder?.name) ||
        aboutPageFallback.foundersNote.founderName,

      founderRole:
        cleanText(data.founder?.designation) ||
        aboutPageFallback.foundersNote.founderRole,
    },

    ourStory: {
      sectionLabel: aboutPageFallback.ourStory.sectionLabel,
      heading: aboutPageFallback.ourStory.heading,

      phases: Array.isArray(data.timeline) && data.timeline.length
        ? data.timeline.map((phase: any, index: number) => {
            const fallbackPhase =
              aboutPageFallback.ourStory.phases[index] ||
              aboutPageFallback.ourStory.phases[0];

            return {
              year: cleanText(phase.year) || fallbackPhase.year,
              title: cleanText(phase.title) || fallbackPhase.title,
              description:
                cleanText(phase.description) || fallbackPhase.description,
              image: toAssetUrl(phase.image) || fallbackPhase.image,
              fallbackImage: fallbackPhase.fallbackImage,
            };
          })
        : aboutPageFallback.ourStory.phases,
    },

    /**
     * API currently does not send this CTA section.
     * Keep fallback.
     */
    animatedText: aboutPageFallback.animatedText,

    /**
     * API currently does not send client logos.
     * Keep fallback.
     */
    clients: aboutPageFallback.clients,
  };
}