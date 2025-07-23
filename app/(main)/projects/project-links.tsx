import { ExternalLink, GitBranch } from 'lucide-react';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { fetchSanityProjectBySlug } from '@/sanity/lib/fetch';

export default function ProjectLinks({
  project,
}: {
  project: NonNullable<Awaited<ReturnType<typeof fetchSanityProjectBySlug>>>;
}) {
  if (!project.url && !project.repo) return null;

  return (
    <div className="py-8 flex gap-4">
      {project.url && (
        <Link href={project.url} target="_blank" rel="noopener noreferrer">
          <Button>
            <ExternalLink size={14} />
            <span>View Project</span>
          </Button>
        </Link>
      )}
      {project.repo && (
        <Link href={project.repo} target="_blank" rel="noopener noreferrer">
          <Button variant="secondary">
            <GitBranch size={14} />
            <span>View Repo</span>
          </Button>
        </Link>
      )}
    </div>
  );
}
