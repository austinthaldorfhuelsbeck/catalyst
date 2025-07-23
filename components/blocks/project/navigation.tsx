import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { urlFor } from '@/sanity/lib/image';
import { PROJECTS_QUERYResult } from '@/sanity.types';

type ProjectItem = PROJECTS_QUERYResult[number];

interface ProjectNavigationProps {
  previous: ProjectItem | null;
  next: ProjectItem | null;
}

export default function ProjectNavigation({ previous, next }: ProjectNavigationProps) {
  if (!previous && !next) return null;

  return (
    <nav className="mt-16 pt-8 border-t border-border">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {previous ? (
          <ProjectNavigationCard
            project={previous}
            direction="previous"
            icon={<ChevronLeft size={20} />}
          />
        ) : (
          <div />
        )}

        {next ? (
          <ProjectNavigationCard
            project={next}
            direction="next"
            icon={<ChevronRight size={20} />}
          />
        ) : (
          <div />
        )}
      </div>
    </nav>
  );
}

interface ProjectNavigationCardProps {
  project: ProjectItem;
  direction: 'previous' | 'next';
  icon: React.ReactNode;
}

function ProjectNavigationCard({ project, direction, icon }: ProjectNavigationCardProps) {
  const isPrevious = direction === 'previous';

  return (
    <Link
      href={`/projects/${project.slug?.current}`}
      className={`group flex items-center gap-4 p-4 rounded-lg border border-border hover:border-foreground/20 transition-colors ${
        isPrevious ? 'justify-start' : 'justify-end md:flex-row-reverse'
      }`}
    >
      <div className="flex-shrink-0">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-muted group-hover:bg-muted/80 transition-colors">
          {icon}
        </div>
      </div>

      <div className={`flex-1 min-w-0 ${isPrevious ? 'text-left' : 'text-right'}`}>
        <div className="text-sm text-muted-foreground mb-1">
          {isPrevious ? 'Previous project' : 'Next project'}
        </div>
        <div className="font-medium text-foreground group-hover:text-foreground/80 transition-colors truncate">
          {project.title}
        </div>
      </div>

      {project.image && (
        <div className="flex-shrink-0">
          <div className="relative w-16 h-16 rounded-md overflow-hidden bg-muted">
            <Image
              src={urlFor(project.image).url()}
              alt={project.image.alt || project.title || ''}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-200"
              sizes="64px"
            />
          </div>
        </div>
      )}
    </Link>
  );
}
