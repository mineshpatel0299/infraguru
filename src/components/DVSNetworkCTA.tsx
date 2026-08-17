"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { JoinAsAgentModal } from "./JoinAsAgentModal";

const BUILDING_IMAGE = "/ggh.png";

function HighRiseBuilding({
  width,
  height,
  imageSize,
}: {
  width: number;
  height: number;
  imageSize: string;
}) {
  return (
    <div
      style={{
        position: "relative",
        width,
        height,
      }}
    >
      <Image
        src={BUILDING_IMAGE}
        alt="High-rise luxury building"
        fill
        className="object-contain object-bottom"
        sizes={imageSize}
        priority
      />
    </div>
  );
}

export function DVSNetworkCTA() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
    <section id="cta" className="relative w-full overflow-hidden bg-white">
      {/* ── Mobile Layout ───────────────────────────────────── */}
      <div className="lg:hidden relative z-10">
        <div className="px-5 pt-12 pb-14 max-[480px]:px-4 max-[480px]:pt-8 max-[480px]:pb-10">
          {/* Premium Glass Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden rounded-[36px] border border-white/15 bg-primary-dark px-8 py-12 max-[480px]:rounded-[24px] max-[480px]:px-6 max-[480px]:py-10"
          >
            {/* Card Background Video */}
            <div className="absolute inset-0 z-0">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              >
                <source src="/cta-bg-2.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-primary-dark/70"></div>
            </div>

            {/* Subtle inner glow */}
            <div className="absolute inset-0 z-0 bg-gradient-to-br from-white/10 to-transparent opacity-50 pointer-events-none rounded-[36px] max-[480px]:rounded-[24px]"></div>
            
            <div className="relative z-10">
              <h2
                className="font-heading text-white leading-[1.05] mb-2 font-semibold text-left tracking-normal"
                style={{ fontSize: "clamp(26px, 7vw, 38px)" }}
              >
                InfraGuru
              </h2>
              <h3
                className="font-heading text-white/80 leading-[1.05] mb-8 font-normal text-left"
                style={{ fontSize: "clamp(18px, 5vw, 24px)" }}
              >
                Real estate, made easier.
              </h3>
              <button
                className="group inline-flex items-center gap-3 font-body font-semibold text-sm bg-white text-primary-dark rounded-full transition-all duration-500 cursor-pointer max-[767px]:w-full max-[767px]:justify-center max-[767px]:py-4 hover:shadow-[0_0_30px_rgba(255,255,255,0.25)] hover:scale-[1.02]"
                style={{ padding: "14px 28px" }}
                onClick={() => setModalOpen(true)}
              >
                Request a Callback
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </motion.div>
        </div>

      </div>

      {/* ── Desktop Layout ──────────────────────────────────── */}
      <div
        className="hidden lg:block relative mx-auto max-w-[92rem] px-8 xl:px-10"
        style={{ height: 620, overflow: "hidden" }}
      >
        {/* Premium Glass Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="absolute z-10 bg-primary-dark overflow-hidden"
          style={{
            left: 0,
            right: 0,
            bottom: 40,
            height: 360,
            borderRadius: 56,
            border: "1px solid rgba(255, 255, 255, 0.15)",
            boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.2)",
          }}
          >
          {/* Card Background Video */}
          <div className="absolute inset-0 z-0">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="/cta-bg-2.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-primary-dark/70"></div>
          </div>

          {/* Subtle inner spotlight */}
          <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.08)_0%,transparent_60%)] pointer-events-none"></div>

          <div
            className="absolute inset-y-0 left-0 flex flex-col justify-center text-left z-10"
            style={{ paddingLeft: 72, paddingRight: 40, maxWidth: 560 }}
          >
            <h2
              className="font-heading text-white leading-[1.05] mb-3 tracking-normal"
              style={{ fontSize: "clamp(28px, 2.2vw, 42px)", fontWeight: 600 }}
            >
              InfraGuru
            </h2>
            <h3
              className="font-heading text-white/80 leading-[1.05] mb-10"
              style={{ fontSize: "clamp(19px, 1.35vw, 26px)", fontWeight: 400 }}
            >
              Real estate, made easier.
            </h3>
            <button
              className="group inline-flex items-center gap-3 font-body font-semibold text-sm bg-white text-primary-dark rounded-full transition-all duration-500 cursor-pointer self-start hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:scale-[1.02]"
              style={{ padding: "16px 36px" }}
              onClick={() => setModalOpen(true)}
            >
              Request a Callback
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </motion.div>

        {/* High-rise building */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className="absolute pointer-events-none z-20"
          style={{ right: -40, bottom: 40, width: 900, height: 900 }}
        >
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="w-full h-full"
          >
            <HighRiseBuilding width={900} height={900} imageSize="900px" />
          </motion.div>
        </motion.div>
      </div>
    </section>

      <JoinAsAgentModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
