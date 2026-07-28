"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";

export function JoinAsAgentModal({
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
        <div className="fixed inset-0 z-999 flex items-center justify-center p-4 sm:p-8">
          <motion.div
            key="backdrop"
            className="absolute inset-0 bg-[#0b2761]/60 backdrop-blur-md"
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
              className="absolute right-6 top-6 flex h-9 w-9 items-center justify-center rounded-full text-[#0b2761]/50 transition-colors hover:bg-[#0b2761]/5 hover:text-[#0b2761]"
            >
              &#10005;
            </button>

            {submitted ? (
              <div className="flex flex-col items-center py-10 text-center">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#0b2761]">
                  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" className="h-6 w-6">
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="mb-2 font-heading text-2xl font-bold text-[#0b2761]">
                  Application Received
                </h3>
                <p className="max-w-xs font-body text-sm text-[#0b2761]/60">
                  A member of the DVS team will review your application and reach out within 2 business days.
                </p>
              </div>
            ) : (
              <>
                <h3 className="mb-2 font-heading text-2xl font-bold text-[#0b2761] sm:text-3xl">
                  Apply to Join DVS
                </h3>
                <p className="mb-8 font-body text-sm text-[#0b2761]/60">
                  Tell us a bit about yourself — every application is reviewed personally.
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
                    className="rounded-xl border border-[#0b2761]/15 bg-[#0b2761]/[0.03] px-5 py-3.5 font-body text-sm text-[#0b2761] placeholder-[#0b2761]/40 outline-none transition-colors focus:border-[#0b2761]/50"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Email address"
                    className="rounded-xl border border-[#0b2761]/15 bg-[#0b2761]/[0.03] px-5 py-3.5 font-body text-sm text-[#0b2761] placeholder-[#0b2761]/40 outline-none transition-colors focus:border-[#0b2761]/50"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Phone number"
                    className="rounded-xl border border-[#0b2761]/15 bg-[#0b2761]/[0.03] px-5 py-3.5 font-body text-sm text-[#0b2761] placeholder-[#0b2761]/40 outline-none transition-colors focus:border-[#0b2761]/50"
                  />
                  <input
                    type="text"
                    placeholder="Current brokerage (optional)"
                    className="rounded-xl border border-[#0b2761]/15 bg-[#0b2761]/[0.03] px-5 py-3.5 font-body text-sm text-[#0b2761] placeholder-[#0b2761]/40 outline-none transition-colors focus:border-[#0b2761]/50"
                  />

                  <button
                    type="submit"
                    className="mt-2 inline-flex items-center justify-center rounded-full bg-[#0b2761] px-8 py-4 font-body text-sm font-semibold text-white transition-all duration-200 hover:bg-[#0b2761]/90"
                  >
                    Submit Application
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
