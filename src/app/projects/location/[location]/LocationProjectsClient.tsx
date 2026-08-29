"use client";

import { useEffect, useMemo, useRef, useState, type RefObject } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform, type MotionValue } from "framer-motion";
import type { Project } from "@/lib/db/types";
import { sortProjectsByDeveloperOrder, type LocationConfig } from "@/lib/locations";
import type { LocationHeroContent } from "@/lib/pageSections";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";
import { PRICE_RANGE_OPTIONS, matchesPriceRange, type PriceRangeFilter } from "@/lib/priceFilter";
import SectionEditBoundary, { useSectionEdit } from "@/components/pagebuilder/SectionEditBoundary";
import EditableImage from "@/components/pagebuilder/EditableImage";

type Category = "Residential" | "Commercial";

/** The hero — background photo, Residential/Commercial toggles, and search
 * bar. Split out from LocationProjectsClient so its SectionEditBoundary (see
 * below) only ever wraps this piece: Footer also calls useSectionEdit()
 * internally for its own content, and would misread the hero's edit context
 * if it were nested inside the same boundary. */
function LocationHero({
  location,
  hero,
  category,
  setCategory,
  heroRef,
  y,
  searchQuery,
  setSearchQuery,
  priceRange,
  setPriceRange,
  handleSearch,
}: {
  location: LocationConfig;
  hero: LocationHeroContent;
  category: Category;
  setCategory: (c: Category) => void;
  heroRef: RefObject<HTMLElement | null>;
  y: MotionValue<string>;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  priceRange: PriceRangeFilter;
  setPriceRange: (p: PriceRangeFilter) => void;
  handleSearch: () => void;
}) {
  const ctx = useSectionEdit();
  const live = (ctx?.content as LocationHeroContent | undefined) ?? hero;

  const resImg = live.residentialImage;
  const comImg = live.commercialImage;
  const bgImage = (category === "Residential" ? resImg : comImg) || resImg || comImg;
  const bgImagePath = category === "Residential" ? "residentialImage" : "commercialImage";

  return (
    <section ref={heroRef} className="relative h-[80vh] w-full bg-neutral-900 overflow-visible">
      <div className="absolute inset-0 overflow-hidden">
        {bgImage ? (
          <AnimatePresence initial={false}>
            <motion.div
              key={category}
              initial={{ clipPath: "circle(0% at 100% 0%)", zIndex: 10 }}
              animate={{ clipPath: "circle(150% at 100% 0%)", zIndex: 10 }}
              exit={{ zIndex: 0 }}
              transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
              className="absolute inset-0"
            >
              <motion.div style={{ y, scale: 1.15 }} className="absolute inset-0 origin-center">
                <EditableImage path={bgImagePath} fallback={bgImage} wrapperClassName="absolute inset-0">
                  {(src) => (src ? <Image src={src} alt={`${location.label} hero`} fill className="object-cover" priority /> : null)}
                </EditableImage>
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
              </motion.div>
            </motion.div>
          </AnimatePresence>
        ) : (
          <div className="absolute inset-0 bg-primary-dark" />
        )}
      </div>

      <div className="relative z-10 h-full flex flex-col justify-center max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl mt-[-10vh] md:mt-0"
        >
          <div className="flex items-center gap-3 mb-4 md:mb-5">
            <div className="h-[1px] w-6 md:w-8 bg-secondary" />
            <span className="text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase text-secondary">
              {location.region}
            </span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white uppercase leading-tight mb-3 md:mb-4 drop-shadow-md">
            {location.label} <span className="font-bold text-gold-gradient block md:inline">Projects</span>
          </h1>
          <p className="text-white/90 text-sm md:text-lg max-w-sm md:max-w-md font-body drop-shadow-lg">
            Discover exclusive {category.toLowerCase()} properties curated by Infraguru in {location.label}.
          </p>
        </motion.div>

        {/* Right side circle image toggles */}
        <div className="absolute right-4 md:right-6 sm:right-10 lg:right-16 bottom-[22%] md:bottom-auto md:top-1/2 md:-translate-y-1/2 flex flex-col items-end md:items-center gap-4 md:gap-6 z-20">
          {/* Residential Toggle */}
          <div className="relative flex items-center justify-end md:justify-center">
            <AnimatePresence>
              {category === "Residential" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute right-full mr-2 md:mr-4 flex items-center whitespace-nowrap drop-shadow-lg z-10"
                >
                  <motion.span
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1, duration: 0.4 }}
                    className="text-white font-body text-[11px] md:text-base tracking-[0.15em] md:tracking-[0.2em] uppercase font-medium mr-2 md:mr-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                  >
                    Residential
                  </motion.span>
                  <motion.div
                    initial={{ clipPath: "inset(0 0 0 100%)" }}
                    animate={{ clipPath: "inset(0 0 0 0%)" }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="w-6 md:w-20 h-px border-b-[2px] md:border-b-[3px] border-dotted border-white/80"
                  />
                </motion.div>
              )}
            </AnimatePresence>
            <div
              role="button"
              tabIndex={0}
              aria-pressed={category === "Residential"}
              onClick={() => setCategory("Residential")}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setCategory("Residential");
                }
              }}
              className={`relative rounded-full overflow-hidden transition-all duration-500 shadow-2xl shrink-0 bg-primary-dark cursor-pointer ${
                category === "Residential"
                  ? "w-16 h-16 md:w-32 md:h-32 border-[2px] md:border-[3px] border-white z-20 shadow-[0_0_30px_rgba(0,0,0,0.6)] scale-100"
                  : "w-10 h-10 md:w-16 md:h-16 border-2 border-white/60 opacity-70 hover:opacity-100 scale-90 hover:scale-100 z-10"
              }`}
            >
              <EditableImage path="residentialImage" fallback={resImg} wrapperClassName="absolute inset-0">
                {(src) => (src ? <Image src={src} alt="Residential" fill className="object-cover" /> : null)}
              </EditableImage>
            </div>
          </div>

          {/* Commercial Toggle */}
          <div className="relative flex items-center justify-end md:justify-center">
            <AnimatePresence>
              {category === "Commercial" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute right-full mr-2 md:mr-4 flex items-center whitespace-nowrap drop-shadow-lg z-10"
                >
                  <motion.span
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1, duration: 0.4 }}
                    className="text-white font-body text-[11px] md:text-base tracking-[0.15em] md:tracking-[0.2em] uppercase font-medium mr-2 md:mr-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                  >
                    Commercial
                  </motion.span>
                  <motion.div
                    initial={{ clipPath: "inset(0 0 0 100%)" }}
                    animate={{ clipPath: "inset(0 0 0 0%)" }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="w-6 md:w-20 h-px border-b-[2px] md:border-b-[3px] border-dotted border-white/80"
                  />
                </motion.div>
              )}
            </AnimatePresence>
            <div
              role="button"
              tabIndex={0}
              aria-pressed={category === "Commercial"}
              onClick={() => setCategory("Commercial")}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setCategory("Commercial");
                }
              }}
              className={`relative rounded-full overflow-hidden transition-all duration-500 shadow-2xl shrink-0 bg-primary-dark cursor-pointer ${
                category === "Commercial"
                  ? "w-16 h-16 md:w-32 md:h-32 border-[2px] md:border-[3px] border-white z-20 shadow-[0_0_30px_rgba(0,0,0,0.6)] scale-100"
                  : "w-10 h-10 md:w-16 md:h-16 border-2 border-white/60 opacity-70 hover:opacity-100 scale-90 hover:scale-100 z-10"
              }`}
            >
              <EditableImage path="commercialImage" fallback={comImg} wrapperClassName="absolute inset-0">
                {(src) => (src ? <Image src={src} alt="Commercial" fill className="object-cover" /> : null)}
              </EditableImage>
            </div>
          </div>
        </div>

        {/* Search/Filter Bar (Floating at bottom) */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[70%] md:translate-y-1/2 w-[92%] md:w-[90%] max-w-5xl bg-white/95 md:bg-white backdrop-blur-2xl md:backdrop-blur-none shadow-[0_20px_50px_rgba(0,0,0,0.3)] md:shadow-2xl rounded-2xl md:rounded-none border border-white/50 md:border-neutral-100 p-3 md:p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 md:gap-4 z-30">
          <div className="flex-1 w-full flex items-center px-3 py-2 md:py-0 md:px-4 bg-white/60 md:bg-transparent rounded-lg md:rounded-none border border-white/40 md:border-none shadow-sm md:shadow-none">
            <svg className="w-4 h-4 md:w-5 md:h-5 text-neutral-400 mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
            <div className="w-full">
              <label className="block text-[9px] md:text-[10px] font-body font-bold text-neutral-500 uppercase tracking-widest">Location</label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder={`Search ${location.label}`}
                className="w-full text-sm font-medium text-neutral-900 bg-transparent border-none focus:ring-0 p-0 placeholder-neutral-400"
              />
            </div>
          </div>

          <div className="hidden md:block w-px h-12 bg-neutral-200" />

          <div className="flex-1 w-full flex items-center px-3 py-2 md:py-0 md:px-4 bg-white/60 md:bg-transparent rounded-lg md:rounded-none border border-white/40 md:border-none shadow-sm md:shadow-none">
            <svg className="w-4 h-4 md:w-5 md:h-5 text-neutral-400 mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m3-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
            <div className="w-full">
              <label className="block text-[9px] md:text-[10px] font-body font-bold text-neutral-500 uppercase tracking-widest">Type</label>
              <p className="text-sm font-medium text-neutral-900">{category}</p>
            </div>
          </div>

          <div className="hidden md:block w-px h-12 bg-neutral-200" />

          <div className="flex-1 w-full flex items-center px-3 py-2 md:py-0 md:px-4 bg-white/60 md:bg-transparent rounded-lg md:rounded-none border border-white/40 md:border-none shadow-sm md:shadow-none">
            <svg className="w-4 h-4 md:w-5 md:h-5 text-neutral-400 mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <div className="w-full">
              <label className="block text-[9px] md:text-[10px] font-body font-bold text-neutral-500 uppercase tracking-widest">Price Range</label>
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value as PriceRangeFilter)}
                className="w-full text-sm font-medium text-neutral-900 bg-transparent border-none focus:ring-0 p-0 appearance-none outline-none cursor-pointer"
              >
                {PRICE_RANGE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={handleSearch}
            className="w-full md:w-auto mt-2 md:mt-0 bg-neutral-900 hover:bg-[#12223a] text-white p-3 md:p-4 md:px-8 flex items-center justify-center transition-colors rounded-lg md:rounded-none shadow-lg md:shadow-none"
          >
            <span className="md:hidden font-body font-bold text-sm uppercase tracking-widest mr-2">Search</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </button>
        </div>
      </div>
    </section>
  );
}

