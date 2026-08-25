"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { EXPLORE_PROPERTIES_DEFAULT_CONTENT, type ExplorePropertiesContent } from "@/lib/pageSections";
import { useSectionEdit } from "./pagebuilder/SectionEditBoundary";
import EditableText from "./pagebuilder/EditableText";
import EditableImage from "./pagebuilder/EditableImage";
import RemoveItemButton from "./pagebuilder/RemoveItemButton";
import AddItemButton from "./pagebuilder/AddItemButton";

export default function ExploreProperties({
  content = EXPLORE_PROPERTIES_DEFAULT_CONTENT,
}: {
  content?: ExplorePropertiesContent;
}) {
  const ctx = useSectionEdit();
  const live = (ctx?.content as ExplorePropertiesContent | undefined) ?? content;
  const DESTINATIONS = live.destinations;
  return (
    <section id="explore-properties" className="bg-white">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 py-16 sm:py-20 lg:py-24">
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
            <EditableText
              as="span"
              path="eyebrow"
              fallback={live.eyebrow}
              className="inline-block font-body text-label font-semibold uppercase text-gold-gradient tracking-wide"
            />
            <div className="h-[2px] w-8 bg-gold-gradient" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 45 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading text-[clamp(1.5rem,2.3vw,2.75rem)] font-light tracking-normal text-neutral-900 leading-tight mb-4"
          >
            <EditableText as="span" path="headingPlain" fallback={live.headingPlain} />{" "}
            <EditableText as="span" path="headingHighlight" fallback={live.headingHighlight} className="font-bold text-gold-gradient" />
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <EditableText as="p" path="subheading" fallback={live.subheading} multiline className="text-body text-muted max-w-xl mx-auto" />
          </motion.div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {DESTINATIONS.map((dest, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="group relative h-[340px] sm:h-[400px] lg:h-[440px] rounded-[24px] sm:rounded-[28px] overflow-hidden shadow-medium"
            >
              <RemoveItemButton arrayPath="destinations" index={idx} />
              <EditableImage path={`destinations[${idx}].image`} fallback={dest.image} wrapperClassName="absolute inset-0">
                {(src) => (
                  <Image
                    src={src}
                    alt={dest.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                )}
              </EditableImage>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/0" />

              <div className="pointer-events-none relative z-10 h-full flex flex-col justify-end p-6 sm:p-8 lg:p-10">
                <EditableText
                  as="h3"
                  path={`destinations[${idx}].title`}
                  fallback={dest.title}
                  className="pointer-events-auto font-heading text-2xl sm:text-3xl font-semibold text-white uppercase leading-tight mb-2 drop-shadow block"
                />
                <EditableText
                  as="p"
                  path={`destinations[${idx}].subtitle`}
                  fallback={dest.subtitle}
                  className="pointer-events-auto font-body text-white/85 text-sm sm:text-base mb-6"
                />
                <Link
                  href={dest.href}
                  className="pointer-events-auto group/btn inline-flex w-fit items-center gap-2.5 rounded-full bg-gold-gradient px-6 py-3 text-label font-bold uppercase text-primary-dark shadow-[0_12px_30px_rgba(212,175,55,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110"
                >
                  <EditableText as="span" path={`destinations[${idx}].cta`} fallback={dest.cta} />
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
          {ctx && (
            <AddItemButton
              arrayPath="destinations"
              newItem={{ title: "New Destination", subtitle: "Add a subtitle", href: "/contact", cta: "Learn More", image: "/about-1.jpg" }}
              className="flex h-[340px] items-center justify-center gap-2 rounded-[24px] border-2 border-dashed border-[#032E97]/20 text-xs font-bold uppercase tracking-wide text-[#032E97]/60 transition-colors hover:border-[#d4af37]/50 hover:text-[#032E97] sm:h-[400px] lg:h-[440px]"
            />
          )}
        </div>
      </div>
    </section>
  );
}
