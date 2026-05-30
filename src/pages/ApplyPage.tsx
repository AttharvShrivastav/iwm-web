import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { SectionHeader } from '../components/common/SectionHeader';
import { Button } from '../components/common/Button';
import { Upload, CheckCircle, ArrowLeft, MapPin, Clock, Briefcase } from 'lucide-react';
import { peoplePageFallback } from '../content/peopleContent';


export const ApplyPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const initialPosition = queryParams.get('position') || '';
  const applyContent = peoplePageFallback.apply;
  const jobs = peoplePageFallback.careers.jobs;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: initialPosition,
    linkedin: '',
    message: ''
  });

  const [resume, setResume] = useState<File | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const selectedJob = jobs.find((j) => j.title === formData.position);

  useEffect(() => {
    if (initialPosition) {
      setFormData(prev => ({ ...prev, position: initialPosition }));
    }
  }, [initialPosition]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResume(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Application submitted:', { ...formData, resume });
    setIsSubmitted(true);
    window.scrollTo(0, 0);
  };

  if (isSubmitted) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center px-8">
        <div className="max-w-md w-full text-center flex flex-col items-center gap-8">
          <div className="w-20 h-20 bg-green-50 text-green-600 flex items-center justify-center rounded-full">
            <CheckCircle size={40} />
          </div>
          <div className="flex flex-col gap-4">
            <h2 className="text-3xl md:text-4xl font-medium text-black font-agrandir">Application Received</h2>
            <p className="text-zinc-600 font-sans text-lg">
              Thank you for your interest in joining IWM. Our team will review your application and get back to you soon.
            </p>
          </div>
          <Button 
            label="BACK TO HOME" 
            bgColor="bg-black" 
            textColor="text-white" 
            onClick={() => navigate('/')}
            className="px-12 py-4 text-xs tracking-widest"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pt-24 lg:pt-32">
      <div className="w-full px-8 md:px-16 pb-24">
        {/* Back Link */}
        <Link to="/people" className="inline-flex items-center gap-2 text-zinc-400 hover:text-black transition-colors mb-12 group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs font-bold uppercase tracking-widest">Back to Careers</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.8fr] gap-20 lg:gap-32 items-start">
          {/* Left Column: Form */}
          <div className="flex flex-col gap-16">
            <div className="flex flex-col gap-8">
              <SectionHeader label="APPLICATION FORM" className="text-black/60" />
              <h2 className="text-4xl md:text-6xl font-medium text-black font-agrandir tracking-tight leading-tight">
                Apply for <br /> {formData.position || 'a Position'}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="flex flex-col gap-2">
                  <label htmlFor="phone" className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Phone Number</label>
                  <input 
                    type="tel" 
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="+91 00000 00000"
                    className="w-full bg-transparent border-b border-zinc-300 py-3 text-black font-sans focus:outline-none focus:border-black transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="position" className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Applying For</label>
                  <select 
                    id="position"
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent border-b border-zinc-300 py-3 text-black font-sans focus:outline-none focus:border-black transition-colors appearance-none"
                  >
                    <option value="" disabled>{applyContent.selectPlaceholder}</option>
                    {jobs.map((j) => (
                      <option key={j.title} value={j.title}>{j.title}</option>
                    ))}
                    <option value="Other">{applyContent.generalApplicationLabel}</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="linkedin" className="text-xs font-bold text-zinc-400 uppercase tracking-widest">LinkedIn / Portfolio URL (Optional)</label>
                <input 
                  type="url" 
                  id="linkedin"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleChange}
                  placeholder="https://linkedin.com/in/username"
                  className="w-full bg-transparent border-b border-zinc-300 py-3 text-black font-sans focus:outline-none focus:border-black transition-colors"
                />
              </div>

              <div className="flex flex-col gap-4">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Resume / CV (PDF or DOCX)</label>
                <div className="relative group">
                  <input 
                    type="file" 
                    id="resume"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    required
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div className={`w-full border-2 border-dashed ${resume ? 'border-black bg-zinc-50' : 'border-zinc-200 group-hover:border-zinc-400'} p-12 transition-all flex flex-col items-center justify-center gap-4 text-center`}>
                    {resume ? (
                      <>
                        <div className="w-12 h-12 bg-black text-white flex items-center justify-center rounded-full">
                          <CheckCircle size={24} />
                        </div>
                        <div className="flex flex-col gap-1">
                          <p className="text-black font-medium font-sans">{resume.name}</p>
                          <p className="text-zinc-500 text-xs uppercase tracking-widest">{(resume.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                        <button 
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            setResume(null);
                          }}
                          className="text-red-500 text-xs font-bold uppercase tracking-widest hover:underline z-20"
                        >
                          Remove File
                        </button>
                      </>
                    ) : (
                      <>
                        <div className="w-12 h-12 bg-zinc-100 text-zinc-400 flex items-center justify-center rounded-full group-hover:bg-zinc-200 group-hover:text-zinc-600 transition-colors">
                          <Upload size={24} />
                        </div>
                        <div className="flex flex-col gap-1">
                          <p className="text-zinc-600 font-sans">Click to upload or drag and drop</p>
                          <p className="text-zinc-400 text-xs uppercase tracking-widest">PDF, DOCX (Max 5MB)</p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Cover Letter / Additional Notes</label>
                <textarea 
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  placeholder="Tell us why you're a great fit for IWM..."
                  className="w-full bg-transparent border-b border-zinc-300 py-3 text-black font-sans focus:outline-none focus:border-black transition-colors resize-none"
                />
              </div>

              <div className="pt-8">
                <Button 
                  label="SUBMIT APPLICATION" 
                  bgColor="bg-black" 
                  textColor="text-white" 
                  className="w-full md:w-auto px-16 py-5 text-xs tracking-widest"
                />
              </div>
            </form>
          </div>

          {/* Right Column: Job Description */}
          <div className="sticky top-32 flex flex-col gap-12 bg-zinc-50 p-10 md:p-16 rounded-none">
            {selectedJob ? (
              <>
                <div className="flex flex-col gap-6">
                  <SectionHeader label="JOB DESCRIPTION" className="text-black/60" />
                  <h3 className="text-3xl font-medium text-black font-agrandir">{selectedJob.title}</h3>
                  
                  <div className="flex flex-wrap gap-6 pt-4">
                    <div className="flex items-center gap-2 text-zinc-500">
                      <MapPin size={18} />
                      <span className="text-sm font-sans">{selectedJob.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-zinc-500">
                      <Clock size={18} />
                      <span className="text-sm font-sans">{selectedJob.type}</span>
                    </div>
                    <div className="flex items-center gap-2 text-zinc-500">
                      <Briefcase size={18} />
                      <span className="text-sm font-sans">Operations</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-8">
                  <div className="flex flex-col gap-4">
                    <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">About the Role</h4>
                    <p className="text-zinc-600 font-sans leading-relaxed">
                      {selectedJob.description}
                    </p>
                  </div>

                  {selectedJob.details && (
                    <div className="flex flex-col gap-4">
                      <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Key Responsibilities</h4>
                      <ul className="flex flex-col gap-3">
                        {selectedJob.details.map((detail, i) => (
                          <li key={i} className="flex gap-3 text-zinc-600 font-sans leading-relaxed">
                            <span className="text-black font-bold">•</span>
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="pt-8 border-t border-zinc-200">
                  <p className="text-zinc-400 text-xs font-sans leading-relaxed">
                    IWM is an equal opportunity employer. We celebrate diversity and are committed to creating an inclusive environment for all employees.
                  </p>
                </div>
              </>
            ) : (
              <div className="flex flex-col gap-6 text-center py-20">
                <SectionHeader label="GENERAL APPLICATION" className="text-black/60 mx-auto" />
                <h3 className="text-2xl font-medium text-black font-agrandir">Join Our Talent Pool</h3>
                <p className="text-zinc-600 font-sans leading-relaxed">
                  Don't see a specific role that fits? Apply anyway! We're always looking for passionate individuals to join our mission for cleaner cities.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
