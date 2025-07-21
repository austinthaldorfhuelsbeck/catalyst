import {
  fetchSanityTagBySlug,
  fetchSanityTags,
  fetchSanityTagsStaticParams,
} from '@/sanity/lib/fetch';
import { generatePageMetadata } from '@/sanity/lib/metadata';
import { BreadcrumbLink } from '@/types';
import { notFound } from 'next/navigation';
import PortableTextRenderer from '@/components/portable-text-renderer';
import Breadcrumbs from '@/components/ui/breadcrumbs';
import TagHero from '@/components/blocks/tag-hero';
import GridPost from '@/components/blocks/grid/grid-post';

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
              <h2 className="py-4 lg:py-8">Tagged posts</h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {tag.posts.map((post) => (
                  <GridPost key={post?.slug?.current} post={post} />
                ))}
              </div>
            </>
          )}
        </article>
      </div>
    </section>
  );
}
