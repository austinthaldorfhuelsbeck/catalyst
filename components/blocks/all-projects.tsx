import SectionContainer from '@/components/ui/section-container';
import { stegaClean } from 'next-sanity';
import { fetchSanityProjects } from '@/sanity/lib/fetch';
import { PAGE_QUERYResult } from '@/sanity.types';
import GridPost from './grid/grid-post';

type AllProjectsProps = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>['blocks']>[number],
  { _type: 'all-projects' }
>;

export default async function AllProjects({ padding, colorVariant }: AllProjectsProps) {
  const color = stegaClean(colorVariant);
  const projects = await fetchSanityProjects();

  return (
    <SectionContainer color={color} padding={padding}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <GridPost key={project?.slug?.current} post={project} />
        ))}
      </div>
    </SectionContainer>
  );
}
