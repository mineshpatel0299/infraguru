"use client";

import { motion, type Variants } from 'framer-motion';
import Image from 'next/image';
import Navbar from './Navbar';
import { HERO_DEFAULT_CONTENT, type HeroContent } from '@/lib/pageSections';
import { useSectionEdit } from './pagebuilder/SectionEditBoundary';
import EditableText from './pagebuilder/EditableText';
import EditableVideo from './pagebuilder/EditableVideo';
import EditableImage from './pagebuilder/EditableImage';
import RemoveFieldButton from './pagebuilder/RemoveFieldButton';
import RemoveItemButton from './pagebuilder/RemoveItemButton';
import AddItemButton from './pagebuilder/AddItemButton';

const containerVariant: Variants = {
  hidden: { opacity: 0 },
  visible: (delay: number) => ({
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: delay },
  }),
};

const wordVariant: Variants = {
  hidden: { y: "115%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
  },
};

function SlideUpWordReveal({
  text,
  className = '',
  delay = 0.5,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.span
      className={`inline-flex flex-wrap justify-center ${className}`}
      custom={delay}
      variants={containerVariant}
      initial="hidden"
      animate="visible"
    >
      {text.split(' ').map((word, i) => (
        <span key={i} className="mr-[0.25em] inline-block overflow-hidden pt-[0.2em] -mt-[0.2em] pb-[0.1em] -mb-[0.1em]">
          <motion.span className="inline-block" variants={wordVariant}>
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

export default function Hero({ content = HERO_DEFAULT_CONTENT }: { content?: HeroContent }) {
  const ctx = useSectionEdit();
  const live = (ctx?.content as HeroContent | undefined) ?? content;
  const mediaType = live.backgroundMediaType === "image" ? "image" : "video";
  const hasCustomBackground = Boolean(live.backgroundVideo || live.backgroundImage);

  return (
    <section id="hero" className="relative bg-primary-dark h-[100svh]">
      <Navbar />

      <div
        className="relative w-full h-full flex flex-col overflow-hidden"
      >
        {/* Cinematic background — video and image uploaders are both always
            mounted (so either trigger button works regardless of which is
            currently active), but only the active mediaType renders actual
            media; whichever the admin uploads to becomes the active one. */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <EditableVideo
            path="backgroundVideo"
            fallback={live.backgroundVideo}
            wrapperClassName="absolute inset-0"
            triggerClassName="absolute right-4 top-20 sm:right-6 sm:top-24 z-40 flex items-center justify-center"
            onUploaded={() => ctx?.setField("backgroundMediaType", "video")}
          >
            {(src) =>
              mediaType === "video" ? (
                <video
                  key={src}
                  muted
                  autoPlay
                  playsInline
                  loop
                  preload="auto"
                  className="h-full w-full object-cover"
                >
                  {!src && <source src="/mhero.mp4" media="(max-width: 639px)" />}
                  <source src={src || "/danube.mp4"} />
                </video>
              ) : null
            }
          </EditableVideo>

          <EditableImage
            path="backgroundImage"
            fallback={live.backgroundImage}
            wrapperClassName="absolute inset-0"
            triggerClassName="absolute right-4 top-32 sm:right-6 sm:top-[8.5rem] z-40 flex items-center justify-center"
            onUploaded={() => ctx?.setField("backgroundMediaType", "image")}
          >
            {(src) =>
              mediaType === "image" && src ? (
                <Image src={src} alt="" fill priority sizes="100vw" className="object-cover" />
              ) : null
            }
          </EditableImage>

          {ctx && hasCustomBackground && (
            <RemoveFieldButton
              paths={["backgroundVideo", "backgroundImage", "backgroundMediaType"]}
              label="Revert to default background"
              className="absolute right-4 top-44 sm:right-6 sm:top-52 z-40 flex h-7 w-7 items-center justify-center rounded-full bg-red-500 text-xs text-white opacity-100 shadow"
            />
          )}
        </div>

        {/* Color gradient overlay from bottom to top */}
        <div className="absolute bottom-0 left-0 right-0 h-[50%] z-1 bg-gradient-to-t from-[#132731] via-[#132731]/60 to-transparent pointer-events-none" />

        {/* Top scrim — guarantees navbar legibility against bright video frames */}
        <div className="absolute inset-x-0 top-0 h-40 sm:h-64 z-1 bg-gradient-to-b from-black/60 via-black/15 to-transparent pointer-events-none" />

        {/* Curtain reveal */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-20 border-t-2 border-secondary bg-white"
          initial={{ y: 0 }}
          animate={{ y: '100%' }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.85, 0, 0.15, 1] }}
        />

        {/* Main Content Area (Centers the text block vertically). This box's
            own footprint spans nearly the full section (flex-1 + w-full),
            so it's pointer-events-none — otherwise, being higher in the
            stacking order than the background layer, it would swallow
            hover/clicks meant for the background upload buttons above even
            over the empty space around the text. Each interactive child
            below opts back in with pointer-events-auto. */}
        <div className="max-w-[1600px] relative z-10 mx-auto px-5 sm:px-8 flex-1 flex flex-col justify-end sm:justify-center w-full pb-6 sm:pb-0 pointer-events-none">
          <motion.div className="flex flex-col items-center text-center sm:items-start sm:text-left w-full max-w-4xl mx-auto sm:mx-0">
            <h1 className="mb-4 sm:mb-6 font-heading font-light uppercase text-white sm:text-[#132731] flex flex-col items-center sm:items-start pointer-events-auto">
              {ctx ? (
                <EditableText
                  as="span"
                  path="eyebrow"
                  fallback={live.eyebrow}
                  className="font-body text-[clamp(1rem,3vw,1.5rem)] sm:text-[clamp(1.2rem,2vw,2rem)] tracking-[0.25em] block justify-center sm:justify-start pb-2 sm:pb-4 text-white/80 sm:text-[#132731]/80 drop-shadow-md sm:drop-shadow-[0_2px_12px_rgba(255,255,255,0.8)]"
                />
              ) : (
                <SlideUpWordReveal
                  text={content.eyebrow}
                  delay={1.2}
                  className="font-body text-[clamp(1rem,3vw,1.5rem)] sm:text-[clamp(1.2rem,2vw,2rem)] tracking-[0.25em] block justify-center sm:justify-start pb-2 sm:pb-4 text-white/80 sm:text-[#132731]/80 drop-shadow-md sm:drop-shadow-[0_2px_12px_rgba(255,255,255,0.8)]"
                />
              )}
              {ctx ? (
                <EditableText
                  as="span"
                  path="headline"
                  fallback={live.headline}
                  className="text-[clamp(3.5rem,5vw,6rem)] leading-[0.85] tracking-[-0.02em] block justify-center sm:justify-start text-white sm:text-[#132731] drop-shadow-md sm:drop-shadow-[0_2px_18px_rgba(255,255,255,0.85)]"
                />
              ) : (
                <SlideUpWordReveal
                  text={content.headline}
                  delay={1.45}
                  className="text-[clamp(3.5rem,5vw,6rem)] leading-[0.85] tracking-[-0.02em] block justify-center sm:justify-start text-white sm:text-[#132731] drop-shadow-md sm:drop-shadow-[0_2px_18px_rgba(255,255,255,0.85)]"
                />
              )}
            </h1>
            
            <motion.div
               className="mt-2 sm:mt-4 hidden sm:flex flex-col gap-4 sm:gap-6 pointer-events-auto"
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8, delay: 1.75, ease: [0.16, 1, 0.3, 1] }}
            >
               <div className="w-16 sm:w-24 h-[2px] bg-gold-gradient"></div>
               <EditableText
                 as="p"
                 path="description"
                 fallback={live.description}
                 multiline
                 className="text-sm sm:text-base lg:text-lg text-white sm:text-[#132731] leading-relaxed font-body font-medium max-w-md drop-shadow-md sm:drop-shadow-[0_2px_14px_rgba(255,255,255,0.85)]"
               />
            </motion.div>

            <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8, delay: 1.9, ease: [0.16, 1, 0.3, 1] }}
               className="mt-6 sm:mt-12 pointer-events-auto"
            >
               <a href={content.ctaHref} className="inline-flex items-center justify-center gap-2 sm:gap-3 bg-[#132731] px-5 sm:px-9 py-3 sm:py-4 text-[10px] sm:text-xs font-bold text-white uppercase tracking-widest rounded-full hover:bg-gold-gradient hover:text-[#132731] transition-all duration-300 border border-transparent shadow-[0_8px_24px_rgba(0,0,0,0.15)] group">
                 <EditableText as="span" path="ctaLabel" fallback={live.ctaLabel} />
                 <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 17L17 7m0 0H8m9 0v9" /></svg>
               </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats Bottom Bar */}
        <motion.div
          className="w-full relative z-10 bg-gradient-to-t from-[#132731] to-transparent pt-4 sm:pt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="max-w-[1600px] mx-auto px-2 sm:px-8 pb-4 sm:pb-8">
            <div className="grid grid-cols-4 gap-0 divide-x divide-white/15">
              {live.stats.map((stat, i) => (
                <div key={i} className="group relative flex flex-col items-center justify-center text-center px-1 sm:px-2">
                  <RemoveItemButton arrayPath="stats" index={i} />
                  <EditableText as="span" path={`stats[${i}].value`} fallback={stat.value} className="text-xl sm:text-4xl font-light text-white leading-none" />
                  <EditableText
                    as="span"
                    path={`stats[${i}].label`}
                    fallback={stat.label}
                    className="text-[7px] sm:text-[10px] md:text-xs font-semibold tracking-wider text-white/60 uppercase mt-1 sm:mt-2"
                  />
                </div>
              ))}
            </div>
            {ctx && (
              <AddItemButton
                arrayPath="stats"
                newItem={{ value: "0+", label: "NEW STAT" }}
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-white/25 py-1.5 text-[10px] font-bold uppercase tracking-wide text-white/50 transition-colors hover:border-white/50 hover:text-white/80"
              />
            )}
          </div>
        </motion.div>

      </div>
    </section>
  );
}



