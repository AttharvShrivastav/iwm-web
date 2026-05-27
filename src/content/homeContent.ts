export type HeroContent = {
  eyebrow: string;
  heading: {
    line1: string;
    line2: string;
  };
  subtext: string;
  button: {
    label: string;
  };
  backgroundImage: {
    src: string;
    alt: string;
    fallbackSrc: string;
  };
};

export const homeHeroFallback: HeroContent = {
  eyebrow: '+ Home',
  heading: {
    line1: 'Built on global standards',
    line2: 'Driven by local impact',
  },
  subtext:
    'We Understand how a clean living affects living in a city which is moving faster than ever',
  button: {
    label: 'Contact Us',
  },
  backgroundImage: {
    src: '/assets/heroes/home-hero.webp',
    alt: 'IWM Truck Fleet',
    fallbackSrc:
      'https://images.unsplash.com/photo-1586864387917-f53bc464e81c?q=80&w=2070&auto=format&fit=crop',
  },
};