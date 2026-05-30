import React, { useState, useEffect } from 'react';
import { PageHero } from '../components/sections/PageHero';
import { SectionHeader } from '../components/common/SectionHeader';
import { Button } from '../components/common/Button';
import { Envelope, Phone, MapPin } from '@phosphor-icons/react';
import { CMSHeading } from '../cms/CMSHeading';
import { useContactPageContent } from '../hooks/useContactPageContent';

export const ContactPage: React.FC = () => {
  const {
    content: contactContent,
    status,
    isLoading,
    isFallback,
    error,
  } = useContactPageContent();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (import.meta.env.DEV && error) {
    console.warn('ContactPage content error:', error);
  }

  if (import.meta.env.DEV && isFallback) {
    console.info('ContactPage is rendering fallback content.');
  }

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    website: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | '';
    message: string;
  }>({
    type: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!contactContent) return;

    setIsSubmitting(true);
    setSubmitStatus({
      type: '',
      message: '',
    });

    try {
      const formEndpoint =
        import.meta.env.VITE_CONTACT_FORM_API_URL || '/api/contact';

      const response = await fetch(formEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          website: formData.website,
          pageUrl: window.location.href,
        }),
      });

      const result = await response.json().catch(() => null);

      const isSuccess =
        response.ok && (result?.success === true || result?.status === true);

      if (!isSuccess) {
        throw new Error(
          result?.message ||
            result?.error ||
            contactContent.form.errorMessage
        );
      }

      setSubmitStatus({
        type: 'success',
        message: result?.message || contactContent.form.successMessage,
      });

      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        website: '',
      });
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message:
          error instanceof Error
            ? error.message
            : contactContent.form.errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (isLoading || !contactContent) {
    return <div className="min-h-screen bg-white" aria-hidden="true" />;
  }

  return (
    <div key={`contact-${status}`} className="bg-white">
      <PageHero
        label={contactContent.hero.label}
        title={contactContent.hero.title}
        subtitle={contactContent.hero.subtitle}
        image={contactContent.hero.image}
        topRightLink={contactContent.hero.topRightLink}
      />

      <section className="w-full py-24 md:py-32 px-8 md:px-16">
        <div className="w-full">
          <div className="grid grid-cols-1 lg:grid-cols-[0.45fr_0.55fr] gap-20 lg:gap-32">
            <div className="flex flex-col gap-16">
              <div className="flex flex-col gap-8">
                <SectionHeader
                  label={contactContent.contactInfo.sectionLabel}
                  className="text-black/60"
                />

                <CMSHeading
                  as="h2"
                  text={contactContent.contactInfo.heading}
                  className="text-3xl md:text-5xl font-medium text-black font-agrandir tracking-tight leading-tight"
                />
              </div>

              <div className="flex flex-col gap-12">
                {contactContent.contactInfo.offices.map((office) => (
                  <div key={office.label} className="flex gap-6 items-start">
                    <div className="w-12 h-12 bg-zinc-50 flex items-center justify-center rounded-sm text-black flex-shrink-0">
                      <MapPin size={24} weight="light" />
                    </div>

                    <div className="flex flex-col gap-2">
                      <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">
                        {office.label}
                      </p>

                      <p className="text-lg text-black font-sans leading-relaxed">
                        {office.address.map((line, index) => (
                          <React.Fragment key={`${office.label}-${line}`}>
                            {line}
                            {index < office.address.length - 1 && <br />}
                          </React.Fragment>
                        ))}
                      </p>
                    </div>
                  </div>
                ))}

                <div className="flex gap-6 items-start">
                  <div className="w-12 h-12 bg-zinc-50 flex items-center justify-center rounded-sm text-black flex-shrink-0">
                    <Envelope size={24} weight="light" />
                  </div>

                  <div className="flex flex-col gap-2">
                    <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">
                      {contactContent.contactInfo.emailLabel}
                    </p>

                    <a
                      href={`mailto:${contactContent.contactInfo.email}`}
                      className="text-lg text-black font-sans hover:text-[#005696] transition-colors"
                    >
                      {contactContent.contactInfo.email}
                    </a>
                  </div>
                </div>

                <div className="flex gap-6 items-start">
                  <div className="w-12 h-12 bg-zinc-50 flex items-center justify-center rounded-sm text-black flex-shrink-0">
                    <Phone size={24} weight="light" />
                  </div>

                  <div className="flex flex-col gap-2">
                    <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">
                      {contactContent.contactInfo.phoneLabel}
                    </p>

                    <a
                      href={`tel:${contactContent.contactInfo.phoneHref}`}
                      className="text-lg text-black font-sans hover:text-[#005696] transition-colors"
                    >
                      {contactContent.contactInfo.phone}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-zinc-50 p-8 md:p-16 rounded-none">
              <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                <input
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="name"
                      className="text-xs font-bold text-zinc-400 uppercase tracking-widest"
                    >
                      {contactContent.form.labels.name}
                    </label>

                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder={contactContent.form.placeholders.name}
                      className="w-full bg-transparent border-b border-zinc-300 py-3 text-black font-sans focus:outline-none focus:border-black transition-colors"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="email"
                      className="text-xs font-bold text-zinc-400 uppercase tracking-widest"
                    >
                      {contactContent.form.labels.email}
                    </label>

                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder={contactContent.form.placeholders.email}
                      className="w-full bg-transparent border-b border-zinc-300 py-3 text-black font-sans focus:outline-none focus:border-black transition-colors"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="subject"
                    className="text-xs font-bold text-zinc-400 uppercase tracking-widest"
                  >
                    {contactContent.form.labels.subject}
                  </label>

                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder={contactContent.form.placeholders.subject}
                    className="w-full bg-transparent border-b border-zinc-300 py-3 text-black font-sans focus:outline-none focus:border-black transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="message"
                    className="text-xs font-bold text-zinc-400 uppercase tracking-widest"
                  >
                    {contactContent.form.labels.message}
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    placeholder={contactContent.form.placeholders.message}
                    className="w-full bg-transparent border-b border-zinc-300 py-3 text-black font-sans focus:outline-none focus:border-black transition-colors resize-none"
                  />
                </div>

                <div className="pt-4 flex flex-col gap-4">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    label={
                      isSubmitting
                        ? contactContent.form.submittingLabel
                        : contactContent.form.submitLabel
                    }
                    bgColor="bg-black"
                    textColor="text-white"
                    className="w-full md:w-auto px-12 py-4 text-xs tracking-widest disabled:opacity-60 disabled:cursor-not-allowed"
                  />

                  {submitStatus.message && (
                    <p
                      className={`text-sm font-sans ${
                        submitStatus.type === 'success'
                          ? 'text-green-700'
                          : 'text-red-700'
                      }`}
                    >
                      {submitStatus.message}
                    </p>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full h-[400px] md:h-[600px] bg-zinc-200 overflow-hidden grayscale">
        <iframe
          src={contactContent.mapEmbedUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="IWM office location map"
        />
      </section>
    </div>
  );
};