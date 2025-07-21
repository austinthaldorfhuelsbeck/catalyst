import { cn } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import { ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { PAGE_QUERYResult, ColorVariant } from '@/sanity.types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

type Block = NonNullable<NonNullable<PAGE_QUERYResult>['blocks']>[number];
type GridRow = Extract<Block, { _type: 'grid-row' }>;
type GridColumn = NonNullable<NonNullable<GridRow['columns']>>[number];
type GridPost = Extract<GridColumn, { _type: 'grid-post' }>;

interface GridPostProps extends Omit<NonNullable<GridPost>, '_type' | '_key'> {
  color?: ColorVariant;
}

export default function GridPost({ color, post }: GridPostProps) {
  if (!post) return null;

  const { title, slug, excerpt, image, tags } = post;

  return (
    <Link key={title} className="inline-flex group" href={`/blog/${slug?.current}`}>
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
                style={{
                  objectFit: 'cover',
                }}
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                quality={100}
              />
            </div>
          )}
          {title && (
            <div className="flex justify-between items-center mb-4">
              <CardTitle className="text-2xl">{title}</CardTitle>
            </div>
          )}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.map((tag) => (
                <Badge key={tag._id} color="primary">
                  {tag.title}
                </Badge>
              ))}
            </div>
          )}
        </CardHeader>
        <CardContent className="mb-auto">{excerpt && <p>{excerpt}</p>}</CardContent>
        <CardFooter className="mt-3 xl:mt-6">
          <Button size="icon" variant="outline">
            <ChevronRight className="text-border group-hover:text-primary" size={24} />
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
