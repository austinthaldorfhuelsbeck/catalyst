import GridPost from '@/components/blocks/grid/grid-post';
import TagHero from '@/app/(main)/tags/tag-hero';
import PortableTextRenderer from '@/components/portable-text-renderer';
import {
  fetchSanityEventCategoriesStaticParams,
  fetchSanityEventCategoryBySlug,
} from '@/sanity/lib/fetch';
import { generatePageMetadata } from '@/sanity/lib/metadata';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const eventCategories = await fetchSanityEventCategoriesStaticParams();

  return eventCategories.map((eventCategory) => ({
    slug: eventCategory.slug?.current,
  }));
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const eventCategory = await fetchSanityEventCategoryBySlug({ slug: params.slug });

  if (!eventCategory) {
    notFound();
  }

  return generatePageMetadata({ page: eventCategory, slug: `/events/categories/${params.slug}` });
}

export default async function EventCategoryPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const eventCategory = await fetchSanityEventCategoryBySlug(params);

  if (!eventCategory) {
    notFound();
  }

  return (
    <section id={`grid-post-${eventCategory.slug?.current}`}>
      <div className="container py-16 xl:py-20">
        <article className="max-w-3xl mx-auto">
          <TagHero {...eventCategory} />
          {eventCategory.body && <PortableTextRenderer value={eventCategory.body} />}
          <hr className="my-4 md:my-6 border-primary/30" />
          {eventCategory.events && eventCategory.events.length > 0 && (
            <>
              <div className="grid grid-cols-1 gap-6 pb-8 lg:pb-16 lg:grid-cols-2">
                {eventCategory.events.map((event) => (
                  <GridPost key={event?.slug?.current} post={event} />
                ))}
              </div>
            </>
          )}
        </article>
      </div>
    </section>
  );
}
