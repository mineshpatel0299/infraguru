"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";

export function BookConsultationModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [submitted, setSubmitted] = useState(false);

  const close = useCallback(() => {
    onClose();
    // Reset after the exit animation has time to finish, so the form
    // doesn't visibly flash back to its default state mid-close.
    setTimeout(() => setSubmitted(false), 300);
  }, [onClose]);

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const scrollbarWidth = window.innerWidth - root.clientWidth;
    const prevOverflow = root.style.overflow;
    const prevPaddingRight = root.style.paddingRight;
    root.style.overflow = "hidden";
    if (scrollbarWidth > 0) root.style.paddingRight = `${scrollbarWidth}px`;

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    window.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = prevOverflow;
      root.style.paddingRight = prevPaddingRight;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-8">
          <motion.div
            key="backdrop"
            className="absolute inset-0 bg-neutral-900/60 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={close}
          />

          <motion.div
            key="panel"
            className="relative z-10 w-full max-w-lg overflow-hidden rounded-[32px] bg-white p-8 shadow-2xl sm:p-10"
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute right-6 top-6 flex h-9 w-9 items-center justify-center rounded-full text-neutral-900/50 transition-colors hover:bg-neutral-900/5 hover:text-neutral-900"
            >
              &#10005;
            </button>

            {submitted ? (
              <div className="flex flex-col items-center py-10 text-center">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-neutral-900">
                  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" className="h-6 w-6">
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="mb-2 font-heading text-2xl font-bold text-neutral-900">
                  Request Received
                </h3>
                <p className="max-w-xs font-body text-sm text-neutral-900/60">
                  Our team will reach out to schedule your consultation shortly.
                </p>
              </div>
            ) : (
              <>
                <h3 className="mb-2 font-heading text-2xl font-bold text-neutral-900 sm:text-3xl">
                  Book A Consultation
                </h3>
                <p className="mb-8 font-body text-sm text-neutral-900/60">
                  Fill out the form below and one of our experts will get in touch with you.
                </p>

                <form
                  className="flex flex-col gap-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSubmitted(true);
                  }}
                >
                  <input
                    type="text"
                    required
                    placeholder="Full name"
                    className="rounded-xl border border-neutral-900/15 bg-neutral-900/[0.03] px-5 py-3.5 font-body text-sm text-neutral-900 placeholder-neutral-900/40 outline-none transition-colors focus:border-neutral-900/50"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Email address"
                    className="rounded-xl border border-neutral-900/15 bg-neutral-900/[0.03] px-5 py-3.5 font-body text-sm text-neutral-900 placeholder-neutral-900/40 outline-none transition-colors focus:border-neutral-900/50"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Phone number"
                    className="rounded-xl border border-neutral-900/15 bg-neutral-900/[0.03] px-5 py-3.5 font-body text-sm text-neutral-900 placeholder-neutral-900/40 outline-none transition-colors focus:border-neutral-900/50"
                  />
                  <select
                    required
                    defaultValue=""
                    className="rounded-xl border border-neutral-900/15 bg-neutral-900/[0.03] px-5 py-3.5 font-body text-sm text-neutral-900/80 outline-none transition-colors focus:border-neutral-900/50 appearance-none"
                  >
                    <option value="" disabled hidden>Interest Area</option>
                    <option value="residential">Residential Properties</option>
                    <option value="commercial">Commercial Properties</option>
                    <option value="investment">Investment Opportunities</option>
                    <option value="other">Other</option>
                  </select>
                  <textarea
                    placeholder="Any specific requirements? (optional)"
                    rows={3}
                    className="rounded-xl border border-neutral-900/15 bg-neutral-900/[0.03] px-5 py-3.5 font-body text-sm text-neutral-900 placeholder-neutral-900/40 outline-none transition-colors focus:border-neutral-900/50 resize-none"
                  ></textarea>

                  <button
                    type="submit"
                    className="mt-2 inline-flex items-center justify-center rounded-full bg-neutral-900 px-8 py-4 font-body text-sm font-semibold text-white transition-all duration-200 hover:bg-neutral-800"
                  >
                    Submit Request
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
