import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BLOG_POSTS, getPostBySlug } from "@/lib/blog";
import BlogPostContent from "@/components/blog/BlogPostContent";

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

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
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const related = BLOG_POSTS.filter((p) => p.id !== post.id).slice(0, 3);

  return <BlogPostContent post={post} related={related} />;
}
