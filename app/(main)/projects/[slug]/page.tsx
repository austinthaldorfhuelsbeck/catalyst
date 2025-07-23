import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/ui/breadcrumbs';
import ProjectHero from '@/components/blocks/project/hero';
import { BreadcrumbLink } from '@/types';
import {
  fetchProjectNavigation,
  fetchSanityProjectBySlug,
  fetchSanityProjectsStaticParams,
} from '@/sanity/lib/fetch';
import { generatePageMetadata } from '@/sanity/lib/metadata';
import ProjectLinks from '../project-links';
import ProjectContent from '../project-content';
import ProjectNavigation from '@/components/blocks/project/navigation';

export async function generateStaticParams() {
  const projects = await fetchSanityProjectsStaticParams();

  return projects.map((project) => ({
    slug: project.slug?.current,
  }));
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const project = await fetchSanityProjectBySlug(params);

  if (!project) {
    notFound();
  }

  return generatePageMetadata({ page: project, slug: `/projects/${params.slug}` });
}

export default async function ProjectPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const [project, navigation] = await Promise.all([
    fetchSanityProjectBySlug(params),
    fetchProjectNavigation(params.slug),
  ]);

  if (!project) {
    notFound();
  }

  const links: BreadcrumbLink[] = project
    ? [
        {
          label: 'Home',
          href: '/',
        },
        {
          label: 'Projects',
          href: '/projects',
        },
        {
          label: project.title as string,
          href: '#',
        },
      ]
    : [];

  return (
    <div className="container py-16 xl:py-20">
      <Breadcrumbs links={links} />
      <ProjectHero {...project} />

      <article className="max-w-4xl mx-auto flex flex-col gap-16 py-8">
        <ProjectLinks project={project} />
        <ProjectContent project={project} />
        <ProjectNavigation previous={navigation.previous} next={navigation.next} />
      </article>
    </div>
  );
}