export default function LocationProjectsClient({
  location,
  projects,
  hero,
  pageSlug,
  editMode,
}: {
  location: LocationConfig;
  projects: Project[];
  hero: LocationHeroContent;
  pageSlug: string;
  editMode: boolean;
}) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Same hero structure as the main /projects page for every city (Indian or
  // international) — only the images and copy change, scoped to this location.
  const [category, setCategory] = useState<Category>("Residential");
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState<PriceRangeFilter>("any");
  const heroRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  const isResidential = (cat: string) => cat === "Residential";
  const isCommercial = (cat: string) => cat === "Commercial";

  const categoryProjects = sortProjectsByDeveloperOrder(
    projects.filter((p) => (category === "Residential" ? isResidential(p.category) : isCommercial(p.category))),
    location.developerOrder
  );

  const displayProjects = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return categoryProjects.filter((p) => {
      if (query && !p.location.toLowerCase().includes(query) && !p.title.toLowerCase().includes(query)) return false;
      if (!matchesPriceRange(p.price, priceRange)) return false;
      return true;
    });
  }, [categoryProjects, searchQuery, priceRange]);

  const handleSearch = () => {
    gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const heroNode = (
    <LocationHero
      location={location}
      hero={hero}
      category={category}
      setCategory={setCategory}
      heroRef={heroRef}
      y={y}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      priceRange={priceRange}
      setPriceRange={setPriceRange}
      handleSearch={handleSearch}
    />
  );

  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="min-h-screen bg-[#f9f9f9]"
    >
      <Navbar />

      {editMode ? (
        <SectionEditBoundary pageSlug={pageSlug} sectionKey="hero" initialContent={hero}>
          {heroNode}
        </SectionEditBoundary>
      ) : (
        heroNode
      )}

      {/* Grid / empty state */}
      <section ref={gridRef} className="pt-[18rem] sm:pt-[20rem] md:pt-40 pb-24 max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-24">
        {categoryProjects.length > 0 ? (
          <>
            <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <h2 className="font-heading text-2xl md:text-3xl font-medium text-neutral-900">
                  {location.label} <span className="font-bold text-gold-gradient">Portfolio</span>
                </h2>
                <p className="text-sm text-neutral-500 mt-2 font-medium tracking-wide">
                  Showing {displayProjects.length} {category.toLowerCase()} projects in {location.label}
                  {searchQuery && ` matching "${searchQuery}"`}
                </p>
              </div>
              {(searchQuery || priceRange !== "any") && (
                <button
                  onClick={() => { setSearchQuery(""); setPriceRange("any"); }}
                  className="text-xs font-body font-bold text-neutral-900 border border-neutral-300 px-4 py-2 uppercase tracking-widest hover:border-neutral-900 transition-colors self-start"
                >
                  Clear Filters
                </button>
              )}
            </div>
            {displayProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AnimatePresence mode="popLayout">
                  {displayProjects.map((project, i) => (
                    <ProjectCard key={project.id} project={project} index={i} />
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center py-24 border border-dashed border-neutral-200 rounded-2xl">
                <h3 className="font-heading text-xl md:text-2xl font-light text-neutral-900 mb-3">
                  No {category.toLowerCase()} projects match your search.
                </h3>
                <p className="text-neutral-500 max-w-md mb-6 font-body text-sm">
                  Try a different search term or widen the price range.
                </p>
                <button
                  onClick={() => { setSearchQuery(""); setPriceRange("any"); }}
                  className="text-xs font-body font-bold text-neutral-900 border border-neutral-300 px-4 py-2 uppercase tracking-widest hover:border-neutral-900 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center text-center py-24 border border-dashed border-neutral-200 rounded-2xl">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-secondary-hover mb-4">
              Coming Soon
            </span>
            <h2 className="font-heading text-2xl md:text-3xl font-light text-neutral-900 mb-4 max-w-lg">
              We&apos;re curating our {location.label} {category.toLowerCase()} portfolio.
            </h2>
            <p className="text-neutral-500 max-w-md mb-8 font-body">
              Be the first to know when new {location.label} listings go live.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 rounded text-label bg-primary px-8 py-3.5 font-semibold uppercase text-white shadow-[0_12px_30px_rgba(3,46,151,0.25)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary-light"
            >
              Register Your Interest
            </Link>
          </div>
        )}
      </section>

      <Footer />
    </motion.main>
  );
}
