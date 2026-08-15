"use client";

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { saveSectionContentAction } from "@/app/admin/(dashboard)/pages/actions";
import { addAtPath, removeAtPath, setPath } from "@/lib/objectPath";
import { usePageEdit } from "./PageEditProvider";

type SectionEditContextValue = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: any;
  setField: (path: string, value: unknown) => void;
  removeItem: (arrayPath: string, index: number) => void;
  addItem: (arrayPath: string, item: unknown) => void;
};

const SectionEditContext = createContext<SectionEditContextValue | null>(null);

/** Returns null outside a SectionEditBoundary, so the inline-editing
 * primitives (EditableText, EditableImage, …) can fall back to plain,
 * static rendering for normal visitors with zero behavioral overhead. */
export function useSectionEdit(): SectionEditContextValue | null {
  return useContext(SectionEditContext);
}

/** Wraps one page section while in the admin's inline edit mode. Holds the
 * section's live content as a local draft (seeded from the server-rendered
 * value) and registers a save function with the page-wide PageEditProvider
 * — nothing hits the network until the visible "Save Changes" bar is
 * clicked, so edits from EditableText/EditableImage/etc. never silently
 * fail to persist. */
export default function SectionEditBoundary({
  pageSlug,
  sectionKey,
  initialContent,
  children,
}: {
  pageSlug: string;
  sectionKey: string;
  initialContent: unknown;
  children: ReactNode;
}) {
  const pageEdit = usePageEdit();
  const [content, setContent] = useState(initialContent);
  const contentRef = useRef(content);

  useEffect(() => {
    contentRef.current = content;
  }, [content]);

  useEffect(() => {
    pageEdit?.registerSection(sectionKey, async () => {
      await saveSectionContentAction(pageSlug, sectionKey, contentRef.current);
    });
  }, [pageEdit, pageSlug, sectionKey]);

  function mutate(next: unknown) {
    setContent(next);
    pageEdit?.markDirty(sectionKey, true);
  }

  const value: SectionEditContextValue = {
    content,
    setField: (path, v) => mutate(setPath(content, path, v)),
    removeItem: (arrayPath, index) => mutate(removeAtPath(content, arrayPath, index)),
    addItem: (arrayPath, item) => mutate(addAtPath(content, arrayPath, item)),
  };

  return <SectionEditContext.Provider value={value}>{children}</SectionEditContext.Provider>;
}
