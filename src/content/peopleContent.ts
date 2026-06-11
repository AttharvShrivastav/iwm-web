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

export type LeaderContent = {
  name: string;
  designation: string;
  email: string;
  image: string;
  fallbackImage?: string;
};

export type LeadershipSectionContent = {
  sectionLabel: string;
  heading: string;
  copiedLabel: string;
  leaders: LeaderContent[];
};

export type SipahiQuoteContent = {
  id: number;
  name: string;
  role: string;
  statement: string;
  image: string;
  fallbackImage?: string;
  yearsWithIwm?: string;
  isHindi?: boolean;
};

export type SipahiVoicesContent = {
  sectionLabel: string;
  heading: string;
  description: string;
  groups: SipahiQuoteContent[][];
};

export type CareerJobContent = {
  title: string;
  description: string;
  type: string;
  location: string;
  department?: string;
  details?: string[];
};

export type CareersSectionContent = {
  sectionLabel: string;
  heading: string;
  descriptionWithOpenings: string;
  descriptionWithoutOpenings: string;
  cvEmail: string;
  cvLabel: string;
  emptyFooterText: string;
  applyButtonLabel: string;
  jobs: CareerJobContent[];
};

export type ApplyPageContent = {
  backLabel: string;
  sectionLabel: string;
  titlePrefix: string;
  fallbackPositionLabel: string;
  formLabels: {
    name: string;
    email: string;
    phone: string;
    position: string;
    linkedin: string;
    resume: string;
    message: string;
  };
  placeholders: {
    name: string;
    email: string;
    phone: string;
    linkedin: string;
    message: string;
  };
  selectPlaceholder: string;
  generalApplicationLabel: string;
  uploadText: string;
  uploadHint: string;
  removeFileLabel: string;
  submitLabel: string;
  successTitle: string;
  successDescription: string;
  successButtonLabel: string;
  jobDescriptionLabel: string;
  aboutRoleLabel: string;
  responsibilitiesLabel: string;
  equalOpportunityText: string;
  generalApplicationTitle: string;
  generalApplicationDescription: string;
};

export type PeoplePageContent = {
  hero: PageHeroContent;
  leadership: LeadershipSectionContent;
  sipahiVoices: SipahiVoicesContent;
  careers: CareersSectionContent;
  apply: ApplyPageContent;
};

