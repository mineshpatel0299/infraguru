"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

type Destination = {
  title: string;
  subtitle: string;
  href: string;
  cta: string;
  image: string;
};

const DESTINATIONS: Destination[] = [
  {
    title: "India Properties",
    subtitle: "Gurgaon, Delhi, Goa and Dholera",
    href: "/projects/location/gurgaon",
    cta: "India Projects",
    image:
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1200&auto=format&fit=crop&q=80",
  },
  {
    title: "International Properties",
    subtitle: "Dubai, Europe and Australia",
    href: "/projects/location/dubai",
    cta: "International Projects",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&auto=format&fit=crop&q=80",
  },
];

export default function ExploreProperties() {
  return (
    <section id="explore-properties" className="bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-16 sm:py-20 lg:py-24">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mb-3 sm:mb-4 flex items-center justify-center gap-3"
          >
            <div className="h-[2px] w-8 bg-gold-gradient" />
            <span className="inline-block font-body text-label font-semibold uppercase text-gold-gradient tracking-wide">
              EXPLORE PROPERTIES
            </span>
            <div className="h-[2px] w-8 bg-gold-gradient" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 45 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading text-[clamp(1.5rem,3.2vw,2.75rem)] font-light tracking-normal text-neutral-900 leading-tight mb-4"
          >
            FIND YOUR <span className="font-bold text-gold-gradient">DESTINATION</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-body text-muted max-w-xl mx-auto"
          >
            Discover premium real estate opportunities across India and international markets
          </motion.p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {DESTINATIONS.map((dest, idx) => (
            <motion.div
              key={dest.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="group relative h-[340px] sm:h-[400px] lg:h-[440px] rounded-[24px] sm:rounded-[28px] overflow-hidden shadow-medium"
            >
              <Image
                src={dest.image}
                alt={dest.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/0" />

              <div className="relative z-10 h-full flex flex-col justify-end p-6 sm:p-8 lg:p-10">
                <h3 className="font-heading text-2xl sm:text-3xl font-semibold text-white uppercase leading-tight mb-2 drop-shadow">
                  {dest.title}
                </h3>
                <p className="font-body text-white/85 text-sm sm:text-base mb-6">
                  {dest.subtitle}
                </p>
                <Link
                  href={dest.href}
                  className="group/btn inline-flex w-fit items-center gap-2.5 rounded-full bg-gold-gradient px-6 py-3 text-label font-bold uppercase text-primary-dark shadow-[0_12px_30px_rgba(212,175,55,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110"
                >
                  {dest.cta}
                  <svg
                    className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
