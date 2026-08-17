import type { Metadata } from "next";
import type { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GalleryHero from "@/components/gallery/GalleryHero";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import VideoGalleryGrid from "@/components/gallery/VideoGalleryGrid";
import GalleryPageMotion from "./GalleryPageMotion";
import { getSections } from "@/lib/db/pageContent";
import { getSession } from "@/lib/auth";
import SectionEditBoundary from "@/components/pagebuilder/SectionEditBoundary";
import PageEditProvider from "@/components/pagebuilder/PageEditProvider";
import EditModeBar from "@/components/pagebuilder/EditModeBar";
import {
  getPageDef,
  resolveSection,
  GALLERY_HERO_DEFAULT_CONTENT,
  GALLERY_DEFAULT_CONTENT,
  GALLERY_VIDEOS_DEFAULT_CONTENT,
  FOOTER_DEFAULT_CONTENT,
} from "@/lib/pageSections";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "A curated visual journey through the addresses, interiors, and skylines that define InfraGuru.",
  alternates: { canonical: "/gallery" },
  openGraph: {
    title: "Gallery — Infraguru",
    description:
      "A curated visual journey through the addresses, interiors, and skylines that define InfraGuru.",
    url: "/gallery",
  },
};

const GALLERY_PAGE = getPageDef("gallery")!;
const sectionByKey = Object.fromEntries(GALLERY_PAGE.sections.map((s) => [s.key, s]));

export default async function GalleryPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const [sections, session, sp] = await Promise.all([
    getSections(GALLERY_PAGE.sections),
    getSession(),
    searchParams,
  ]);

  const editMode = Boolean(session) && sp.cmsEdit === "1";

  const hero = resolveSection(sections, sectionByKey.hero, GALLERY_HERO_DEFAULT_CONTENT);
  const gallery = resolveSection(sections, sectionByKey.gallery, GALLERY_DEFAULT_CONTENT);
  const videos = resolveSection(sections, sectionByKey.videos, GALLERY_VIDEOS_DEFAULT_CONTENT);
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
    <GalleryPageMotion>
      <Navbar />
      {wrap("hero", hero, <GalleryHero content={hero} />)}
      {wrap("gallery", gallery, <GalleryGrid content={gallery} />)}
      {wrap("videos", videos, <VideoGalleryGrid content={videos} />)}
      {wrap("footer", footer, <Footer content={footer} />)}
    </GalleryPageMotion>
  );

  if (!editMode) return page;

  return (
    <PageEditProvider>
      <EditModeBar />
      {page}
    </PageEditProvider>
  );
}
