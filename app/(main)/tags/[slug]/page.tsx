import { fetchSanityTagBySlug, fetchSanityTagsStaticParams } from '@/sanity/lib/fetch';
import { generatePageMetadata } from '@/sanity/lib/metadata';
import { BreadcrumbLink } from '@/types';
import { notFound } from 'next/navigation';
import PortableTextRenderer from '@/components/portable-text-renderer';
import Breadcrumbs from '@/components/ui/breadcrumbs';
import TagHero from '@/app/(main)/tags/tag-hero';
import GridPost from '@/components/blocks/grid/grid-post';
import AllTags from '@/components/blocks/all-tags';
import SectionHeader from '@/components/blocks/section-header';
import { PAGE_QUERYResult } from '@/sanity.types';

export async function generateStaticParams() {
  const tags = await fetchSanityTagsStaticParams();

  return tags.map((tag) => ({
    slug: tag.slug?.current,
  }));
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const tag = await fetchSanityTagBySlug({ slug: params.slug });

  if (!tag) {
    notFound();
  }

  return generatePageMetadata({ page: tag, slug: `/tag/${params.slug}` });
}

export default async function TagPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const tag = await fetchSanityTagBySlug(params);

  if (!tag) {
    notFound();
  }

  const links: BreadcrumbLink[] = tag
    ? [
        {
          label: 'Home',
          href: '/',
        },
        {
          label: 'Tags',
          href: '/tags',
        },
        {
          label: tag.title as string,
          href: '#',
        },
      ]
    : [];

  return (
    <section>
      <div className="container py-16 xl:py-20">
        <article className="max-w-3xl mx-auto">
          <Breadcrumbs links={links} />
          <TagHero {...tag} />
          {tag.body && <PortableTextRenderer value={tag.body} />}
          <hr className="my-4 md:my-6 border-primary/30" />

          {tag.posts && tag.posts.length > 0 && (
            <>
              <SectionHeader {...sectionHeaderProps} _key={'tagged-posts'} title="Tagged posts" />
              <div className="grid grid-cols-1 gap-6 pb-8 lg:pb-16 lg:grid-cols-2">
                {tag.posts.map((post) => (
                  <GridPost key={post?.slug?.current} post={post} />
                ))}
              </div>
            </>
          )}
          {tag.projects && tag.projects.length > 0 && (
            <>
              <SectionHeader
                {...sectionHeaderProps}
                _key={'tagged-projects'}
                title="Tagged projects"
              />
              <div className="grid grid-cols-1 gap-6 pb-8 lg:pb-16 lg:grid-cols-2">
                {tag.projects.map((project) => (
                  <GridPost key={project?.slug?.current} post={project} />
                ))}
              </div>
            </>
          )}
          {tag.events && tag.events.length > 0 && (
            <>
              <SectionHeader {...sectionHeaderProps} _key={'tagged-events'} title="Tagged events" />
              <div className="grid grid-cols-1 gap-6 pb-8 lg:pb-16 lg:grid-cols-2">
                {tag.events.map((event) => (
                  <GridPost key={event?.slug?.current} post={event} />
                ))}
              </div>
            </>
          )}

          <SectionHeader {...sectionHeaderProps} _key={'all-tags'} title="Discover more" />
          <AllTags
            _type={'all-tags'}
            _key={'all-tags'}
            padding={{ _type: 'section-padding', top: false, bottom: false }}
            colorVariant="background"
            sectionWidth="default"
            stackAlign="left"
          />
        </article>
      </div>
    </section>
  );
}

type SectionHeaderProps = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>['blocks']>[number],
  { _type: 'section-header' }
>;

const sectionHeaderProps: SectionHeaderProps = {
  _type: 'section-header',
  _key: 'section-header',
  title: 'Section Header',
  padding: { _type: 'section-padding', top: true, bottom: false },
  colorVariant: 'background',
  sectionWidth: 'default',
  stackAlign: 'left',
  tagLine: null,
  description: null,
  link: null,
};
