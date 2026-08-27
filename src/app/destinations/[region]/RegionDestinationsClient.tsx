"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { LocationConfig, LocationRegion } from "@/lib/locations";

type LocationWithFlag = LocationConfig & { hasProjects: boolean };

export default function RegionDestinationsClient({
  region,
  locations,
  heroImage,
}: {
  region: LocationRegion;
  locations: LocationWithFlag[];
  heroImage?: string;
}) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const isIndia = region === "India";

  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="min-h-screen bg-[#f9f9f9]"
    >
      <Navbar />

      {/* Hero */}
      <section className="relative h-[52vh] sm:h-[58vh] w-full overflow-hidden bg-neutral-900">
        {heroImage && (
          <Image
            src={heroImage}
            alt={`${region} destinations`}
            fill
            priority
            className="object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30" />

        <div className="relative z-10 h-full flex flex-col justify-end max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pb-14 sm:pb-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <Link
              href="/#explore-properties"
              className="mb-6 inline-flex items-center gap-2 text-label font-semibold uppercase tracking-wide text-white/70 transition-colors hover:text-gold-gradient"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back
            </Link>

            <div className="flex items-center gap-3 mb-4">
              <div className="h-[1px] w-8 bg-secondary" />
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-secondary">
                {isIndia ? "India" : "International"}
              </span>
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-light text-white uppercase leading-tight mb-4 drop-shadow-md">
              {isIndia ? "India" : "International"}{" "}
              <span className="font-bold text-gold-gradient">Destinations</span>
            </h1>
            <p className="text-white/85 text-base sm:text-lg max-w-xl font-body drop-shadow">
              {isIndia
                ? "Curated real estate opportunities across Gurgaon, Delhi, Goa and Dholera."
                : "Curated real estate opportunities across Dubai, Europe and Australia."}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Destination Grid */}
      <section className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-16 sm:py-20 lg:py-24">
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 ${
            isIndia ? "lg:grid-cols-4" : "lg:grid-cols-3"
          }`}
        >
          {locations.map((loc, idx) => {
            const card = (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className={`group relative h-[300px] sm:h-[340px] rounded-[24px] sm:rounded-[28px] overflow-hidden shadow-medium ${
                  loc.hasProjects ? "cursor-pointer" : ""
                }`}
              >
                <Image
                  src={loc.image}
                  alt={loc.label}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className={`object-cover transition-transform duration-700 ease-out ${
                    loc.hasProjects ? "group-hover:scale-110" : "grayscale-[0.3] opacity-70"
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/0" />

                {!loc.hasProjects && (
                  <span className="absolute top-5 right-5 z-10 rounded-full bg-white/15 backdrop-blur px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                    Coming Soon
                  </span>
                )}

                <div className="relative z-10 h-full flex flex-col justify-end p-6">
                  <h3 className="font-heading text-xl sm:text-2xl font-semibold text-white uppercase leading-tight mb-1 drop-shadow">
                    {loc.label}
                  </h3>
                  {loc.hasProjects && (
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-white/80 transition-colors duration-300 group-hover:text-gold-gradient">
                      View Properties
                      <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                  )}
                </div>
              </motion.div>
            );

            return loc.hasProjects ? (
              <Link key={loc.slug} href={`/projects/location/${loc.slug}`} aria-label={`View ${loc.label} properties`}>
                {card}
              </Link>
            ) : (
              <div key={loc.slug} aria-disabled="true">
                {card}
              </div>
            );
          })}
        </div>
      </section>

      <Footer />
    </motion.main>
  );
}
