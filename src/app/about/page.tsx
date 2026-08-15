import type { Metadata } from "next";
import type { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AboutHero from "@/components/about/AboutHero";
import AboutStory from "@/components/about/AboutStory";
import AboutStats from "@/components/about/AboutStats";
import AboutPillars from "@/components/about/AboutPillars";
import AboutTimeline from "@/components/about/AboutTimeline";
import AboutFounder from "@/components/about/AboutFounder";
import AboutCTA from "@/components/about/AboutCTA";
import AboutPageMotion from "./AboutPageMotion";
import { getSections } from "@/lib/db/pageContent";
import { getSession } from "@/lib/auth";
import SectionEditBoundary from "@/components/pagebuilder/SectionEditBoundary";
import PageEditProvider from "@/components/pagebuilder/PageEditProvider";
import EditModeBar from "@/components/pagebuilder/EditModeBar";
import {
  getPageDef,
  resolveSection,
  ABOUT_HERO_DEFAULT_CONTENT,
  ABOUT_STORY_DEFAULT_CONTENT,
  ABOUT_PILLARS_DEFAULT_CONTENT,
  ABOUT_STATS_DEFAULT_CONTENT,
  ABOUT_TIMELINE_DEFAULT_CONTENT,
  ABOUT_FOUNDER_DEFAULT_CONTENT,
  ABOUT_CTA_DEFAULT_CONTENT,
  FOOTER_DEFAULT_CONTENT,
} from "@/lib/pageSections";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Infraguru is a private real estate advisory built on a tradition of trust, curating ultra-premium residences and commercial addresses.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Infraguru",
    description:
      "Infraguru is a private real estate advisory built on a tradition of trust, curating ultra-premium residences and commercial addresses.",
    url: "/about",
  },
};

const ABOUT_PAGE = getPageDef("about")!;
const sectionByKey = Object.fromEntries(ABOUT_PAGE.sections.map((s) => [s.key, s]));

export default async function AboutPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const [sections, session, sp] = await Promise.all([
    getSections(ABOUT_PAGE.sections),
    getSession(),
    searchParams,
  ]);

  const editMode = Boolean(session) && sp.cmsEdit === "1";

  const hero = resolveSection(sections, sectionByKey.hero, ABOUT_HERO_DEFAULT_CONTENT);
  const story = resolveSection(sections, sectionByKey.story, ABOUT_STORY_DEFAULT_CONTENT);
  const pillars = resolveSection(sections, sectionByKey.pillars, ABOUT_PILLARS_DEFAULT_CONTENT);
  const stats = resolveSection(sections, sectionByKey.stats, ABOUT_STATS_DEFAULT_CONTENT);
  const timeline = resolveSection(sections, sectionByKey.timeline, ABOUT_TIMELINE_DEFAULT_CONTENT);
  const founder = resolveSection(sections, sectionByKey.founder, ABOUT_FOUNDER_DEFAULT_CONTENT);
  const cta = resolveSection(sections, sectionByKey.cta, ABOUT_CTA_DEFAULT_CONTENT);
  const footer = resolveSection(sections, sectionByKey.footer, FOOTER_DEFAULT_CONTENT);

  const wrap = (sectionKey: string, initialContent: unknown, node: ReactNode): ReactNode =>
    editMode ? (
      <SectionEditBoundary pageSlug={sectionByKey[sectionKey].pageSlug} sectionKey={sectionKey} initialContent={initialContent}>
        {node}
      </SectionEditBoundary>
    ) : (
      node
    );

  const page = (
    <AboutPageMotion>
      <Navbar />
      {wrap("hero", hero, <AboutHero content={hero} />)}
      {wrap("story", story, <AboutStory content={story} />)}
      {wrap("stats", stats, <AboutStats content={stats} />)}
      {wrap("pillars", pillars, <AboutPillars content={pillars} />)}
      {wrap("timeline", timeline, <AboutTimeline content={timeline} />)}
      {wrap("founder", founder, <AboutFounder content={founder} />)}
      {wrap("cta", cta, <AboutCTA content={cta} />)}
      {wrap("footer", footer, <Footer content={footer} />)}
    </AboutPageMotion>
  );

  if (!editMode) return page;

  return (
    <PageEditProvider>
      <EditModeBar />
      {page}
    </PageEditProvider>
  );
}
