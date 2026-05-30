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
       * Important:
       * API currently sends only 1 service.
       * So we overlay API services onto fallback services by index.
       * This keeps the full service list and modal content stable.
       */
      services: servicesPageFallback.serviceList.services.map(
        (fallbackService, index) => {
          const apiService = Array.isArray(data.services)
            ? data.services[index]
            : null;

          const apiImage = apiService?.image
            ? toAssetUrl(apiService.image)
            : '';

          return {
            ...fallbackService,

            id: fallbackService.id,

            title:
              cleanText(apiService?.title) ||
              fallbackService.title,

            description:
              cleanText(apiService?.description) ||
              fallbackService.description,

            image:
              apiImage ||
              fallbackService.image,

            /**
             * Keep rich modal fallback.
             * API only has description right now, not fullWriteup/features.
             */
            fullWriteup: fallbackService.fullWriteup,
            features: fallbackService.features,
            fallbackImage: fallbackService.fallbackImage,
          };
        }
      ),
    },

    machinery: {
  sectionLabel: servicesPageFallback.machinery.sectionLabel,
  heading: servicesPageFallback.machinery.heading,

  /**
   * Machinery should follow CMS count.
   * If CMS sends 2 machines, show 2 machines.
   * If CMS sends no machines, use fallback machines.
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

            name:
              cleanText(apiMachine?.heading) ||
              cleanText(apiMachine?.headline) ||
              fallbackMachine.name,

            category: fallbackMachine.category,

            description:
              cleanText(apiMachine?.description) ||
              cleanText(apiMachine?.headline) ||
              fallbackMachine.description,

            image: apiImage || fallbackMachine.image,

            fallback: fallbackMachine.fallback,

            /**
             * Keep fallback icons/spec labels for now.
             * Use CMS values if available.
             * We are not changing icon logic until CMS icon format is finalized.
             */
            specs: fallbackMachine.specs.map((fallbackSpec, specIndex) => {
              const apiSpecValue =
                specIndex === 0
                  ? apiMachine?.value1
                  : specIndex === 1
                    ? apiMachine?.value2
                    : apiMachine?.value3;

              return {
                ...fallbackSpec,
                value: cleanText(apiSpecValue) || fallbackSpec.value,
              };
            }),
          };
        })
      : servicesPageFallback.machinery.machines,
},
  };
}