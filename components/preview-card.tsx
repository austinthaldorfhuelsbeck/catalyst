import { PREVIEW_CARD_QUERYResult } from '@/sanity.types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { pluralize } from '@/lib/utils';
import Tag from '@/components/ui/tag';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

type PreviewCardProps = NonNullable<PREVIEW_CARD_QUERYResult>;

export default function PreviewCard({
  _type,
  title,
  excerpt,
  image,
  slug,
  tags,
}: PreviewCardProps) {
  const href = `${pluralize(_type)}/${slug?.current}`;

  return (
    <Card className="flex flex-col md:flex-row hover:border-primary group">
      <div className="flex-1 border-b-8 md:border-r-8 md:border-b-0">
        <CardHeader className="items-start test-left">
          <Link href={href}>
            <CardTitle className="font-bold text-lg">{title}</CardTitle>
          </Link>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {excerpt && <p className="line-clamp-2">{excerpt}</p>}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Tag key={tag._id} {...tag} />
              ))}
            </div>
          )}
          <Link href={href}>
            <Button size="sm" variant="outline">
              Read more
              <ChevronRight className="text-border group-hover:text-primary" size={24} />
            </Button>
          </Link>
        </CardContent>
      </div>
      <aside className="flex-1 min-h-64 relative overflow-hidden group">
        {image && (
          <div className="absolute inset-0 group-hover:scale-110">
            <Link href={href} className="block h-full">
              <Image
                src={urlFor(image).url()}
                alt={image.alt || ''}
                fill
                className="object-cover"
              />
            </Link>
          </div>
        )}
      </aside>
    </Card>
  );
}
