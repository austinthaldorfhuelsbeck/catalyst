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
        </article>
      </div>
    </section>
  );
}
