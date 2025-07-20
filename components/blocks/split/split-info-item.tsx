'use client';
import PortableTextRenderer from '@/components/portable-text-renderer';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { cn } from '@/lib/utils';
import { PAGE_QUERYResult } from '@/sanity.types';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

type Block = NonNullable<NonNullable<PAGE_QUERYResult>['blocks']>[number];
type SplitRow = Extract<Block, { _type: 'split-row' }>;
type SplitInfoList = Extract<
  NonNullable<SplitRow['splitColumns']>[number],
  { _type: 'split-info-list' }
>;
type SplitInfoItem = NonNullable<SplitInfoList['list']>[number];

export default function SplitCardsItem({ image, title, body, tags }: SplitInfoItem) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    amount: 1,
  });

  return (
    <motion.div ref={ref}>
      <Card className={cn(isInView ? 'bg-primary' : '')}>
        <div
          className={cn(
            'flex flex-col gap-4 transition-colors duration-1000 ease-in-out',
            isInView ? 'text-primary-foreground' : 'text-foreground',
          )}
        >
          <CardHeader className="flex-row items-center gap-2">
            {image && image.asset?._id && (
              <div className="shrink-0 w-10 h-10 flex items-center justify-center">
                <Image
                  src={urlFor(image).url()}
                  alt={image.alt || ''}
                  placeholder={
                    image?.asset?.metadata?.lqip && image?.asset?.mimeType !== 'image/svg+xml'
                      ? 'blur'
                      : undefined
                  }
                  blurDataURL={image?.asset?.metadata?.lqip || ''}
                  width={image.asset?.metadata?.dimensions?.width || 40}
                  height={image?.asset?.metadata?.dimensions?.height || 40}
                />
              </div>
            )}
            {title && <div className="text-xl font-semibold leading-[1.1]">{title}</div>}
          </CardHeader>
          {body && (
            <CardContent>
              <PortableTextRenderer value={body} />
            </CardContent>
          )}
        </div>
        {tags && (
          <CardFooter
            className={cn(
              'flex flex-wrap gap-3 mt-4 transition-colors duration-1000 ease-in-out',
              isInView ? 'text-primary-foreground' : 'text-foreground',
            )}
          >
            {tags.map((tag) => (
              <Badge
                key={tag}
                className={cn(
                  'transition-colors duration-1000 ease-in-out',
                  isInView ? 'bg-background text-foreground' : 'bg-primary text-primary-foreground',
                )}
              >
                {tag}
              </Badge>
            ))}
          </CardFooter>
        )}
      </Card>
    </motion.div>
  );
}
