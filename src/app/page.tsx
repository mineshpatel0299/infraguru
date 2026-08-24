import type { Metadata } from "next";
import type { ReactNode } from "react";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Stats from "@/components/Stats";
import WhyChooseUs from "@/components/WhyChooseUs";
import Awards from "@/components/Awards";
import ExploreProperties from "@/components/ExploreProperties";
import Services from "@/components/Services";
import FeaturedProjects from "@/components/FeaturedProjects";
import Testimonials from "@/components/Testimonials";
import { DVSNetworkCTA } from "@/components/DVSNetworkCTA";
import Footer from "@/components/Footer";
import { listPublishedProjects } from "@/lib/db/projects";
import { getSections } from "@/lib/db/pageContent";
import { getSession } from "@/lib/auth";
import SectionEditBoundary from "@/components/pagebuilder/SectionEditBoundary";
import PageEditProvider from "@/components/pagebuilder/PageEditProvider";
import EditModeBar from "@/components/pagebuilder/EditModeBar";
import {
  getPageDef,
  resolveSection,
  HERO_DEFAULT_CONTENT,
  ABOUT_DEFAULT_CONTENT,
  STATS_DEFAULT_CONTENT,
  WHY_CHOOSE_US_DEFAULT_CONTENT,
  AWARDS_DEFAULT_CONTENT,
  EXPLORE_PROPERTIES_DEFAULT_CONTENT,
  SERVICES_DEFAULT_CONTENT,
  TESTIMONIALS_DEFAULT_CONTENT,
  FOOTER_DEFAULT_CONTENT,
} from "@/lib/pageSections";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: { url: "/" },
};

const HOME_PAGE = getPageDef("home")!;
const sectionByKey = Object.fromEntries(HOME_PAGE.sections.map((s) => [s.key, s]));

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const [projects, sections, session, sp] = await Promise.all([
    listPublishedProjects(),
    getSections(HOME_PAGE.sections),
    getSession(),
    searchParams,
  ]);

  const editMode = Boolean(session) && sp.cmsEdit === "1";

  const hero = resolveSection(sections, sectionByKey.hero, HERO_DEFAULT_CONTENT);
  const about = resolveSection(sections, sectionByKey.about, ABOUT_DEFAULT_CONTENT);
  const stats = resolveSection(sections, sectionByKey.stats, STATS_DEFAULT_CONTENT);
  const whyChooseUs = resolveSection(sections, sectionByKey.whyChooseUs, WHY_CHOOSE_US_DEFAULT_CONTENT);
  const awards = resolveSection(sections, sectionByKey.awards, AWARDS_DEFAULT_CONTENT);
  const exploreProperties = resolveSection(sections, sectionByKey.exploreProperties, EXPLORE_PROPERTIES_DEFAULT_CONTENT);
  const services = resolveSection(sections, sectionByKey.services, SERVICES_DEFAULT_CONTENT);
  const testimonials = resolveSection(sections, sectionByKey.testimonials, TESTIMONIALS_DEFAULT_CONTENT);
  const footer = resolveSection(sections, sectionByKey.footer, FOOTER_DEFAULT_CONTENT);

  // Only ever construct <SectionEditBoundary> (a client component) when a
  // logged-in admin actually requested edit mode, so a normal visit never
  // pulls its inline-editing JS into the page — the branch below is a
  // no-op passthrough that just renders the section.
  const wrap = (sectionKey: string, initialContent: unknown, node: ReactNode): ReactNode =>
    editMode ? (
      <SectionEditBoundary pageSlug={sectionByKey[sectionKey].pageSlug} sectionKey={sectionKey} initialContent={initialContent}>
        {node}
      </SectionEditBoundary>
    ) : (
      node
    );

  const main = (
    <main className={editMode ? "pt-9" : undefined}>
      {wrap("hero", hero, <Hero content={hero} />)}
      {wrap("about", about, <About content={about} />)}
      {wrap("stats", stats, <Stats content={stats} />)}
      {wrap("whyChooseUs", whyChooseUs, <WhyChooseUs content={whyChooseUs} />)}
      {wrap("awards", awards, <Awards content={awards} />)}
      {wrap("exploreProperties", exploreProperties, <ExploreProperties content={exploreProperties} />)}
      {projects.length > 0 && <FeaturedProjects projects={projects.slice(0, 5)} />}
      {wrap("services", services, <Services content={services} />)}
      {wrap("testimonials", testimonials, <Testimonials content={testimonials} />)}
      <DVSNetworkCTA />
      {wrap("footer", footer, <Footer content={footer} />)}
    </main>
  );

  if (!editMode) return main;

  return (
    <PageEditProvider>
      <EditModeBar />
      {main}
    </PageEditProvider>
  );
}
