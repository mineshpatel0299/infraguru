"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="bg-white min-h-screen flex flex-col text-neutral-900"
    >
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-48 pb-20 md:pt-56 md:pb-32 overflow-hidden bg-neutral-50 border-b border-neutral-200">
        {/* Subtle decorative elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-neutral-100 to-transparent pointer-events-none"></div>
        
        <div className="container mx-auto px-6 relative z-10 text-center max-w-5xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block mb-6 px-5 py-2 rounded-full border border-neutral-200 bg-white shadow-sm"
          >
            <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-neutral-500">Private Advisory</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-6xl lg:text-7xl font-heading font-light text-neutral-900 uppercase tracking-[0.15em] mb-8"
          >
            Contact <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#c5a028] to-[#d4af37]">Us</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-xl text-neutral-500 font-body max-w-2xl mx-auto font-light tracking-wide leading-relaxed"
          >
            Connect with our private advisors for an exclusive consultation on premium real estate investments and tailored property solutions.
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 md:py-32 flex-grow relative z-10 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">
            
            {/* Left: Contact Info */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 1 }}
              className="lg:col-span-5 flex flex-col justify-center lg:pr-12"
            >
              <h2 className="text-3xl md:text-4xl font-heading font-light text-neutral-900 mb-16 tracking-widest uppercase">
                Reach <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#c5a028] to-[#d4af37]">Out</span>
              </h2>
              
              <div className="space-y-12">
                {/* Office Info */}
                <div className="group flex items-start gap-6">
                  <div className="w-14 h-14 rounded-full border border-neutral-200 bg-neutral-50 flex items-center justify-center shrink-0 transition-all duration-500 group-hover:border-[#d4af37] group-hover:scale-110 shadow-sm group-hover:shadow-md">
                    <svg className="w-5 h-5 text-neutral-900 transition-colors group-hover:text-[#d4af37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-[10px] font-bold text-neutral-400 uppercase tracking-[0.25em] mb-3">Headquarters</h3>
                    <p className="text-sm md:text-base text-neutral-800 font-light leading-relaxed tracking-wide">
                      Unit No. 1129, Spaze IT Tech Park<br/>
                      Sector - 49, Gurugram
                    </p>
                  </div>
                </div>

                <div className="w-full h-px bg-neutral-100" />

                {/* Email Info */}
                <div className="group flex items-start gap-6">
                  <div className="w-14 h-14 rounded-full border border-neutral-200 bg-neutral-50 flex items-center justify-center shrink-0 transition-all duration-500 group-hover:border-[#d4af37] group-hover:scale-110 shadow-sm group-hover:shadow-md">
                    <svg className="w-5 h-5 text-neutral-900 transition-colors group-hover:text-[#d4af37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-[10px] font-bold text-neutral-400 uppercase tracking-[0.25em] mb-3">Direct Inquiry</h3>
                    <a href="mailto:info@infraguru.in" className="text-sm md:text-base text-neutral-800 font-light hover:text-[#d4af37] transition-colors tracking-wide">info@infraguru.in</a>
                  </div>
                </div>

                <div className="w-full h-px bg-neutral-100" />

                {/* Phone Info */}
                <div className="group flex items-start gap-6">
                  <div className="w-14 h-14 rounded-full border border-neutral-200 bg-neutral-50 flex items-center justify-center shrink-0 transition-all duration-500 group-hover:border-[#d4af37] group-hover:scale-110 shadow-sm group-hover:shadow-md">
                    <svg className="w-5 h-5 text-neutral-900 transition-colors group-hover:text-[#d4af37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-[10px] font-bold text-neutral-400 uppercase tracking-[0.25em] mb-3">Private Line</h3>
                    <a href="tel:+919090656575" className="text-sm md:text-base text-neutral-800 font-light hover:text-[#d4af37] transition-colors tracking-wide">+91 90 90 65 65 75</a>
                  </div>
                </div>

                <div className="w-full h-px bg-neutral-100" />

                {/* Website Info */}
                <div className="group flex items-start gap-6">
                  <div className="w-14 h-14 rounded-full border border-neutral-200 bg-neutral-50 flex items-center justify-center shrink-0 transition-all duration-500 group-hover:border-[#d4af37] group-hover:scale-110 shadow-sm group-hover:shadow-md">
                    <svg className="w-5 h-5 text-neutral-900 transition-colors group-hover:text-[#d4af37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-[10px] font-bold text-neutral-400 uppercase tracking-[0.25em] mb-3">Website</h3>
                    <a href="https://infraguru.in/" target="_blank" rel="noopener noreferrer" className="text-sm md:text-base text-neutral-800 font-light hover:text-[#d4af37] transition-colors tracking-wide">https://infraguru.in/</a>
                  </div>
                </div>

                <div className="w-full h-px bg-neutral-100" />

                {/* Working Hours Info */}
                <div className="group flex items-start gap-6">
                  <div className="w-14 h-14 rounded-full border border-neutral-200 bg-neutral-50 flex items-center justify-center shrink-0 transition-all duration-500 group-hover:border-[#d4af37] group-hover:scale-110 shadow-sm group-hover:shadow-md">
                    <svg className="w-5 h-5 text-neutral-900 transition-colors group-hover:text-[#d4af37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-[10px] font-bold text-neutral-400 uppercase tracking-[0.25em] mb-3">Working Hours</h3>
                    <p className="text-sm md:text-base text-neutral-800 font-light leading-relaxed tracking-wide">
                      Mon - Sat : 9:30am - 7:30pm
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right: Contact Form */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="lg:col-span-7 bg-white p-8 md:p-14 border border-neutral-200 rounded-3xl relative overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-neutral-50/50 to-transparent pointer-events-none"></div>
              
              <div className="relative z-10">
                {submitted ? (
                  <div className="flex flex-col items-center justify-center h-full py-20 text-center">
                    <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-full border border-neutral-100 bg-white shadow-lg">
                      <svg viewBox="0 0 24 24" fill="none" stroke="#d4af37" strokeWidth="1.5" className="h-10 w-10">
                        <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <h3 className="mb-4 font-heading text-3xl font-light text-neutral-900 uppercase tracking-widest">
                      Request <span className="font-bold text-[#d4af37]">Received</span>
                    </h3>
                    <p className="max-w-md font-body text-neutral-500 font-light leading-relaxed mb-10">
                      Thank you for your interest. A private advisor will review your request and contact you shortly to schedule your consultation.
                    </p>
                    <button 
                      onClick={() => setSubmitted(false)}
                      className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 border-b border-neutral-300 pb-1 hover:text-neutral-900 hover:border-neutral-900 transition-all duration-300"
                    >
                      Send Another Request
                    </button>
                  </div>
                ) : (
                  <>
                    <h3 className="text-2xl font-heading font-light text-neutral-900 mb-10 tracking-widest uppercase">
                      Direct <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] to-[#c5a028]">Message</span>
                    </h3>
                    <form 
                      className="flex flex-col gap-10"
                      onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="flex flex-col gap-3 group">
                          <label className="text-[9px] font-bold text-neutral-400 uppercase tracking-[0.2em] group-focus-within:text-[#d4af37] transition-colors">First Name</label>
                          <input type="text" required className="border-b border-neutral-200 py-2 focus:border-[#d4af37] outline-none transition-colors bg-transparent text-sm font-light text-neutral-900 tracking-wide placeholder-neutral-300" placeholder="John" />
                        </div>
                        <div className="flex flex-col gap-3 group">
                          <label className="text-[9px] font-bold text-neutral-400 uppercase tracking-[0.2em] group-focus-within:text-[#d4af37] transition-colors">Last Name</label>
                          <input type="text" required className="border-b border-neutral-200 py-2 focus:border-[#d4af37] outline-none transition-colors bg-transparent text-sm font-light text-neutral-900 tracking-wide placeholder-neutral-300" placeholder="Doe" />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="flex flex-col gap-3 group">
                          <label className="text-[9px] font-bold text-neutral-400 uppercase tracking-[0.2em] group-focus-within:text-[#d4af37] transition-colors">Email Address</label>
                          <input type="email" required className="border-b border-neutral-200 py-2 focus:border-[#d4af37] outline-none transition-colors bg-transparent text-sm font-light text-neutral-900 tracking-wide placeholder-neutral-300" placeholder="john@example.com" />
                        </div>
                        <div className="flex flex-col gap-3 group">
                          <label className="text-[9px] font-bold text-neutral-400 uppercase tracking-[0.2em] group-focus-within:text-[#d4af37] transition-colors">Phone Number</label>
                          <input type="tel" required className="border-b border-neutral-200 py-2 focus:border-[#d4af37] outline-none transition-colors bg-transparent text-sm font-light text-neutral-900 tracking-wide placeholder-neutral-300" placeholder="+1 (555) 000-0000" />
                        </div>
                      </div>

                      <div className="flex flex-col gap-3 group">
                        <label className="text-[9px] font-bold text-neutral-400 uppercase tracking-[0.2em] group-focus-within:text-[#d4af37] transition-colors">Inquiry Type</label>
                        <select required defaultValue="" className="border-b border-neutral-200 py-2 focus:border-[#d4af37] outline-none transition-colors bg-transparent text-sm font-light text-neutral-900 tracking-wide appearance-none cursor-pointer">
                          <option value="" disabled hidden className="text-neutral-500">Select an option</option>
                          <option value="buy" className="text-neutral-900">Buying a Property</option>
                          <option value="sell" className="text-neutral-900">Selling a Property</option>
                          <option value="invest" className="text-neutral-900">Investment Opportunities</option>
                          <option value="career" className="text-neutral-900">Careers</option>
                          <option value="other" className="text-neutral-900">Other Inquiry</option>
                        </select>
                      </div>
                      
                      <div className="flex flex-col gap-3 group">
                        <label className="text-[9px] font-bold text-neutral-400 uppercase tracking-[0.2em] group-focus-within:text-[#d4af37] transition-colors">Your Message</label>
                        <textarea required rows={3} className="border-b border-neutral-200 py-2 focus:border-[#d4af37] outline-none transition-colors bg-transparent text-sm font-light text-neutral-900 tracking-wide resize-none placeholder-neutral-300" placeholder="How can we assist you?"></textarea>
                      </div>

                      <button 
                        type="submit"
                        className="mt-6 bg-neutral-900 text-white py-4 px-10 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-[#d4af37] hover:text-white transition-all duration-300 w-full sm:w-auto self-start shadow-xl shadow-neutral-900/10 hover:shadow-2xl hover:shadow-[#d4af37]/30 rounded-full"
                      >
                        Submit Request
                      </button>
                    </form>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </motion.main>
  );
}
