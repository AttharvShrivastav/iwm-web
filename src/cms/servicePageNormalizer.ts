import type { ServicesPageContent } from '../content/servicesContent';
import { servicesPageFallback } from '../content/servicesContent';

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

type ApiServicesResponse = {
  status?: boolean;
  data?: any;
};

function normalizeMachineName(apiMachine: any, fallbackName: string): string {
  const heading = cleanText(apiMachine?.heading);
  const headline = cleanText(apiMachine?.headline);

  /**
   * Backend data is inconsistent right now:
   * Some machines send:
   * heading = machine name, headline = category
   *
   * Others send:
   * heading = category, headline = machine name
   *
   * This detects common category words and chooses the other field as name.
   */
  const categoryWords = [
    'ROAD SWEEPING',
    'WASTE PROCESSING',
    'SURFACE CLEANING',
    'WATER REMEDIATION',
    'WASTE REMEDIATION',
    'WASTE COLLECTION',
  ];

  if (categoryWords.includes(heading.toUpperCase()) && headline) {
    return headline;
  }

  return heading || headline || fallbackName;
}

function normalizeMachineCategory(
  apiMachine: any,
  fallbackCategory: string
): string {
  const heading = cleanText(apiMachine?.heading);
  const headline = cleanText(apiMachine?.headline);

  const categoryWords = [
    'ROAD SWEEPING',
    'WASTE PROCESSING',
    'SURFACE CLEANING',
    'WATER REMEDIATION',
    'WASTE REMEDIATION',
    'WASTE COLLECTION',
  ];

  if (categoryWords.includes(heading.toUpperCase())) {
    return heading;
  }

  if (categoryWords.includes(headline.toUpperCase())) {
    return headline;
  }

  return fallbackCategory;
}

export function normalizeServicesPageResponse(
  apiResponse: ApiServicesResponse
): Partial<ServicesPageContent> {
  const data = apiResponse?.data;

  if (!data) return {};

  return {
    hero: {
      label: servicesPageFallback.hero.label,

      title:
        cleanText(data.hero?.title) ||
        servicesPageFallback.hero.title,

      subtitle:
        cleanText(data.hero?.subtitle) ||
        servicesPageFallback.hero.subtitle,

      image:
        toAssetUrl(data.hero?.image) ||
        servicesPageFallback.hero.image,

      topRightLink: servicesPageFallback.hero.topRightLink,
    },

    serviceList: {
      heading: servicesPageFallback.serviceList.heading,
      loadMoreLabel: servicesPageFallback.serviceList.loadMoreLabel,
      exploreLabel: servicesPageFallback.serviceList.exploreLabel,
      modalEyebrow: servicesPageFallback.serviceList.modalEyebrow,
      modalPhilosophy: servicesPageFallback.serviceList.modalPhilosophy,
      modalButtonLabel: servicesPageFallback.serviceList.modalButtonLabel,

      /**
       * Services must follow CMS/API count.
       *
       * If API sends 8 services, show 8.
       * If API sends 2 services, show 2.
       * If API fails or sends none, use fallback.
       *
       * Important:
       * Modal uses API long_description.
       * If long_description is missing/null, modal uses API description.
       * We do NOT use old fallback fullWriteup for API services.
       */
      services:
        Array.isArray(data.services) && data.services.length
          ? data.services.map((apiService: any, index: number) => {
              const fallbackService =
                servicesPageFallback.serviceList.services[index] ||
                servicesPageFallback.serviceList.services[0];

              const title =
                cleanText(apiService?.title) ||
                fallbackService.title;

              const description =
                cleanText(apiService?.description) ||
                fallbackService.description;

              const longDescription =
                cleanText(apiService?.long_description) ||
                description;

              const apiImage = apiService?.image
                ? toAssetUrl(apiService.image)
                : '';

              return {
                id: String(apiService?.id || fallbackService.id || title),

                title,

                description,

                image:
                  apiImage ||
                  fallbackService.image,

                /**
                 * This is what the modal reads.
                 * Do not replace with fallbackService.fullWriteup.
                 */
                fullWriteup: longDescription,

                /**
                 * API does not send bullet features yet.
                 * Empty keeps old fallback bullets from appearing.
                 */
                features: [],

                fallbackImage: fallbackService.fallbackImage,
              };
            })
          : servicesPageFallback.serviceList.services,
    },

    machinery: {
      sectionLabel: servicesPageFallback.machinery.sectionLabel,
      heading: servicesPageFallback.machinery.heading,

      /**
       * Machinery should follow CMS/API count.
       * If CMS sends 8 machines, show 8.
       * If CMS sends 2 machines, show 2.
       * If CMS sends none, use fallback machines.
       */
      machines:
        Array.isArray(data.machines) && data.machines.length
          ? data.machines.map((apiMachine: any, index: number) => {
              const fallbackMachine =
                servicesPageFallback.machinery.machines[index] ||
                servicesPageFallback.machinery.machines[0];

              const apiImage = apiMachine?.image
                ? toAssetUrl(apiMachine.image)
                : '';

              return {
                id: String(apiMachine?.id || fallbackMachine.id || index),

                name: normalizeMachineName(
                  apiMachine,
                  fallbackMachine.name
                ),

                category: normalizeMachineCategory(
                  apiMachine,
                  fallbackMachine.category
                ),

                description:
                  cleanText(apiMachine?.description) ||
                  fallbackMachine.description,

                image:
                  apiImage ||
                  fallbackMachine.image,

                fallback: fallbackMachine.fallback,

                /**
                 * Keep fallback icon components for now.
                 * Use API labels and values.
                 *
                 * Once backend starts sending Phosphor icon keys,
                 * we will replace fallbackSpec.icon with getCMSIcon(apiMachine.icon1/icon2/icon3).
                 */
                specs: fallbackMachine.specs.map((fallbackSpec, specIndex) => {
                  const apiSpecLabel =
                    specIndex === 0
                      ? apiMachine?.icon1
                      : specIndex === 1
                        ? apiMachine?.icon2
                        : apiMachine?.icon3;

                  const apiSpecValue =
                    specIndex === 0
                      ? apiMachine?.value1
                      : specIndex === 1
                        ? apiMachine?.value2
                        : apiMachine?.value3;

                  return {
                    ...fallbackSpec,

                    label:
                      cleanText(apiSpecLabel) ||
                      fallbackSpec.label,

                    value:
                      cleanText(apiSpecValue) ||
                      fallbackSpec.value,
                  };
                }),
              };
            })
          : servicesPageFallback.machinery.machines,
    },
  };
}