import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { useSiteContent } from '../../hooks/useSiteContent';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { content: siteContent } = useSiteContent();

  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterWebsite, setNewsletterWebsite] = useState('');
  const [isNewsletterSubmitting, setIsNewsletterSubmitting] = useState(false);
  const [comingSoonMessage, setComingSoonMessage] = useState('');

  const [newsletterStatus, setNewsletterStatus] = useState<{
    type: 'success' | 'error' | '';
    message: string;
  }>({
    type: '',
    message: '',
  });

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'People', href: '/people' },
    { label: 'About us', href: '/about' },
    { label: '404', href: '/404' },
  ];

  const socialLinks = [
    { label: 'Instagram', href: siteContent?.socialLinks.instagram },
    { label: 'Facebook', href: siteContent?.socialLinks.facebook },
    { label: 'Linkedin', href: siteContent?.socialLinks.linkedin },
    {
      label: 'Whatsapp',
      href: siteContent?.whatsappHref
        ? `https://wa.me/${siteContent.whatsappHref.replace(/[^\d]/g, '')}`
        : undefined,
    },
    { label: 'X', href: siteContent?.socialLinks.twitter },
  ];

  const chennaiAddress =
    siteContent?.address ||
    '506 PM House, Sri Shipping Bldg, Alandru St, St Thomas Mount, Chennai — 600016';

  const copyrightText =
    siteContent?.copyrightText ||
    `© ${currentYear} ALL RIGHTS RESERVED BY INTERNATIONAL WASTE MANAGEMENT PVT LTD`;

  const showComingSoon = (label: string) => {
    setComingSoonMessage(`${label} link coming soon`);

    window.setTimeout(() => {
      setComingSoonMessage('');
    }, 2200);
  };

  const handleSocialClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    label: string,
    href?: string
  ) => {
    if (!href) {
      e.preventDefault();
      showComingSoon(label);
    }
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsNewsletterSubmitting(true);
    setNewsletterStatus({
      type: '',
      message: '',
    });

    const cleanEmail = newsletterEmail.trim();

    if (!cleanEmail) {
      setNewsletterStatus({
        type: 'error',
        message: 'Please enter your email address.',
      });
      setIsNewsletterSubmitting(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(cleanEmail)) {
      setNewsletterStatus({
        type: 'error',
        message: 'Please enter a valid email address.',
      });
      setIsNewsletterSubmitting(false);
      return;
    }

    try {
      /**
       * Keeping current newsletter route untouched for now.
       * We will update all form routes together later.
       */
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: cleanEmail,
          pageUrl: window.location.href,
          website: newsletterWebsite,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Something went wrong.');
      }

      setNewsletterStatus({
        type: 'success',
        message: result.message || 'Thank you for subscribing.',
      });

      setNewsletterEmail('');
      setNewsletterWebsite('');
    } catch (error) {
      setNewsletterStatus({
        type: 'error',
        message:
          error instanceof Error
            ? error.message
            : 'Could not subscribe. Please try again.',
      });
    } finally {
      setIsNewsletterSubmitting(false);
    }
  };

  return (
    <footer className="relative w-full bg-[#1a5fb4] text-white pt-24 pb-12 px-8 md:px-16 overflow-hidden">
      {comingSoonMessage && (
        <div className="fixed left-1/2 bottom-8 z-[999] -translate-x-1/2 bg-black text-white px-5 py-3 text-xs md:text-sm font-sans shadow-2xl">
          {comingSoonMessage}
        </div>
      )}

      <div className="max-w-[1800px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr] lg:grid-cols-[3fr_2fr] gap-12 md:gap-16 lg:gap-32 pb-20">
          {/* Left Side */}
          <div className="flex flex-col justify-between h-full min-h-[250px] md:min-h-[300px]">
            <div className="flex items-end gap-4 md:gap-6 lg:gap-10 w-full">
              <div className="h-[clamp(55px,12vw,160px)] md:h-[clamp(55px,6vw,160px)] lg:h-[clamp(55px,8vw,160px)] shrink-0">
                <Logo variant="primary" className="text-white h-full w-auto" />
              </div>

              <h2 className="text-[clamp(24px,6vw,76px)] md:text-[clamp(24px,3vw,76px)] lg:text-[clamp(24px,4vw,76px)] font-medium font-agrandir leading-[0.9] tracking-tight uppercase whitespace-nowrap shrink-0">
                GET IN TOUCH <br />
                FOR ASSISTANCE
              </h2>
            </div>

            <div className="mt-12 lg:mt-auto">
              <p className="text-[12px] md:text-[14px] font-light opacity-80 tracking-normal font-sans">
                Design and Development by{' '}
                <span className="font-semibold text-white">Capslock</span>
              </p>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex flex-col gap-16">
            <div className="flex flex-col gap-8 max-w-[500px]">
              <p className="text-[14px] md:text-[16px] font-light leading-relaxed opacity-90 font-sans">
                For first insight to final result, we're with you at every turn.
                Reach out to our teams in Indore or Chennai to build cleaner
                cities together.
              </p>

              <form
                onSubmit={handleNewsletterSubmit}
                noValidate
                className="flex flex-col gap-3"
              >
                <input
                  type="text"
                  name="website"
                  value={newsletterWebsite}
                  onChange={(e) => setNewsletterWebsite(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />

                <div className="flex flex-col md:flex-row w-full gap-2 md:gap-0">
                  <input
                    type="text"
                    inputMode="email"
                    name="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email here"
                    className="flex-1 bg-[#0d3b75] border-none px-6 py-5 text-[14px] focus:outline-none focus:ring-0 transition-all rounded-none placeholder:text-white/30"
                  />

                  <button
                    type="submit"
                    disabled={isNewsletterSubmitting}
                    className="w-full md:w-auto bg-[#c2d9f0] text-[#1a5fb4] px-8 py-5 text-[12px] font-bold tracking-widest hover:bg-white transition-colors whitespace-nowrap rounded-none disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isNewsletterSubmitting ? 'SENDING...' : 'KNOW MORE'}
                  </button>
                </div>

                {newsletterStatus.message && (
                  <p
                    className={`text-[13px] font-sans ${
                      newsletterStatus.type === 'success'
                        ? 'text-white'
                        : 'text-red-100'
                    }`}
                  >
                    {newsletterStatus.message}
                  </p>
                )}
              </form>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 sm:gap-8">
              {/* Navigation */}
              <div className="flex flex-col gap-8">
                <h3 className="text-[20px] font-medium font-agrandir tracking-tight">
                  Navigation
                </h3>
                <ul className="flex flex-col gap-3">
                  {navLinks.map((item) => (
                    <li key={item.label}>
                      <Link
                        to={item.href}
                        className="text-[14px] font-light opacity-80 hover:opacity-100 transition-opacity"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Social */}
              <div className="flex flex-col gap-8">
                <h3 className="text-[20px] font-medium font-agrandir tracking-tight">
                  Social
                </h3>

                <ul className="flex flex-col gap-3">
                  {socialLinks.map((item) => (
                    <li key={item.label}>
                      <a
                        href={item.href || '#'}
                        target={item.href ? '_blank' : undefined}
                        rel={item.href ? 'noreferrer' : undefined}
                        onClick={(e) =>
                          handleSocialClick(e, item.label, item.href)
                        }
                        className={`text-[14px] font-light opacity-80 hover:opacity-100 transition-opacity ${
                          item.href ? '' : 'cursor-pointer'
                        }`}
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Addresses */}
              <div className="flex flex-col gap-8">
                <h3 className="text-[20px] font-medium font-agrandir tracking-tight">
                  Addresses
                </h3>

                <div className="flex flex-col gap-10">
                  {/* Indore Office - static */}
                  <div className="flex flex-col gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-50">
                      Indore Office
                    </span>
                    <p className="text-[14px] font-light opacity-80 leading-relaxed font-sans">
                      663, East, Ring Rd, <br />
                      Near Bombay Hospital, <br />
                      Indore, MP 452018
                    </p>
                  </div>

                  {/* Chennai Office - CMS/WebInfo */}
                  <div className="flex flex-col gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-50">
                      Chennai Office
                    </span>
                    <p className="text-[14px] font-light opacity-80 leading-relaxed font-sans">
                      {chennaiAddress}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full h-[1px] bg-white/20 mb-8" />

        <div className="text-center">
          <p className="text-[11px] md:text-[13px] font-medium tracking-[0.2em] opacity-70 uppercase">
            {copyrightText}
          </p>
        </div>
      </div>
    </footer>
  );
};