'use client';
import PortableTextRenderer from '@/components/portable-text-renderer';
import { cn } from '@/lib/utils';
import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { PAGE_QUERYResult, ColorVariant } from '@/sanity.types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import TagLine from '@/components/ui/tag-line';

type Block = NonNullable<NonNullable<PAGE_QUERYResult>['blocks']>[number];
type SplitRow = Extract<Block, { _type: 'split-row' }>;
type SplitCardsList = Extract<
  NonNullable<SplitRow['splitColumns']>[number],
  { _type: 'split-cards-list' }
>;
type SplitCardItem = NonNullable<NonNullable<SplitCardsList['list']>[number]>;

interface SplitCardsItemProps extends SplitCardItem {
  color?: ColorVariant;
}

export default function SplitCardsItem({ color, tagLine, title, body }: SplitCardsItemProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    amount: 1,
  });

  return (
    <motion.div ref={ref}>
      <Card className={cn(isInView ? 'bg-primary' : '')}>
        <CardHeader>
          {tagLine && (
            <TagLine
              title={tagLine}
              element="h3"
              className={cn(
                'text-2xl lg:text-3xl',
                isInView ? 'text-primary-foreground' : 'text-foreground',
              )}
            />
          )}
          {title && (
            <CardTitle className={cn(isInView ? 'text-primary-foreground' : 'text-foreground')}>
              {title}
            </CardTitle>
          )}
        </CardHeader>
        {body && (
          <CardContent className={cn(isInView ? 'text-primary-foreground' : 'text-foreground')}>
            <PortableTextRenderer value={body} />
          </CardContent>
        )}
      </Card>
    </motion.div>
  );
}
