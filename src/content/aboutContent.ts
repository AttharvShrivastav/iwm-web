export type PageHeroContent = {
  label: string;
  title: string;
  subtitle: string;
  image: string;
  topRightLink?: {
    label: string;
    href: string;
  };
};

export type ValueItemContent = {
  title?: string;
  description: string;
  hindiText?: string;
};

export type ValuesSectionContent = {
  label: string;
  mainText: string;
  highlightText: string;
  values: ValueItemContent[];
};

export type AboutAnimatedTextContent = {
  label: string;
  mainText: string;
  buttonLabel: string;
  buttonLink: string;
};

export type AboutPageContent = {
  hero: PageHeroContent;
  values: ValuesSectionContent;
  location: LocationSectionContent;
  foundersNote: FoundersNoteContent;
  ourStory: OurStoryContent;
  animatedText: AboutAnimatedTextContent;
  clients: ClientsSectionContent;
};

export const aboutPageFallback: AboutPageContent = {
  hero: {
    label: '+ ABOUT US',
    title: 'Industrial Scale With Human Core',
    subtitle:
      '"Excellent Execution. Innovation. Radical Dignity." These are not aspirations. They are the operating principles behind every project IWM has ever taken on.',
    image: '/assets/heroes/about-hero.webp',
    topRightLink: {
      label: 'READ OUR STORY',
      href: '#',
    },
  },

  values: {
    label: '+ OUR VALUES',
    mainText: 'Excellent execution. Radical dignity. Relentless innovation.',
    highlightText:
      'The values that shape everything we do and everyone we serve.',
    values: [
      {
        title: 'Excellent Execution',
        description:
          'We are action-oriented and hands-on. Our confidence is based on visible results — not promises. Management on the ground, every day.',
        hindiText: 'बेमिसाल काम — जो सबको दिखे।',
      },
      {
        title: 'Continuos Innovation',
        description:
          'We embrace new technologies and new ways of working not for novelty, but because it is the difference between leading and being left behind.',
        hindiText: 'नई सोच — जो हमें आगे रखे।',
      },
      {
        title: 'Radical Dignity',
        description:
          'The goodwill this company has earned rests on the shoulders of those who work day in and day out. We empower, stand by, and honour every Sipahi.',
        hindiText: 'पूरा सम्मान — जो हर सिपाही का हक है।',
      },
    ],
  },
  location: {
  sectionLabel: 'OUR LOCATION',
  heading: 'Based in Indore, India || Serving the whole Nation',
  locations: [
    { state: 'MADHYA PRADESH', city: 'INDORE' },
    { state: 'TAMIL NADU', city: 'CHENNAI' },
    { state: 'MADHYA PRADESH', city: 'UJJAIN' },
    { state: 'GUJRAT', city: 'SURAT' },
    { state: 'MADHYA PRADESH', city: 'INDORE' },
    { state: 'TAMIL NADU', city: 'CHENNAI' },
    { state: 'MADHYA PRADESH', city: 'UJJAIN' },
  ],
},

foundersNote: {
  sectionLabel: "FOUNDER'S NOTE",
  image: {
    src: '/assets/about/foundersnote/founders-note.jpeg',
    alt: 'Founder',
    fallbackSrc:
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop',
  },
  quote:
    "We don't just manage waste; we manage the future of our cities.",
  paragraphs: [
    "When we started IWM, the goal was simple yet ambitious: to bring industrial-grade efficiency to the most fundamental aspect of urban living—sanitation. We saw cities growing at a pace that traditional systems couldn't match.",
    'Our approach has always been centered on two pillars: radical dignity for our workers and relentless innovation in our processes. Every Sipahi on the ground is a testament to our commitment to excellence.',
    'Today, as we serve multiple cities across India, our mission remains unchanged. We are here to build infrastructure that lasts and impact that matters.',
  ],
  founderName: 'Mohan Pandey',
  founderRole: 'Founder and CEO, IWM',
},

ourStory: {
  sectionLabel: 'OUR STORY',
  heading: 'Our Story Started with || A Clear Vision',
  phases: [
    {
      year: '2014',
      title: 'India Market Entry',
      description:
        'IWM enters India, bringing its global expertise in serving MENA. Starting operations in Chennai, and establishing its Indian footprint in facility management and waste collection.',
      image: 'assets/about/ourstory/story-1.webp',
    },
    {
      year: '2016',
      title: 'Record-Breaking Mobilization',
      description:
        "At the Ujjain Kumbh Mela, IWM breaks the world record for 'Most People Sweeping Simultaneously' with 5,595 people. IWM achieves its largest mobilization and single order project.",
      image: 'assets/about/ourstory/story-2.webp',
    },
    {
      year: '2020',
      title: 'National Leadership in Mechanized Sweeping',
      description:
        'After having contributed in making Indore the cleanest city in India for the 4th time in a row, IWM is awarded the single largest work order for mechanized sweeping in the nation.',
      image: 'assets/about/ourstory/story-3.webp',
    },
    {
      year: '2025',
      title: 'Leading the Nation',
      description:
        'After having contributed in making Indore the cleanest city in India for the 4th time in a row, IWM is awarded the single largest work order for mechanized sweeping in the nation.',
      image: 'assets/about/ourstory/story-4.webp',
    },
  ],
},

  animatedText: {
  label: 'MEET THE TEAM',
  mainText:
    'We build and operate large-scale waste management systems that make cities cleaner, more efficient, and environmentally sustainable.',
  buttonLabel: 'TEAM',
  buttonLink: '/people',
},

clients: {
  sectionLabel: 'WHO WE WORK WITH',
  heading: 'Trusted by Government || and Corporates',
  topRowLogos: [
    {
      src: '/assets/home/industries/logos/industry-authority-logo-3.webp',
      alt: 'NHAI',
    },
    {
      src: '/assets/home/industries/logos/industry-authority-logo-5.webp',
      alt: 'IIM',
    },
    {
      src: '/assets/home/industries/logos/industry-corporate-logo-1.webp',
      alt: 'Phoenix Mall',
    },
    {
      src: '/assets/home/industries/logos/industry-corporate-logo-3.webp',
      alt: 'Cooper Standard',
    },
    {
      src: '/assets/home/industries/logos/industry-corporate-logo-5.webp',
      alt: 'Hitachi',
    },
  ],
  bottomRowLogos: [
    {
      src: '/assets/home/industries/logos/industry-corporate-logo-6.webp',
      alt: 'Trivitron',
    },
    {
      src: '/assets/home/industries/logos/industry-municipal-logo-1.webp',
      alt: 'Indore Municipal Corporation',
    },
    {
      src: '/assets/home/industries/logos/industry-municipal-logo-3.webp',
      alt: 'Ujjain Municipal Corporation',
    },
    {
      src: '/assets/home/industries/logos/industry-municipal-logo-6.webp',
      alt: 'Greater Chennai Corporation',
    },
    {
      src: '/assets/home/industries/logos/industry-municipal-logo-7.webp',
      alt: 'Jabalpur Municipal Corporation',
    },
  ],
},
};



export type LocationItemContent = {
  state: string;
  city: string;
};

export type LocationSectionContent = {
  sectionLabel: string;
  heading: string;
  locations: LocationItemContent[];
};

export type FoundersNoteContent = {
  sectionLabel: string;
  image: {
    src: string;
    alt: string;
    fallbackSrc: string;
  };
  quote: string;
  paragraphs: string[];
  founderName: string;
  founderRole: string;
};

export type StoryPhaseContent = {
  year: string;
  title: string;
  description: string;
  image: string;
  fallbackImage?: string;
};

export type OurStoryContent = {
  sectionLabel: string;
  heading: string;
  phases: StoryPhaseContent[];
};

export type ClientLogoContent = {
  src: string;
  alt: string;
  fallbackSrc?: string;
};

export type ClientsSectionContent = {
  sectionLabel: string;
  heading: string;
  topRowLogos: ClientLogoContent[];
  bottomRowLogos: ClientLogoContent[];
};