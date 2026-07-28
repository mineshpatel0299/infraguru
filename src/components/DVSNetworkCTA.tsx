"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { JoinAsAgentModal } from "./JoinAsAgentModal";

const BUILDING_IMAGE = "/cta.png";

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
    <section id="cta" className="relative w-full overflow-hidden bg-primary-dark">
      {/* ── Mobile Layout ───────────────────────────────────── */}
      <div className="lg:hidden">
        <div className="px-5 pt-12 pb-14 max-[480px]:px-4 max-[480px]:pt-8 max-[480px]:pb-10">
          {/* White card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-[36px] border border-primary-dark/10 bg-white px-7 py-9 max-[480px]:rounded-[24px] max-[480px]:px-5 max-[480px]:py-7"
          >
            <h2
              className="font-heading text-primary-dark leading-[1.05] mb-2 font-bold text-left"
              style={{ fontSize: "clamp(30px, 8vw, 44px)" }}
            >
              InfraGuru
            </h2>
            <h3
              className="font-heading text-primary-dark leading-[1.05] mb-6 font-bold text-left"
              style={{ fontSize: "clamp(22px, 6vw, 32px)" }}
            >
              Real estate, made easier.
            </h3>
            <button
              className="inline-flex items-center font-body font-semibold text-sm bg-primary-dark text-white border border-transparent hover:border-primary-dark hover:bg-transparent hover:text-primary-dark rounded-full transition-all duration-300 cursor-pointer max-[767px]:w-full max-[767px]:justify-center max-[767px]:py-4"
              style={{ padding: "14px 28px" }}
              onClick={() => setModalOpen(true)}
            >
              Request a Callback
            </button>
          </motion.div>
        </div>

      </div>

      {/* ── Desktop Layout ──────────────────────────────────── */}
      <div
        className="hidden lg:block relative mx-auto max-w-[92rem] px-8 xl:px-10"
        style={{ height: 600, overflow: "hidden" }}
      >
        {/* White card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="absolute z-10 bg-white"
          style={{
            left: 0,
            right: 0,
            bottom: 60,
            height: 290,
            borderRadius: 56,
            border: "1px solid rgba(0, 0, 0, 0.05)",
          }}
          >
          <div
            className="absolute inset-y-0 left-0 flex flex-col justify-center text-left"
            style={{ paddingLeft: 64, paddingRight: 40, maxWidth: 520 }}
          >
            <h2
              className="font-heading text-primary-dark leading-[1.05] mb-2"
              style={{ fontSize: "clamp(30px, 3.2vw, 46px)", fontWeight: 700 }}
            >
              InfraGuru
            </h2>
            <h3
              className="font-heading text-primary-dark leading-[1.05] mb-7"
              style={{ fontSize: "clamp(20px, 2.2vw, 30px)", fontWeight: 700 }}
            >
              Real estate, made easier.
            </h3>
            <button
              className="inline-flex items-center font-body font-semibold text-sm bg-primary-dark text-white border border-transparent hover:border-primary-dark hover:bg-transparent hover:text-primary-dark rounded-full transition-all duration-300 cursor-pointer self-start"
              style={{ padding: "16px 36px" }}
              onClick={() => setModalOpen(true)}
            >
              Request a Callback
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
          style={{ right: 70, bottom: 60, width: 620, height: 620 }}
        >
          <HighRiseBuilding width={620} height={620} imageSize="620px" />
        </motion.div>
      </div>
    </section>

      <JoinAsAgentModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
