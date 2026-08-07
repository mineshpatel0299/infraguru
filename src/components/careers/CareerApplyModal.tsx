"use client";

import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { submitApplicationAction } from "@/app/careers/apply-actions";

export function CareerApplyModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);

  const close = useCallback(() => {
    onClose();
    // Reset after the exit animation has time to finish, so the form
    // doesn't visibly flash back to its default state mid-close.
    setTimeout(() => {
      setSubmitted(false);
      setError(null);
      formRef.current?.reset();
    }, 300);
  }, [onClose]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      try {
        await submitApplicationAction({
          jobId: null,
          jobTitleSnapshot: String(formData.get("role") || "") || null,
          fullName: String(formData.get("fullName") || ""),
          email: String(formData.get("email") || ""),
          phone: String(formData.get("phone") || ""),
          resume: formData.get("resume") as File | null,
        });
        setSubmitted(true);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      }
    });
  };

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
            className="absolute inset-0 bg-primary-dark/70 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={close}
          />

          <motion.div
            key="panel"
            className="relative z-10 w-full max-w-lg overflow-hidden rounded-[28px] bg-white shadow-2xl"
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="max-h-[88vh] overflow-y-auto p-8 sm:p-10">
              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="absolute right-6 top-6 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/70 text-ink/50 backdrop-blur-sm transition-colors hover:bg-ink/5 hover:text-ink"
              >
                &#10005;
              </button>

              {submitted ? (
                <div className="flex flex-col items-center py-10 text-center">
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-primary-dark">
                    <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" className="h-6 w-6">
                      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h3 className="mb-2 font-heading text-2xl font-bold text-primary-dark">
                    Application Received
                  </h3>
                  <p className="max-w-xs font-body text-sm text-ink/60">
                    Thank you for your interest in InfraGuru. Our talent team will review your
                    profile and reach out within 3-5 business days.
                  </p>
                </div>
              ) : (
                <>
                  <div className="mb-1 flex items-center gap-3">
                    <div className="h-0.5 w-6 bg-gold-gradient" />
                    <span className="font-body text-label font-semibold uppercase tracking-wide text-secondary-hover">
                      Join Us
                    </span>
                  </div>
                  <h3 className="mb-2 font-heading text-2xl font-bold text-primary-dark sm:text-3xl">
                    Send Us Your Resume
                  </h3>
                  <p className="mb-8 font-body text-sm text-ink/60">
                    Tell us a bit about yourself — every application is reviewed personally by our team.
                  </p>

                  <form ref={formRef} className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <input
                      type="text"
                      name="fullName"
                      required
                      placeholder="Full name"
                      className="rounded-xl border border-primary-dark/15 bg-primary-dark/3 px-5 py-3.5 font-body text-sm text-ink placeholder-ink/40 outline-none transition-colors focus:border-primary-dark/50"
                    />
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="Email address"
                      className="rounded-xl border border-primary-dark/15 bg-primary-dark/3 px-5 py-3.5 font-body text-sm text-ink placeholder-ink/40 outline-none transition-colors focus:border-primary-dark/50"
                    />
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="Phone number"
                      className="rounded-xl border border-primary-dark/15 bg-primary-dark/3 px-5 py-3.5 font-body text-sm text-ink placeholder-ink/40 outline-none transition-colors focus:border-primary-dark/50"
                    />
                    <input
                      type="text"
                      name="role"
                      placeholder="Role you're interested in"
                      className="rounded-xl border border-primary-dark/15 bg-primary-dark/3 px-5 py-3.5 font-body text-sm text-ink placeholder-ink/40 outline-none transition-colors focus:border-primary-dark/50"
                    />
                    <label className="flex cursor-pointer items-center justify-between gap-3 rounded-xl border border-dashed border-primary-dark/20 bg-primary-dark/3 px-5 py-3.5 font-body text-sm text-ink/60 transition-colors hover:border-primary-dark/40">
                      <span>Attach resume (PDF or Word, optional)</span>
                      <input type="file" name="resume" accept=".pdf,.doc,.docx" className="hidden" />
                      <span className="shrink-0 text-xs font-semibold text-secondary-hover">Browse</span>
                    </label>

                    {error && <p className="text-sm text-red-500">{error}</p>}

                    <button
                      type="submit"
                      disabled={pending}
                      className="mt-2 inline-flex items-center justify-center rounded-full bg-primary-dark px-8 py-4 font-body text-sm font-semibold text-white transition-all duration-200 hover:bg-primary-dark/90 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {pending ? "Submitting…" : "Submit Application"}
                    </button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
