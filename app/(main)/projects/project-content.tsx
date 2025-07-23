import Carousel1 from '@/components/blocks/carousel/carousel-1';
import SectionHeader from '@/components/blocks/section-header';
import PortableTextRenderer from '@/components/portable-text-renderer';
import { fetchSanityProjectBySlug } from '@/sanity/lib/fetch';

export default function ProjectContent({
  project,
}: {
  project: NonNullable<Awaited<ReturnType<typeof fetchSanityProjectBySlug>>>;
}) {
  return (
    <>
      {project.problem && (
        <section>
          <h2 className="text-3xl md:text-5xl mb-4 lg:mb-8">Problem Statement</h2>
          <PortableTextRenderer value={project.problem} />
        </section>
      )}

      {project.solution && (
        <section>
          <h2 className="text-3xl md:text-5xl mb-4 lg:mb-8">Solution Approach</h2>
          <PortableTextRenderer value={project.solution} />
        </section>
      )}

      {project.implementation && (
        <section>
          <h2 className="text-3xl md:text-5xl mb-4 lg:mb-8">Implementation Details</h2>
          {/* <ProjectSkills skills={project.skills} /> */}
          <PortableTextRenderer value={project.implementation} />
        </section>
      )}

      {project.results && (
        <section>
          <h2 className="text-3xl md:text-5xl mb-4 lg:mb-8">Results and Outcomes</h2>
          {project.gallery && project.gallery.length > 0 && (
            <Carousel1
              images={project.gallery}
              size={null}
              indicators={null}
              padding={null}
              colorVariant={null}
              sectionWidth={null}
              stackAlign={null}
              orientation={null}
            />
          )}
          <PortableTextRenderer value={project.results} />
        </section>
      )}

      {project.testimonials && (
        <section>
          <h2 className="text-3xl md:text-5xl mb-4 lg:mb-8">Testimonials</h2>
          <pre>{JSON.stringify(project.testimonials, null, 2)}</pre>
        </section>
      )}
    </>
  );
}
