import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

type TagProps = Partial<Sanity.Tag>;

export default function Tag({ title, color, slug }: TagProps) {
  if (!title) return null;

  return (
    <Link href={`/tags/${slug?.current ?? '#'}`}>
      <Badge style={{ backgroundColor: color?.hex }}>{title}</Badge>
    </Link>
  );
}
