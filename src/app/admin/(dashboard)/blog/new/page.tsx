import PageHeader from "@/components/admin/PageHeader";
import BlogPostForm from "../BlogPostForm";

export const metadata = { title: "New Post — InfraGuru CMS" };

export default function NewBlogPostPage() {
  return (
    <div>
      <PageHeader title="New Post" description="Write a new journal article." />
      <BlogPostForm />
    </div>
  );
}
