import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { stegaClean } from 'next-sanity';
import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import { PAGE_QUERYResult, ColorVariant } from '@/sanity.types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

type Block = NonNullable<NonNullable<PAGE_QUERYResult>['blocks']>[number];
type GridRow = Extract<Block, { _type: 'grid-row' }>;
type GridColumn = NonNullable<NonNullable<GridRow['columns']>>[number];
type GridCard = Extract<GridColumn, { _type: 'grid-card' }>;

interface GridCardProps extends Omit<GridCard, '_type' | '_key'> {
  color?: ColorVariant;
}

export default function GridCard({ color, title, excerpt, image, link }: GridCardProps) {
  return (
    <Link
      key={title}
      className="inline-flex group"
      href={link?.href ?? '#'}
      target={link?.target ? '_blank' : undefined}
    >
      <Card className="flex flex-col justify-between group-hover:border-primary">
        <CardHeader>
          {image && image.asset?._id && (
            <div className="mb-4 relative h-[15rem] sm:h-[20rem] md:h-[25rem] lg:h-[9.5rem] xl:h-[12rem] rounded-lg overflow-hidden">
              <Image
                src={urlFor(image).url()}
                alt={image.alt || ''}
                placeholder={image?.asset?.metadata?.lqip ? 'blur' : undefined}
                blurDataURL={image?.asset?.metadata?.lqip || ''}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover"
                quality={100}
              />
            </div>
          )}
          {title && (
            <div className="flex justify-between items-center mb-4">
              <CardTitle className="text-2xl">{title}</CardTitle>
            </div>
          )}
        </CardHeader>
        <CardContent className="mb-auto">{excerpt && <p>{excerpt}</p>}</CardContent>
        <CardFooter className="mt-3 xl:mt-6">
          <Button size="lg" variant={stegaClean(link?.buttonVariant)} asChild>
            <div>{link?.title ?? 'Learn More'} →</div>
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
