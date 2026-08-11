import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostBySlug, listPublishedPosts } from "@/lib/db/blog";
import BlogPostContent from "@/components/blog/BlogPostContent";
import { absoluteUrl, DEFAULT_OG_IMAGE } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return { title: "Article Not Found — InfraGuru" };
  }

  const title = `${post.title} — InfraGuru Journal`;
  const url = `/blog/${post.slug}`;
  const image = post.coverImage || DEFAULT_OG_IMAGE;

  return {
    title,
    description: post.excerpt,
    alternates: { canonical: url },
    robots: post.status === "published" ? { index: true, follow: true } : { index: false, follow: false },
    openGraph: {
      type: "article",
      title,
      description: post.excerpt,
      url,
      publishedTime: post.date,
      modifiedTime: post.updatedAt,
      authors: post.author?.name ? [post.author.name] : undefined,
      images: [{ url: image }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: post.excerpt,
      images: [image],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post || post.status !== "published") {
    notFound();
  }

  const related = (await listPublishedPosts()).filter((p) => p.id !== post.id).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: absoluteUrl(post.coverImage || DEFAULT_OG_IMAGE),
    datePublished: post.date,
    dateModified: post.updatedAt,
    author: post.author?.name ? { "@type": "Person", name: post.author.name } : undefined,
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogPostContent post={post} related={related} />
    </>
  );
}
