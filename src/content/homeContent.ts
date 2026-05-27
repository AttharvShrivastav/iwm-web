export type HeroContent = {
  eyebrow: string;
  headline: string;
  description: string;
  ctaLabel: string;
  ctaLink: string;
  image: {
    src: string;
    alt: string;
    fallbackSrc: string;
  };
};

export const homeHeroFallback: HeroContent = {
  eyebrow: '+ Home',
  headline: 'Built on global standards || Driven by local impact',
  description:
    'We Understand how a clean living affects living in a city which is moving faster than ever',
  ctaLabel: 'Contact Us',
  ctaLink: '/contact',
  image: {
    src: '/assets/heroes/home-hero.webp',
    alt: 'IWM Truck Fleet',
    fallbackSrc:
      'https://images.unsplash.com/photo-1586864387917-f53bc464e81c?q=80&w=2070&auto=format&fit=crop',
  },
};