import SectionContainer from '@/components/ui/section-container';
import { stegaClean } from 'next-sanity';
import { Timeline, TimelineItem } from '@/components/blocks/timeline';

import {
  type PAGE_QUERYResult,
  type Timelines1 as TimelineItemType,
  ColorVariant,
} from '@/sanity.types';

type TimelineRow = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>['blocks']>[number],
  { _type: 'timeline-row' }
>;

interface TimelineLayoutProps {
  items: TimelineItemType[];
  size?: 'sm' | 'md' | 'lg';
  animate?: boolean;
  className?: string;
}

export default function TimelineRow({ padding, colorVariant, timelines }: TimelineRow) {
  if (!timelines || timelines.length === 0) return null;
  const color = stegaClean(colorVariant) as ColorVariant;

  return (
    <SectionContainer color={color} padding={padding}>
      <TimelineLayout items={timelines as TimelineItemType[]} size="md" />
    </SectionContainer>
  );
}

const TimelineLayout = ({ items, size = 'md', animate = true, className }: TimelineLayoutProps) => {
  return (
    <Timeline size={size} className={className}>
      {[...items].reverse().map((item, index) => (
        <TimelineItem
          key={index}
          index={index}
          tagline={item.tagLine}
          title={item.title}
          body={item.body}
          showConnector={index !== items.length - 1}
          iconSize={size}
          initial={animate ? { opacity: 0, y: 20 } : false}
          animate={animate ? { opacity: 1, y: 0 } : false}
          transition={{
            duration: 0.5,
            delay: index * 0.1,
            ease: 'easeOut',
          }}
        />
      ))}
    </Timeline>
  );
};
