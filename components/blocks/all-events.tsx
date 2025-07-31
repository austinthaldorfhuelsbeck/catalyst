import SectionContainer from '@/components/ui/section-container';
import { stegaClean } from 'next-sanity';
import { fetchSanityEvents } from '@/sanity/lib/fetch';
import { PAGE_QUERYResult } from '@/sanity.types';
import GridPost from './grid/grid-post';
import SectionHeader from './section-header';

type AllEventsProps = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>['blocks']>[number],
  { _type: 'all-events' }
>;

export default async function AllEvents({ padding, colorVariant }: AllEventsProps) {
  const color = stegaClean(colorVariant);
  const events = await fetchSanityEvents();

  const eventsByCategory = events.reduce(
    (acc, event) => {
      const categoryTitle = event?.category?.title ?? 'Uncategorized';
      if (!acc[categoryTitle]) {
        acc[categoryTitle] = [];
      }
      acc[categoryTitle].push(event);
      return acc;
    },
    {} as Record<string, typeof events>,
  );

  return (
    <>
      {Object.entries(eventsByCategory).map(([categoryTitle, categoryEvents]) => (
        <div key={categoryTitle}>
          <SectionHeader
            _type="section-header"
            _key={categoryTitle}
            padding={{ _type: 'section-padding', top: padding?.top, bottom: false }}
            colorVariant={colorVariant}
            title={`Upcoming ${categoryTitle}`}
            sectionWidth={null}
            stackAlign={null}
            tagLine={null}
            description={null}
            link={null}
          />
          <SectionContainer
            color={color}
            padding={{ _type: 'section-padding', top: false, bottom: padding?.bottom }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {categoryEvents.map((event) => (
                <GridPost key={event?.slug?.current} post={event} />
              ))}
            </div>
          </SectionContainer>
        </div>
      ))}
    </>
  );
}
