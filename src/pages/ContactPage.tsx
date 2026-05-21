import React, { useState, useEffect } from 'react';
import { PageHero } from '../components/sections/PageHero';
import { SectionHeader } from '../components/common/SectionHeader';
import { Button } from '../components/common/Button';
import { Envelope, Phone, MapPin } from '@phosphor-icons/react';

export const ContactPage: React.FC = () => {
  // Ensure page starts at top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({
  name: '',
  email: '',
  subject: '',
  message: '',
  website: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | '';
    message: string;
  }>({
    type: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  setIsSubmitting(true);
  setSubmitStatus({
    type: '',
    message: ''
  });

  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,
        pageUrl: window.location.href,
      }),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Something went wrong.');
    }

    setSubmitStatus({
      type: 'success',
      message: result.message || 'Thank you for your message. We will get back to you soon!',
    });

    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
      website: ''
    });
  } catch (error) {
    setSubmitStatus({
      type: 'error',
      message: error instanceof Error ? error.message : 'Something went wrong. Please try again.',
    });
  } finally {
    setIsSubmitting(false);
  }
};

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-white">
      <PageHero 
        label="+ CONTACT"
        title="Let's Build Cleaner Cities Together"
        subtitle="Whether you're a municipal partner, a potential recruit, or interested in our services, we're ready to start the conversation."
        image="/assets/heroes/contact-hero.webp"
        topRightLink={{
          label: "OUR SERVICES",
          href: "/services"
        }}
      />

      <section className="w-full py-24 md:py-32 px-8 md:px-16">
        <div className="w-full">
          <div className="grid grid-cols-1 lg:grid-cols-[0.45fr_0.55fr] gap-20 lg:gap-32">
            {/* Left Column: Contact Info */}
            <div className="flex flex-col gap-16">
              <div className="flex flex-col gap-8">
                <SectionHeader label="GET IN TOUCH" className="text-black/60" />
                <h2 className="text-3xl md:text-5xl font-medium text-black font-agrandir tracking-tight leading-tight">
                  We're here to <br /> help you.
                </h2>
              </div>

              <div className="flex flex-col gap-12">
                {/* Indore Office */}
                <div className="flex gap-6 items-start">
                  <div className="w-12 h-12 bg-zinc-50 flex items-center justify-center rounded-sm text-black flex-shrink-0">
                    <MapPin size={24} weight="light" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Indore Office</p>
                    <p className="text-lg text-black font-sans leading-relaxed">
                      663, East, Ring Rd, Near Bombay Hospital,<br />
                      Indore, Madhya Pradesh 452018
                    </p>
                  </div>
                </div>

                {/* Chennai Office */}
                <div className="flex gap-6 items-start">
                  <div className="w-12 h-12 bg-zinc-50 flex items-center justify-center rounded-sm text-black flex-shrink-0">
                    <MapPin size={24} weight="light" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Chennai Office</p>
                    <p className="text-lg text-black font-sans leading-relaxed">
                      506 PM House, Sri Shipping Building Alandru St,<br />
                      St Thomas Mount, Chennai — 600016
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex gap-6 items-start">
                  <div className="w-12 h-12 bg-zinc-50 flex items-center justify-center rounded-sm text-black flex-shrink-0">
                    <Envelope size={24} weight="light" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Email Us</p>
                    <a href="mailto:info@iwm-india.com" className="text-lg text-black font-sans hover:text-[#005696] transition-colors">
                      info@iwm-india.com
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex gap-6 items-start">
                  <div className="w-12 h-12 bg-zinc-50 flex items-center justify-center rounded-sm text-black flex-shrink-0">
                    <Phone size={24} weight="light" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Call Us</p>
                    <a href="tel:+91731491717" className="text-lg text-black font-sans hover:text-[#005696] transition-colors">
                      0731-491717
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Contact Form */}
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
                    <label htmlFor="name" className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Full Name</label>
                    <input 
                      type="text" 
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="John Doe"
                      className="w-full bg-transparent border-b border-zinc-300 py-3 text-black font-sans focus:outline-none focus:border-black transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Email Address</label>
                    <input 
                      type="email" 
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="john@example.com"
                      className="w-full bg-transparent border-b border-zinc-300 py-3 text-black font-sans focus:outline-none focus:border-black transition-colors"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="subject" className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Subject</label>
                  <input 
                    type="text" 
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="How can we help?"
                    className="w-full bg-transparent border-b border-zinc-300 py-3 text-black font-sans focus:outline-none focus:border-black transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Message</label>
                  <textarea 
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    placeholder="Tell us more about your project..."
                    className="w-full bg-transparent border-b border-zinc-300 py-3 text-black font-sans focus:outline-none focus:border-black transition-colors resize-none"
                  />
                </div>

                <div className="pt-4">
                   <Button 
                      type="submit"
                      disabled={isSubmitting}
                      label={isSubmitting ? "SENDING..." : "SEND MESSAGE"} 
                      bgColor="bg-black" 
                      textColor="text-white" 
                      className="w-full md:w-auto px-12 py-4 text-xs tracking-widest disabled:opacity-60 disabled:cursor-not-allowed"
                    />

                    {submitStatus.message && (
                      <p
                        className={`text-sm font-sans ${
                          submitStatus.type === 'success' ? 'text-green-700' : 'text-red-700'
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

      {/* Map Placeholder */}
      <section className="w-full h-[400px] md:h-[600px] bg-zinc-200 overflow-hidden grayscale">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3680.123456789!2d75.89123456789!3d22.75123456789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDQ1JzA0LjQiTiA3NcKwNTMnMjguNCJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen={true} 
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </section>
    </div>
  );
};