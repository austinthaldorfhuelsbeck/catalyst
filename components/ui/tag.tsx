import { TAG_QUERYResult } from '@/sanity.types';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

type TagProps = Omit<
  NonNullable<TAG_QUERYResult>,
  'body' | 'posts' | 'meta_title' | 'meta_description' | 'ogImage' | 'noindex'
>;

export default function Tag({ title, color, slug }: TagProps) {
  return (
    <Link href={`/tags/${slug?.current}`}>
      <Badge style={{ backgroundColor: color?.hex }}>{title}</Badge>
    </Link>
  );
}
