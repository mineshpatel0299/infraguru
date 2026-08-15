"use client";

import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from "react";

type SaveFn = () => Promise<void>;

type PageEditContextValue = {
  registerSection: (sectionKey: string, save: SaveFn) => void;
  markDirty: (sectionKey: string, dirty: boolean) => void;
};

const PageEditContext = createContext<PageEditContextValue | null>(null);

export function usePageEdit(): PageEditContextValue | null {
  return useContext(PageEditContext);
}

/** Coordinates saving across every SectionEditBoundary on the page. Edits
 * only update local draft state as you type — nothing hits the network
 * until you click "Save Changes" here, so there's one clear, visible,
 * always-reachable place that confirms a save actually happened. */
export default function PageEditProvider({ children }: { children: ReactNode }) {
  const saveFns = useRef<Record<string, SaveFn>>({});
  const [dirty, setDirty] = useState<Record<string, boolean>>({});
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const registerSection = useCallback((sectionKey: string, save: SaveFn) => {
    saveFns.current[sectionKey] = save;
  }, []);

  const markDirty = useCallback((sectionKey: string, isDirty: boolean) => {
    setDirty((d) => (d[sectionKey] === isDirty ? d : { ...d, [sectionKey]: isDirty }));
  }, []);

  const dirtyKeys = Object.keys(dirty).filter((k) => dirty[k]);

  const saveAll = () => {
    setSaving(true);
    setError(null);
    Promise.all(dirtyKeys.map((key) => saveFns.current[key]?.()))
      .then(() => setDirty({}))
      .catch(() => setError("Some changes failed to save — please try again."))
      .finally(() => setSaving(false));
  };

  return (
    <PageEditContext.Provider value={{ registerSection, markDirty }}>
      {children}
      {dirtyKeys.length > 0 && (
        <div className="fixed inset-x-0 bottom-0 z-[10001] flex flex-wrap items-center justify-between gap-3 border-t border-white/10 bg-[#0a1435] px-5 py-3 shadow-[0_-10px_30px_rgba(0,0,0,0.25)]">
          <p className="text-xs font-semibold text-white">
            {error ? (
              <span className="text-red-300">{error}</span>
            ) : (
              `${dirtyKeys.length} section${dirtyKeys.length > 1 ? "s" : ""} with unsaved changes`
            )}
          </p>
          <button
            type="button"
            onClick={saveAll}
            disabled={saving}
            className="rounded-full bg-gradient-to-r from-[#d4af37] via-[#f0d375] to-[#d4af37] px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-[#132731] shadow-[0_10px_24px_rgba(212,175,55,0.25)] transition-all duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? "Saving…" : "Save Changes"}
          </button>
        </div>
      )}
    </PageEditContext.Provider>
  );
}
