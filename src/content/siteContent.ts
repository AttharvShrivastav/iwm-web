export type SocialLinksContent = {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  youtube?: string;
  linkedin?: string;
};

export type SiteContent = {
  siteName: string;
  siteTagline: string;
  logo: {
    src: string;
    alt: string;
    fallbackSrc: string;
  };
  favicon?: string;
  contactNumber: string;
  contactNumberHref: string;
  whatsappNumber: string;
  whatsappHref: string;
  email: string;
  supportEmail?: string;
  address: string;
  mapLink?: string;
  socialLinks: SocialLinksContent;
  footerText?: string;
  copyrightText: string;
  businessHours?: string;
};

export const siteFallback: SiteContent = {
  siteName: 'International Waste Management Pvt. Ltd',
  siteTagline: 'Be Clean Be Safe',

  logo: {
    src: '/assets/logo.png',
    alt: 'International Waste Management Pvt. Ltd',
    fallbackSrc: '/assets/logo.png',
  },

  contactNumber: '0731 497 1717',
  contactNumberHref: '+917314971717',

  whatsappNumber: '0731 497 1717',
  whatsappHref: '+917314971717',

  email: 'info@iwm-india.com',
  supportEmail: undefined,

  address:
    '663, East, Ring Rd, near Bombay Hospital, Indore, Madhya Pradesh 452018',

  mapLink: undefined,

  socialLinks: {
    facebook: undefined,
    instagram: undefined,
    twitter: undefined,
    youtube: undefined,
    linkedin: undefined,
  },

  footerText: undefined,

  copyrightText: `© ${new Date().getFullYear()} International Waste Management Pvt. Ltd. All rights reserved.`,

  businessHours: undefined,
};