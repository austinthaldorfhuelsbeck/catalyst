import { BreadcrumbLink } from '@/types';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/ui/breadcrumbs';
import { generatePageMetadata } from '@/sanity/lib/metadata';
import PortableTextRenderer from '@/components/portable-text-renderer';
import { fetchSanityEventBySlug, fetchSanityEventsStaticParams } from '@/sanity/lib/fetch';
import PreviewCard from '@/components/preview-card';

export async function generateStaticParams() {
  const events = await fetchSanityEventsStaticParams();

  return events.map((event) => ({
    slug: event.slug?.current,
  }));
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const event = await fetchSanityEventBySlug({ slug: params.slug });

  if (!event) {
    notFound();
  }

  return generatePageMetadata({ page: event, slug: `/events/${params.slug}` });
}

export default async function EventPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const event = await fetchSanityEventBySlug(params);

  if (!event) {
    notFound();
  }

  const links: BreadcrumbLink[] = event
    ? [
        {
          label: 'Home',
          href: '/',
        },
        {
          label: 'Events',
          href: '/events',
        },
        {
          label: event.title as string,
          href: '#',
        },
      ]
    : [];

  return (
    <section>
      <div className="container py-16 xl:py-20">
        <article className="max-w-3xl mx-auto">
          <Breadcrumbs links={links} />
          <PreviewCard {...event} eventRegistration />
          <hr className="my-4 md:my-6 border-primary/30" />
          {event.body && <PortableTextRenderer value={event.body} />}
        </article>
      </div>
    </section>
  );
}
