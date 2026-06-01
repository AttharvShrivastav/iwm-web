export type ContactOfficeContent = {
  label: string;
  address: string[];
};

export type ContactInfoContent = {
  sectionLabel: string;
  heading: string;
  offices: ContactOfficeContent[];
  emailLabel: string;
  email: string;
  phoneLabel: string;
  phone: string;
  phoneHref: string;
};

export type ContactFormContent = {
  labels: {
    name: string;
    email: string;
    subject: string;
    message: string;
  };
  placeholders: {
    name: string;
    email: string;
    subject: string;
    message: string;
  };
  submitLabel: string;
  submittingLabel: string;
  successMessage: string;
  errorMessage: string;
};

export type ContactPageContent = {
  hero: {
    label: string;
    title: string;
    subtitle: string;
    image: string;
    topRightLink?: {
      label: string;
      href: string;
    };
  };
  contactInfo: ContactInfoContent;
  form: ContactFormContent;
  mapEmbedUrl: string;
};

export const contactPageFallback: ContactPageContent = {
  hero: {
    label: '+ CONTACT',
    title: "Let's Build Cleaner Cities || Together",
    subtitle:
      "Whether you're a municipal partner, a potential recruit, or interested in our services, we're ready to start the conversation.",
    image: '/assets/heroes/contact-hero.webp',
    topRightLink: {
      label: 'OUR SERVICES',
      href: '/services',
    },
  },

  contactInfo: {
    sectionLabel: 'GET IN TOUCH',
    heading: "We're here to || help you.",
    offices: [
      {
        label: 'Indore Office',
        address: [
          '663, East Ring Rd, Near Bombay Hospital,',
          'Indore, Madhya Pradesh 452018',
        ],
      },
      {
        label: 'Chennai Office',
        address: [
          '506 PM House, Sri Shipping Building Alandru St,',
          'St Thomas Mount, Chennai — 600016',
        ],
      },
    ],
    emailLabel: 'Email Us',
    email: 'info@iwm-india.com',
    phoneLabel: 'Call Us',
    phone: '0731-4971717',
    phoneHref: '+91731491717',
  },

  form: {
    labels: {
      name: 'Full Name',
      email: 'Email Address',
      subject: 'Subject',
      message: 'Message',
    },
    placeholders: {
      name: 'John Doe',
      email: 'john@example.com',
      subject: 'How can we help?',
      message: 'Tell us more about your project...',
    },
    submitLabel: 'SEND MESSAGE',
    submittingLabel: 'SENDING...',
    successMessage: 'Thank you for your message. We will get back to you soon!',
    errorMessage: 'Something went wrong. Please try again.',
  },

  mapEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3680.123456789!2d75.89123456789!3d22.75123456789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDQ1JzA0LjQiTiA3NcKwNTMnMjguNCJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin',
};