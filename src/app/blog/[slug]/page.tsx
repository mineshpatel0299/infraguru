import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostBySlug, listPublishedPosts } from "@/lib/db/blog";
import BlogPostContent from "@/components/blog/BlogPostContent";

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

  return {
    title: `${post.title} — InfraGuru Journal`,
    description: post.excerpt,
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

  return <BlogPostContent post={post} related={related} />;
}
