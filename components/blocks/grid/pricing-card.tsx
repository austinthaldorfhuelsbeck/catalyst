import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { stegaClean } from 'next-sanity';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';
import { PAGE_QUERYResult, ColorVariant } from '@/sanity.types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

type Block = NonNullable<NonNullable<PAGE_QUERYResult>['blocks']>[number];
type GridRow = Extract<Block, { _type: 'grid-row' }>;
type GridColumn = NonNullable<NonNullable<GridRow['columns']>>[number];
type PricingCard = Extract<GridColumn, { _type: 'pricing-card' }>;

interface PricingCardProps extends Omit<PricingCard, '_type' | '_key'> {
  color?: ColorVariant;
}

export default function PricingCard({
  color,
  title,
  tagLine,
  excerpt,
  price,
  list,
  link,
}: PricingCardProps) {
  return (
    <Card className="flex flex-col justify-between">
      <CardHeader className="gap-4">
        {title && (
          <div className="flex justify-between items-center">
            <CardTitle className="font-bold text-xl leading-[1.2]">{title}</CardTitle>
            {tagLine && <Badge>{tagLine}</Badge>}
          </div>
        )}
        {price && price.value && (
          <div className="flex items-end gap-1">
            <div className="text-3xl font-bold leading-none">${price.value}</div>
            {price.period && <div className="text-sm">{price.period}</div>}
          </div>
        )}
      </CardHeader>
      <CardContent className="mb-auto">
        {list && list.length > 0 && (
          <ul className="flex flex-col gap-2">
            {list.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <Check size={16} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}
        {excerpt && <p>{excerpt}</p>}
      </CardContent>
      <CardFooter>
        <Button size="lg" variant={stegaClean(link?.buttonVariant)} asChild>
          <Link href={link?.href ? link.href : '#'} target={link?.target ? '_blank' : undefined}>
            {link?.title}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