export const peoplePageFallback: PeoplePageContent = {
  hero: {
    label: '+ OUR PEOPLE',
    title: 'The Force Behind Urban Cleanliness',
    subtitle:
      'A disciplined workforce of operators, engineers, and sanitation professionals delivering consistency, scale, and reliability across urban systems.',
    image: '/assets/heroes/people-hero.webp',
    topRightLink: {
      label: 'READ OUR STORY',
      href: '/about',
    },
  },

  leadership: {
    sectionLabel: 'PEOPLE',
    heading: 'Our Leadership',
    copiedLabel: 'EMAIL COPIED',
    leaders: [
      {
        name: 'Mr. Mohan Lal Pandey',
        designation: 'Director and CEO',
        email: 'mohan@iwm-india.com',
        image: '/assets/people/leadership/mohan.webp',
      },
      {
        name: 'Mr. Sandeep Gole',
        designation: 'Director',
        email: 'sandeep@iwm-india.com',
        image: '/assets/people/leadership/sandeep.webp',
      },
      {
        name: 'Mrs. Varsha Pandey',
        designation: 'Director',
        email: 'varsha@iwm-india.com',
        image: '/assets/people/leadership/varsha.webp',
      },
      {
        name: 'Mr. Hardik Pandey',
        designation: 'General Manager',
        email: 'hardik@iwm-india.com',
        image: '/assets/people/leadership/hardik.webp',
      },
      {
        name: 'Mrs. Radhika Patidar',
        designation: 'Hr & Admin Head',
        email: 'radhika@iwm-india.com',
        image: '/assets/people/leadership/radhika.webp',
      },
      {
        name: 'Mr. Manoj Batra',
        designation: 'Finance Head',
        email: 'manojs@iwm-india.com',
        image: '/assets/people/leadership/manoj.webp',
      },
      {
        name: 'Dr. Akhilesh Upadhyay',
        designation: 'General Manager - Operations',
        email: 'akhilesh@iwm-india.com',
        image: '/assets/people/leadership/akhilesh.webp',
      },
      {
        name: 'Mr. Manas Pandey',
        designation: 'Business Development',
        email: 'manas@iwm-india.com',
        image: '/assets/people/leadership/manas.webp',
      },
      {
        name: 'Mr. Nazir Mohammed',
        designation: 'QHSE',
        email: 'qhseiwm@iwm-india.com',
        image: '/assets/people/leadership/nazir.webp',
      },
      {
        name: 'Mr. Ajit Shrivastava',
        designation: 'Public Relation Manager',
        email: 'ajit@iwm-india.com',
        image: '/assets/people/leadership/ajit.webp',
      },
    ],
  },

  sipahiVoices: {
    sectionLabel: 'VOICE FROM THE GROUND',
    heading: 'Radical Dignity in || Every Action',
    description:
      'Our Swachhata Sipahis are the backbone of everything we do. Professionalism, discipline, and pride define their journey.',
    groups: [
      [
        {
          id: 1,
          name: 'Sourabh Pandey',
          role: 'Project Manager',
          statement:
            'I have been working with the company since 15th December 2019 as a Project Manager in the Operations department. My experience here has been highly rewarding, with continuous learning and growth opportunities. The management is supportive and encourages innovation and responsibility. The work environment is professional, and teamwork is highly valued. I am proud to be associated with an organization that is committed to excellence in its services.',
          image: '/assets/people/sipahis/sipahi-1.jpg',
          yearsWithIwm: 'Since 2019',
        },
        {
          id: 2,
          name: 'पदम सिंह सोलंकी',
          role: 'मैकेनिक (वर्कशॉप)',
          statement:
            'मैं पिछले 6+ वर्षों से इस कंपनी में मैकेनिक के रूप में कार्य कर रहा हूँ। यहाँ मुझे विभिन्न मशीनों पर काम करने का अवसर मिला है, जिससे मेरी तकनीकी जानकारी और कौशल में काफी सुधार हुआ है। कंपनी समय पर वेतन देती है और काम का वातावरण भी अच्छा है। हमारे वरिष्ठ हमेशा मार्गदर्शन करते हैं और जरूरत पड़ने पर पूरा सहयोग मिलता है। मुझे इस कंपनी का हिस्सा बनकर गर्व महसूस होता है।',
          image: '/assets/people/sipahis/sipahi-2.jpg',
          yearsWithIwm: '6+ Years',
          isHindi: true,
        },
      ],
      [
        {
          id: 3,
          name: 'अजोध्या बरिया',
          role: 'सफाई मित्र',
          statement:
            'मैं पिछले कई वर्षों से इस कंपनी में कार्य कर रही हूँ। यहाँ काम करने का अनुभव अच्छा है। कंपनी समय पर वेतन देती है और काम भी नियमित मिलता है। हमारे सुपरवाइजर सहयोग करते हैं और काम को सही तरीके से समझाते हैं। मुझे यहाँ काम करके संतोष और सुरक्षा महसूस होती है।',
          image: '/assets/people/sipahis/sipahi-3.jpg',
          yearsWithIwm: 'Multiple Years',
          isHindi: true,
        },
        {
          id: 4,
          name: 'गंगा बाई साठे',
          role: 'सफाई मित्र',
          statement:
            'मैं पिछले 2 वर्षों से इस कंपनी में सड़क सफाई का कार्य कर रही हूँ। यहाँ का माहौल अच्छा है और सभी एक-दूसरे का सहयोग करते हैं। कंपनी हमें जरूरी उपकरण और सुरक्षा का ध्यान रखती है। समय पर वेतन मिलने से परिवार चलाने में सुविधा होती है। मुझे यहाँ काम करके अच्छा लगता है।',
          image: '/assets/people/sipahis/sipahi-4.jpg',
          yearsWithIwm: '2 Years',
          isHindi: true,
        },
      ],
    ],
  },

  careers: {
    sectionLabel: 'CAREERS',
    heading: 'Join the movement for a Cleaner Tomorrow',
    descriptionWithOpenings:
      'We are always looking for passionate individuals who are ready to make a tangible impact on the environment and urban infrastructure.',
    descriptionWithoutOpenings:
      "While we don't have any immediate openings, we are always interested in meeting exceptional people. If you believe you are suitable for a role and want to reach out, please contact us.",
    cvEmail: 'info@iwm-india.com',
    cvLabel: 'SEND US YOUR CV',
    emptyFooterText: "Don't see a fit? We're always looking for talent.",
    applyButtonLabel: 'APPLY NOW',

    /**
     * Client currently has no openings.
     * Keep this empty.
     * When CMS sends jobs later, this array will become dynamic.
     */
    jobs: [],
  },

  apply: {
    backLabel: 'Back to Careers',
    sectionLabel: 'APPLICATION FORM',
    titlePrefix: 'Apply for',
    fallbackPositionLabel: 'a Position',
    formLabels: {
      name: 'Full Name',
      email: 'Email Address',
      phone: 'Phone Number',
      position: 'Applying For',
      linkedin: 'LinkedIn / Portfolio URL (Optional)',
      resume: 'Resume / CV (PDF or DOCX)',
      message: 'Cover Letter / Additional Notes',
    },
    placeholders: {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+91 00000 00000',
      linkedin: 'https://linkedin.com/in/username',
      message: "Tell us why you're a great fit for IWM...",
    },
    selectPlaceholder: 'Select a position',
    generalApplicationLabel: 'Other / General Application',
    uploadText: 'Click to upload or drag and drop',
    uploadHint: 'PDF, DOCX (Max 5MB)',
    removeFileLabel: 'Remove File',
    submitLabel: 'SUBMIT APPLICATION',
    successTitle: 'Application Received',
    successDescription:
      'Thank you for your interest in joining IWM. Our team will review your application and get back to you soon.',
    successButtonLabel: 'BACK TO HOME',
    jobDescriptionLabel: 'JOB DESCRIPTION',
    aboutRoleLabel: 'About the Role',
    responsibilitiesLabel: 'Key Responsibilities',
    equalOpportunityText:
      'IWM is an equal opportunity employer. We celebrate diversity and are committed to creating an inclusive environment for all employees.',
    generalApplicationTitle: 'Join Our Talent Pool',
    generalApplicationDescription:
      "Don't see a specific role that fits? Apply anyway! We're always looking for passionate individuals to join our mission for cleaner cities.",
  },
};