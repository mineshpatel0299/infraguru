"use client";

import React, { useId, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";

const FADE_UP = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
});

export default function ContactPageClient() {
  const [submitted, setSubmitted] = useState(false);
  const uid = useId();
  const firstNameId = `${uid}-first-name`;
  const lastNameId = `${uid}-last-name`;
  const emailId = `${uid}-email`;
  const phoneId = `${uid}-phone`;
  const inquiryId = `${uid}-inquiry`;
  const messageId = `${uid}-message`;

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="bg-white min-h-screen flex flex-col text-neutral-900"
    >
      <Navbar solid />

      {/* Full-page split layout */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 min-h-screen">

        {/* ── LEFT PANEL: Dark brand color with contact info ── */}
        <div className="relative bg-primary-dark flex flex-col justify-center px-10 py-32 sm:px-16 lg:px-20 xl:px-24 overflow-hidden lg:border-r lg:border-white/5">
          {/* Decorative background circle */}
          <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-secondary/5 blur-3xl pointer-events-none" />
          <div className="absolute top-20 right-0 w-[300px] h-[300px] rounded-full bg-white/3 blur-3xl pointer-events-none" />

          {/* Gold eyebrow */}
          <motion.div {...FADE_UP(0.2)} className="flex items-center gap-3 mb-8">
            <div className="h-[1px] w-8 bg-secondary" />
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-secondary font-body">Private Advisory</span>
          </motion.div>

          {/* Main heading */}
          <motion.h1 {...FADE_UP(0.3)} className="font-heading font-light uppercase text-white leading-[1.1] tracking-tight text-[clamp(2.2rem,2.9vw,3.5rem)] mb-6">
            Let&apos;s Start a<br />
            <span className="text-secondary font-semibold">Conversation.</span>
          </motion.h1>

          {/* Subtext */}
          <motion.p {...FADE_UP(0.4)} className="font-body text-white/50 text-sm leading-relaxed max-w-xs mb-14">
            Connect with our private advisors for an exclusive consultation on premium real estate investments.
          </motion.p>

          {/* Contact details */}
          <motion.div {...FADE_UP(0.5)} className="flex flex-col gap-8">

            {/* Address */}
            <div className="flex items-start gap-5">
              <div className="mt-0.5 w-9 h-9 rounded-full border border-white/10 flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <p className="text-[9px] font-bold tracking-[0.25em] uppercase text-white/30 mb-1.5">Headquarters</p>
                <p className="text-sm text-white/70 font-light leading-relaxed">
                  Unit No. 1129, Spaze I-Tech Park<br />Sector - 49, Gurugram
                </p>
              </div>
            </div>

            <div className="w-full h-px bg-white/5" />

            {/* Email */}
            <div className="flex items-start gap-5">
              <div className="mt-0.5 w-9 h-9 rounded-full border border-white/10 flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-[9px] font-bold tracking-[0.25em] uppercase text-white/30 mb-1.5">Email</p>
                <a href="mailto:info@infraguru.in" className="text-sm text-white/70 font-light hover:text-secondary transition-colors">
                  info@infraguru.in
                </a>
              </div>
            </div>

            <div className="w-full h-px bg-white/5" />

            {/* Phone */}
            <div className="flex items-start gap-5">
              <div className="mt-0.5 w-9 h-9 rounded-full border border-white/10 flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <p className="text-[9px] font-bold tracking-[0.25em] uppercase text-white/30 mb-1.5">Private Line</p>
                <a href="tel:+919090656575" className="text-sm text-white/70 font-light hover:text-secondary transition-colors">
                  +91 90 90 65 65 75
                </a>
              </div>
            </div>

            <div className="w-full h-px bg-white/5" />

            {/* Hours */}
            <div className="flex items-start gap-5">
              <div className="mt-0.5 w-9 h-9 rounded-full border border-white/10 flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-[9px] font-bold tracking-[0.25em] uppercase text-white/30 mb-1.5">Working Hours</p>
                <p className="text-sm text-white/70 font-light">Mon – Sat · 9:30 am – 7:30 pm</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── RIGHT PANEL: White form ── */}
        <div className="flex flex-col justify-center px-10 py-32 sm:px-16 lg:px-20 xl:px-24 bg-white">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center text-center py-16"
            >
              <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-full border border-neutral-100 bg-neutral-50 shadow-md">
                <svg viewBox="0 0 24 24" fill="none" stroke="#d4af37" strokeWidth="1.5" className="h-8 w-8">
                  <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="mb-3 font-heading text-2xl font-light text-neutral-900 uppercase tracking-widest">
                Request <span className="font-semibold text-secondary">Received</span>
              </h3>
              <p className="max-w-sm font-body text-neutral-400 text-sm font-light leading-relaxed mb-8">
                A private advisor will review your request and reach out shortly to schedule your consultation.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-400 border-b border-neutral-300 pb-1 hover:text-neutral-900 hover:border-neutral-900 transition-all duration-300"
              >
                Send Another Request
              </button>
            </motion.div>
          ) : (
            <motion.div {...FADE_UP(0.4)}>
              {/* Form header */}
              <div className="mb-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-[1px] w-6 bg-secondary" />
                  <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-secondary font-body">Send a Message</span>
                </div>
                <h2 className="font-heading font-light uppercase text-neutral-900 text-[clamp(1.5rem,1.85vw,2.2rem)] leading-tight tracking-tight">
                  Book a <span className="font-semibold text-primary-dark">Consultation</span>
                </h2>
              </div>

              <form
                className="flex flex-col gap-7"
                onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
              >
                {/* Name row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2 group">
                    <label htmlFor={firstNameId} className="text-xs font-extrabold text-neutral-700 uppercase tracking-[0.2em] group-focus-within:text-secondary transition-colors">
                      First Name
                    </label>
                    <input
                      id={firstNameId}
                      type="text" required
                      placeholder="John"
                      className="border-b border-neutral-200 py-2.5 focus:border-secondary outline-none transition-colors bg-transparent text-sm font-light text-neutral-900 placeholder-neutral-300"
                    />
                  </div>
                  <div className="flex flex-col gap-2 group">
                    <label htmlFor={lastNameId} className="text-xs font-extrabold text-neutral-700 uppercase tracking-[0.2em] group-focus-within:text-secondary transition-colors">
                      Last Name
                    </label>
                    <input
                      id={lastNameId}
                      type="text" required
                      placeholder="Doe"
                      className="border-b border-neutral-200 py-2.5 focus:border-secondary outline-none transition-colors bg-transparent text-sm font-light text-neutral-900 placeholder-neutral-300"
                    />
                  </div>
                </div>

                {/* Email + Phone row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2 group">
                    <label htmlFor={emailId} className="text-xs font-extrabold text-neutral-700 uppercase tracking-[0.2em] group-focus-within:text-secondary transition-colors">
                      Email Address
                    </label>
                    <input
                      id={emailId}
                      type="email" required
                      placeholder="john@example.com"
                      className="border-b border-neutral-200 py-2.5 focus:border-secondary outline-none transition-colors bg-transparent text-sm font-light text-neutral-900 placeholder-neutral-300"
                    />
                  </div>
                  <div className="flex flex-col gap-2 group">
                    <label htmlFor={phoneId} className="text-xs font-extrabold text-neutral-700 uppercase tracking-[0.2em] group-focus-within:text-secondary transition-colors">
                      Phone Number
                    </label>
                    <input
                      id={phoneId}
                      type="tel" required
                      placeholder="+91 00000 00000"
                      className="border-b border-neutral-200 py-2.5 focus:border-secondary outline-none transition-colors bg-transparent text-sm font-light text-neutral-900 placeholder-neutral-300"
                    />
                  </div>
                </div>

                {/* Inquiry Type */}
                <div className="flex flex-col gap-2 group">
                  <label htmlFor={inquiryId} className="text-xs font-extrabold text-neutral-700 uppercase tracking-[0.2em] group-focus-within:text-secondary transition-colors">
                    Inquiry Type
                  </label>
                  <div className="relative">
                    <select
                      id={inquiryId}
                      required defaultValue=""
                      className="w-full border-b border-neutral-200 py-2.5 pr-6 focus:border-secondary outline-none transition-colors bg-transparent text-sm font-light text-neutral-900 appearance-none cursor-pointer"
                    >
                      <option value="" disabled hidden>Select an option</option>
                      <option value="buy">Buying a Property</option>
                      <option value="sell">Selling a Property</option>
                      <option value="invest">Investment Opportunities</option>
                      <option value="career">Careers</option>
                      <option value="other">Other Inquiry</option>
                    </select>
                    <svg className="pointer-events-none absolute right-0 top-1/2 h-3 w-3 -translate-y-1/2 text-neutral-400 transition-colors group-focus-within:text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-2 group">
                  <label htmlFor={messageId} className="text-xs font-extrabold text-neutral-700 uppercase tracking-[0.2em] group-focus-within:text-secondary transition-colors">
                    Your Message
                  </label>
                  <textarea
                    id={messageId}
                    required rows={3}
                    placeholder="How can we assist you?"
                    className="border-b border-neutral-200 py-2.5 focus:border-secondary outline-none transition-colors bg-transparent text-sm font-light text-neutral-900 resize-none placeholder-neutral-300"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="mt-2 self-start bg-primary-dark text-white text-[10px] font-bold uppercase tracking-[0.2em] px-10 py-4 rounded-full hover:bg-secondary transition-all duration-300 shadow-lg hover:shadow-[0_10px_30px_rgba(212,175,55,0.3)]"
                >
                Enquire now
                </button>
              </form>
            </motion.div>
          )}
        </div>
      </div>
    </motion.main>
  );
}
