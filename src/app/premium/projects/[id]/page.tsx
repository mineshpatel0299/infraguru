import { getProjectById } from '@/lib/projects';
import { notFound } from 'next/navigation';
import ProjectDetailClient from './ProjectDetailClient';
import { Metadata } from 'next';

export async function generateMetadata(props: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const params = await props.params;
  const project = getProjectById(params.id);
  if (!project) return { title: 'Not Found' };
  return {
    title: `${project.title} | Infra Guru Premium`,
    description: project.tagline,
  };
}

export default async function PremiumProjectPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const project = getProjectById(params.id);

  if (!project) {
    notFound();
  }

  return <ProjectDetailClient project={project} />;
}
