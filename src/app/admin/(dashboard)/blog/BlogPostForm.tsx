"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import FormSection from "@/components/admin/FormSection";
import MediaUploader from "@/components/admin/MediaUploader";
import TextListEditor from "@/components/admin/TextListEditor";
import SaveBar from "@/components/admin/SaveBar";
import { inputClass, labelClass } from "@/components/admin/formStyles";
import { slugify } from "@/lib/slugify";
import { BLOG_CATEGORIES } from "@/lib/db/types";
import type { BlogPost } from "@/lib/db/types";
import type { BlogPostInput } from "@/lib/db/blog";
import { saveBlogPostAction } from "./actions";

function toInput(p?: BlogPost): BlogPostInput {
  return {
    slug: p?.slug ?? "",
    title: p?.title ?? "",
    excerpt: p?.excerpt ?? "",
    category: p?.category ?? BLOG_CATEGORIES[0],
    date: p?.date ?? new Date().toISOString().slice(0, 10),
    readTime: p?.readTime ?? "5 min read",
    coverImage: p?.coverImage ?? "",
    author: p?.author ?? { name: "InfraGuru Advisory Desk", role: "Research Team", avatar: "" },
    content: p?.content ?? [],
    status: p?.status ?? "draft",
  };
}

export default function BlogPostForm({ post }: { post?: BlogPost }) {
  const router = useRouter();
  const [form, setForm] = useState<BlogPostInput>(() => toInput(post));
  const [slugTouched, setSlugTouched] = useState(Boolean(post));
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const set = <K extends keyof BlogPostInput>(key: K, value: BlogPostInput[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleTitleChange = (title: string) => {
    set("title", title);
    if (!slugTouched) set("slug", slugify(title));
  };

  const handleSave = () => {
    setError(null);
    startTransition(async () => {
      try {
        await saveBlogPostAction(post?.id ?? null, form);
        router.push("/admin/blog");
        router.refresh();
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed to save post.");
      }
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <FormSection title="Basic Information">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="block sm:col-span-2">
            <span className={labelClass}>Title</span>
            <input
              type="text"
              value={form.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Gurugram's Real Estate Outlook for 2026"
              className={inputClass}
            />
          </label>
          <label className="block">
            <span className={labelClass}>Slug (used in the URL)</span>
            <input
              type="text"
              value={form.slug}
              onChange={(e) => {
                setSlugTouched(true);
                set("slug", slugify(e.target.value));
              }}
              className={inputClass}
            />
          </label>
          <label className="block">
            <span className={labelClass}>Category</span>
            <select
              value={form.category}
              onChange={(e) => set("category", e.target.value)}
              className={inputClass}
            >
              {BLOG_CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className={labelClass}>Publish Date</span>
            <input
              type="date"
              value={form.date}
              onChange={(e) => set("date", e.target.value)}
              className={inputClass}
            />
          </label>
          <label className="block">
            <span className={labelClass}>Read Time</span>
            <input
              type="text"
              value={form.readTime}
              onChange={(e) => set("readTime", e.target.value)}
              placeholder="6 min read"
              className={inputClass}
            />
          </label>
          <label className="block sm:col-span-2">
            <span className={labelClass}>Excerpt</span>
            <textarea
              rows={2}
              value={form.excerpt}
              onChange={(e) => set("excerpt", e.target.value)}
              placeholder="One or two sentences shown on the blog grid and article header."
              className={`${inputClass} resize-none`}
            />
          </label>
        </div>
      </FormSection>

      <FormSection title="Cover Image">
        <div className="max-w-sm">
          <MediaUploader value={form.coverImage} onChange={(url) => set("coverImage", url)} label="cover image" />
        </div>
      </FormSection>

      <FormSection title="Author">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="block">
            <span className={labelClass}>Name</span>
            <input
              type="text"
              value={form.author.name}
              onChange={(e) => set("author", { ...form.author, name: e.target.value })}
              className={inputClass}
            />
          </label>
          <label className="block">
            <span className={labelClass}>Role</span>
            <input
              type="text"
              value={form.author.role}
              onChange={(e) => set("author", { ...form.author, role: e.target.value })}
              className={inputClass}
            />
          </label>
          <label className="block sm:col-span-2">
            <span className={labelClass}>Avatar</span>
            <div className="max-w-[140px]">
              <MediaUploader
                value={form.author.avatar}
                onChange={(url) => set("author", { ...form.author, avatar: url })}
                label="avatar"
                aspect="aspect-square"
              />
            </div>
          </label>
        </div>
      </FormSection>

      <FormSection title="Article Content" description="One entry per paragraph, in reading order.">
        <TextListEditor
          label="Paragraphs"
          items={form.content}
          onChange={(v) => set("content", v)}
          placeholder="Write a paragraph…"
          multiline
        />
      </FormSection>

      <FormSection title="Publishing">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="block">
            <span className={labelClass}>Status</span>
            <select
              value={form.status}
              onChange={(e) => set("status", e.target.value as BlogPostInput["status"])}
              className={inputClass}
            >
              <option value="draft">Draft (hidden from site)</option>
              <option value="published">Published (live on site)</option>
            </select>
          </label>
        </div>
      </FormSection>

      <SaveBar
        onSave={handleSave}
        pending={pending}
        error={error}
        cancelHref="/admin/blog"
        saveLabel={post ? "Save Changes" : "Create Post"}
      />
    </div>
  );
}
