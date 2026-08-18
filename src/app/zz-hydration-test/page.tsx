"use client";

import SectionEditBoundary from "@/components/pagebuilder/SectionEditBoundary";
import AboutFounder from "@/components/about/AboutFounder";
import Services from "@/components/Services";
import { ABOUT_FOUNDER_DEFAULT_CONTENT, SERVICES_DEFAULT_CONTENT } from "@/lib/pageSections";

export default function HydrationTestPage() {
  return (
    <>
      <SectionEditBoundary pageSlug="about" sectionKey="founder" initialContent={ABOUT_FOUNDER_DEFAULT_CONTENT}>
        <AboutFounder content={ABOUT_FOUNDER_DEFAULT_CONTENT} />
      </SectionEditBoundary>
      <SectionEditBoundary pageSlug="home" sectionKey="services" initialContent={SERVICES_DEFAULT_CONTENT}>
        <Services content={SERVICES_DEFAULT_CONTENT} />
      </SectionEditBoundary>
    </>
  );
}
