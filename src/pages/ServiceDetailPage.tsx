import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, CheckCircle2, ChevronRight } from 'lucide-react';
import { servicesData } from './ServicesPage';
import { Button } from '../components/common/Button';

export const ServiceDetailPage: React.FC = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const navigate = useNavigate();
  const service = servicesData.find(s => s.id === serviceId);

  // CRITICAL FIX: Forces the window to the very top immediately upon component mount
  // and whenever the serviceId changes.
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' 
    });
  }, [serviceId]);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white flex-col gap-4">
        <h1 className="text-2xl font-medium font-agrandir">Service not found</h1>
        <Link to="/services" className="text-zinc-500 hover:text-black transition-colors uppercase text-xs tracking-widest font-bold">
          Back to Services
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white pt-24 md:pt-40 pb-32">
      <div className="max-w-[1440px] mx-auto px-8 md:px-16">
        
        {/* Breadcrumb Navigation */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-16"
        >
          <button 
            onClick={() => navigate('/services')}
            className="text-zinc-400 hover:text-black transition-colors uppercase text-[10px] tracking-[0.3em] font-bold"
          >
            Services
          </button>
          <ChevronRight size={12} className="text-zinc-300" />
          <span className="text-black uppercase text-[10px] tracking-[0.3em] font-bold">
            {service.title}
          </span>
        </motion.div>

        {/* HERO SECTION: Title & Strategic Capabilities Side-by-Side */}
        <header className="mb-24 md:mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            
            {/* Left Column: Header & Description */}
            <motion.div
              className="lg:col-span-7"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-xs font-bold tracking-[0.4em] text-zinc-400 uppercase mb-8 block">
                + Operational Excellence
              </span>
              <h1 className="text-5xl md:text-7xl xl:text-8xl font-medium text-black leading-[1.1] tracking-tighter font-agrandir mb-10">
                {service.title}
              </h1>
              <div className="h-[2px] w-24 bg-black mb-10" />
              <p className="text-2xl md:text-3xl text-zinc-500 font-sans leading-tight max-w-2xl">
                {service.description}
              </p>
            </motion.div>

            {/* Right Column: Strategic Capabilities Box */}
            <motion.div
              className="lg:col-span-5"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="bg-zinc-50 p-8 md:p-12 rounded-sm border border-zinc-100">
                <h3 className="text-xs font-bold tracking-[0.3em] text-black uppercase mb-10">
                   Strategic Capabilities
                </h3>
                <ul className="flex flex-col gap-6">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-4 group">
                      <div className="mt-1 w-5 h-5 rounded-full bg-black flex items-center justify-center shrink-0">
                        <CheckCircle2 className="text-white" size={12} />
                      </div>
                      <span className="text-zinc-600 group-hover:text-black transition-colors leading-snug font-medium text-sm md:text-base">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-10 pt-8 border-t border-zinc-200">
                   <button 
                    onClick={() => navigate('/contact')}
                    className="group flex items-center gap-3 text-[10px] tracking-[0.2em] font-bold uppercase hover:gap-5 transition-all"
                   >
                     Enquire Now <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform"/>
                   </button>
                </div>
              </div>
            </motion.div>
          </div>
        </header>

        {/* BOTTOM SECTION: The Approach Writeup */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <motion.div
            className="lg:col-span-8"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-xs font-bold tracking-[0.3em] text-black uppercase mb-12 pb-4 border-b border-zinc-100 flex justify-between items-center">
              The Approach & Methodology
              <span className="text-zinc-300 font-normal">01</span>
            </h2>
            <div className="flex flex-col gap-8 max-w-4xl">
              {service.fullWriteup.split('\n').map((paragraph, i) => (
                paragraph.trim() && (
                  <p key={i} className="text-lg md:text-xl text-zinc-700 leading-relaxed font-sans">
                    {paragraph}
                  </p>
                )
              ))}
            </div>

            <div className="mt-20">
              <Button 
                label="BACK TO ALL SERVICES"
                onClick={() => navigate('/services')}
                className="px-8 py-4 text-[10px] tracking-widest font-bold"
                bgColor="bg-zinc-100"
                textColor="text-black"
              />
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
};