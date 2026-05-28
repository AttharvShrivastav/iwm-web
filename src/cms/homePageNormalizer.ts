import { Plug, Bridge, Handshake } from '@phosphor-icons/react';
import type {
  HomePageContent
} from '../content/homeContent';
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

const iconMap = {
  Plug,
  Bridge,
  Handshake,
};

function getIcon(iconName?: string) {
  if (!iconName) return Plug;

  return iconMap[iconName as keyof typeof iconMap] || Plug;
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

  return {
    hero: {
      eyebrow: homePageFallback.hero.eyebrow,
      headline: data.hero?.title,
      description: data.hero?.subtitle,
      ctaLabel: data.hero?.cta_label,
      ctaLink: data.hero?.cta_link,
      image: {
        src: toAssetUrl(data.hero?.image),
        alt: homePageFallback.hero.image.alt,
        fallbackSrc: homePageFallback.hero.image.fallbackSrc,
      },
    },

    about: {
      sectionLabel: data.about?.heading,
      mainText: data.about?.description,
      highlightText: homePageFallback.about.highlightText,
      ctaLabel: data.about?.cta_label,
      features: Array.isArray(data.about?.cards)
        ? data.about.cards.map((card: any) => ({
            icon: getIcon(card.icon),
            title: card.title,
            description: card.description,
          }))
        : undefined,
    },

    impact: {
      sectionLabel: data.state?.heading,
      heading: data.state?.headline,
      cards: Array.isArray(data.state?.cards)
        ? data.state.cards.map((card: any) => ({
            number: card.value,
            text: card.description,
            image: toAssetUrl(card.image),
            fallback: homePageFallback.impact.cards[0]?.fallback,
          }))
        : undefined,
    },

    animatedText: {
      label: data.cta?.heading,
      mainText: data.cta?.description,
      buttonLabel: data.cta?.cta_label,
      buttonLink: data.cta?.cta_link,
    },

    discoverServices: {
  introLine1: homePageFallback.discoverServices.introLine1,
  introLine2: homePageFallback.discoverServices.introLine2,
  headerLabel: homePageFallback.discoverServices.headerLabel,

  items: Array.isArray(data.services)
    ? data.services.map((service: any, index: number) => {
        const fallbackItem =
          homePageFallback.discoverServices.items[index] ||
          homePageFallback.discoverServices.items[0];

        const apiImage = service.image ? toAssetUrl(service.image) : '';

        return {
          name: service.title || fallbackItem?.name,
          img: apiImage || fallbackItem?.img,
          fallback: fallbackItem?.fallback,

          modalTitle:
            service.title ||
            fallbackItem?.modalTitle ||
            fallbackItem?.name,

          modalEyebrow:
            fallbackItem?.modalEyebrow || 'Service Specialization',

          modalDescription:
            service.description ||
            fallbackItem?.modalDescription ||
            'More details about this service will be available soon.',

          modalDetails: fallbackItem?.modalDetails,
        };
      })
    : undefined,
},

    industries: {
      sectionLabel: homePageFallback.industries.sectionLabel,
      heading: homePageFallback.industries.heading,
      prevLabel: homePageFallback.industries.prevLabel,
      nextLabel: homePageFallback.industries.nextLabel,
      pageLabel: homePageFallback.industries.pageLabel,
      items: Array.isArray(data.industries)
        ? data.industries.map((industry: any) => ({
            id: String(industry.id),
            name: industry.title,
            image: toAssetUrl(industry.image),
            fallbackImage: homePageFallback.industries.items[0]?.fallbackImage,
            clients: Array.isArray(industry.logos)
              ? industry.logos.map((logo: any, index: number) => ({
                  name: `${industry.title} Logo ${index + 1}`,
                  logo: toAssetUrl(logo.logo),
                  fallbackLogo:
                    homePageFallback.industries.items[0]?.clients[0]
                      ?.fallbackLogo,
                }))
              : [],
          }))
        : undefined,
    },
  };
}