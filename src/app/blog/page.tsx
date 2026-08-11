import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogHero from "@/components/blog/BlogHero";
import BlogGrid from "@/components/blog/BlogGrid";
import BlogNewsletter from "@/components/blog/BlogNewsletter";
import { listPublishedPosts } from "@/lib/db/blog";
import BlogPageMotion from "./BlogPageMotion";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Market insights, buying guides, and investment perspectives from the Infraguru advisory team.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "InfraGuru Journal",
    description:
      "Market insights, buying guides, and investment perspectives from the Infraguru advisory team.",
    url: "/blog",
  },
};

export default async function BlogPage() {
  const posts = await listPublishedPosts();

  return (
    <BlogPageMotion>
      <Navbar />
      <BlogHero />
      <BlogGrid posts={posts} />
      <BlogNewsletter />
      <Footer />
    </BlogPageMotion>
  );
}
