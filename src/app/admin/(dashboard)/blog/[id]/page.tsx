import { notFound } from "next/navigation";
import { getPostById } from "@/lib/db/blog";
import PageHeader from "@/components/admin/PageHeader";
import BlogPostForm from "../BlogPostForm";

export const dynamic = "force-dynamic";
export const metadata = { title: "Edit Post — InfraGuru CMS" };

export default async function EditBlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getPostById(id);
  if (!post) notFound();

  return (
    <div>
      <PageHeader title={post.title} description={`/blog/${post.slug}`} />
      <BlogPostForm post={post} />
    </div>
  );
}
