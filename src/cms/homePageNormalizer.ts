import { Plug, Bridge, Handshake } from '@phosphor-icons/react';
import type { HomePageContent } from '../content/homeContent';
import { homePageFallback } from '../content/homeContent';

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

const iconMap = {
  Plug,
  Bridge,
  Handshake,
};

function getIcon(iconName?: string | null) {
  const cleanIconName = cleanText(iconName);

  if (!cleanIconName) return Plug;

  return iconMap[cleanIconName as keyof typeof iconMap] || Plug;
}

function normalizeHomeAboutCards(cards: any[] | undefined) {
  if (!Array.isArray(cards) || !cards.length) {
    return homePageFallback.about.features;
  }

  return cards.map((card: any, index: number) => {
    const fallbackFeature =
      homePageFallback.about.features[index] ||
      homePageFallback.about.features[0];

    return {
      icon: getIcon(card.icon) || fallbackFeature.icon,

      title:
        cleanText(card.title) ||
        fallbackFeature.title,

      description:
        cleanText(card.description) ||
        fallbackFeature.description,
    };
  });
}

type ApiHomeResponse = {
  status?: boolean;
  data?: any;
};

export function normalizeHomePageResponse(
  apiResponse: ApiHomeResponse
): Partial<HomePageContent> {
  const data = apiResponse?.data;

  if (!data) {
    return {};
  }

  const apiAboutDescription = cleanText(data.about?.description);

  /**
   * Important:
   * Home API sends the complete About paragraph in one field:
   * data.about.description
   *
   * So when API description exists, highlightText must be empty.
   * Otherwise fallback highlightText gets appended and the paragraph repeats.
   */
  const aboutText = apiAboutDescription
    ? {
        mainText: apiAboutDescription,
        highlightText: '',
      }
    : {
        mainText: homePageFallback.about.mainText,
        highlightText: homePageFallback.about.highlightText,
      };

  return {
    hero: {
      eyebrow: homePageFallback.hero.eyebrow,

      headline:
        cleanText(data.hero?.title) ||
        homePageFallback.hero.headline,

      description:
        cleanText(data.hero?.subtitle) ||
        homePageFallback.hero.description,

      ctaLabel:
        cleanText(data.hero?.cta_label) ||
        homePageFallback.hero.ctaLabel,

      ctaLink:
        cleanText(data.hero?.cta_link) ||
        homePageFallback.hero.ctaLink,

      image: {
        src:
          toAssetUrl(data.hero?.image) ||
          homePageFallback.hero.image.src,

        alt: homePageFallback.hero.image.alt,

        fallbackSrc: homePageFallback.hero.image.fallbackSrc,
      },
    },

    about: {
      sectionLabel:
        cleanText(data.about?.heading) ||
        homePageFallback.about.sectionLabel,

      mainText: aboutText.mainText,

      /**
       * This is intentionally allowed to be an empty string.
       * Do not replace it with fallback here.
       */
      highlightText: aboutText.highlightText,

      ctaLabel:
        cleanText(data.about?.cta_label) ||
        homePageFallback.about.ctaLabel,

      ctaLink:
        cleanText(data.about?.cta_link) ||
        homePageFallback.about.ctaLink,

      features: normalizeHomeAboutCards(data.about?.cards),
    },

    impact: {
      sectionLabel:
        cleanText(data.state?.heading) ||
        homePageFallback.impact.sectionLabel,

      heading:
        cleanText(data.state?.headline) ||
        homePageFallback.impact.heading,

      cards: Array.isArray(data.state?.cards) && data.state.cards.length
        ? data.state.cards.map((card: any, index: number) => {
            const fallbackCard =
              homePageFallback.impact.cards[index] ||
              homePageFallback.impact.cards[0];

            return {
              number:
                cleanText(card.value) ||
                fallbackCard.number,

              text:
                cleanText(card.description) ||
                fallbackCard.text,

              image:
                toAssetUrl(card.image) ||
                fallbackCard.image,

              fallback:
                fallbackCard.fallback,
            };
          })
        : homePageFallback.impact.cards,
    },

    animatedText: {
      label:
        cleanText(data.cta?.heading) ||
        homePageFallback.animatedText.label,

      mainText:
        cleanText(data.cta?.description) ||
        homePageFallback.animatedText.mainText,

      buttonLabel:
        cleanText(data.cta?.cta_label) ||
        homePageFallback.animatedText.buttonLabel,

      buttonLink:
        cleanText(data.cta?.cta_link) ||
        homePageFallback.animatedText.buttonLink,
    },

    discoverServices: {
      introLine1: homePageFallback.discoverServices.introLine1,
      introLine2: homePageFallback.discoverServices.introLine2,
      headerLabel: homePageFallback.discoverServices.headerLabel,

      items: Array.isArray(data.services) && data.services.length
        ? data.services.map((service: any, index: number) => {
            const fallbackItem =
              homePageFallback.discoverServices.items[index] ||
              homePageFallback.discoverServices.items[0];

            const apiImage = service.image ? toAssetUrl(service.image) : '';

            return {
              name:
                cleanText(service.title) ||
                fallbackItem.name,

              img:
                apiImage ||
                fallbackItem.img,

              fallback:
                fallbackItem.fallback,

              modalTitle:
                cleanText(service.title) ||
                fallbackItem.modalTitle ||
                fallbackItem.name,

              modalEyebrow:
                fallbackItem.modalEyebrow ||
                'Service Specialization',

                            /**
               * Homepage modal should show only the short service description.
               *
               * Service title        -> service.title
               * Short description    -> service.description
               * Long description     -> service.long_description
               *
               * Important:
               * Homepage Discover modal uses short description only.
               * Service Page modal will continue using long_description separately.
               */
              modalDescription:
                cleanText(service.description) ||
                'More details about this service will be available soon.',

              /**
               * Do not pull fallback modal bullets for API services.
               * This keeps homepage modal content fully CMS/API-driven.
               */
              modalDetails: [],
            };
          })
        : homePageFallback.discoverServices.items,
    },

    industries: {
      sectionLabel: homePageFallback.industries.sectionLabel,
      heading: homePageFallback.industries.heading,
      prevLabel: homePageFallback.industries.prevLabel,
      nextLabel: homePageFallback.industries.nextLabel,
      pageLabel: homePageFallback.industries.pageLabel,

      items: Array.isArray(data.industries) && data.industries.length
        ? data.industries.map((industry: any, index: number) => {
            const fallbackIndustry =
              homePageFallback.industries.items[index] ||
              homePageFallback.industries.items[0];

            return {
              id: String(industry.id || fallbackIndustry.id),

              name:
                cleanText(industry.title) ||
                fallbackIndustry.name,

              image:
                toAssetUrl(industry.image) ||
                fallbackIndustry.image,

              fallbackImage:
                fallbackIndustry.fallbackImage,

              clients: Array.isArray(industry.logos)
                ? industry.logos.map((logo: any, logoIndex: number) => {
                    const fallbackClient =
                      fallbackIndustry.clients?.[logoIndex] ||
                      fallbackIndustry.clients?.[0];

                    return {
                      name:
                        cleanText(logo.logo_name) ||
                        cleanText(logo.name) ||
                        fallbackClient?.name ||
                        `${cleanText(industry.title) || 'Industry'} Logo ${logoIndex + 1}`,

                      logo:
                        toAssetUrl(logo.logo) ||
                        fallbackClient?.logo ||
                        '',

                      fallbackLogo:
                        fallbackClient?.fallbackLogo ||
                        homePageFallback.industries.items[0]?.clients[0]?.fallbackLogo,
                    };
                  })
                : fallbackIndustry.clients,
            };
          })
        : homePageFallback.industries.items,
    },
  };
}