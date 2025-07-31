import { TAG_QUERYResult } from '@/sanity.types';
import { Badge } from '@/components/ui/badge';

type TagHeroProps = Omit<
  NonNullable<TAG_QUERYResult>,
  'posts' | 'events' | 'projects' | 'meta_title' | 'meta_description' | 'ogImage' | 'noindex'
>;

export default function TagHero({ title, color, body }: TagHeroProps) {
  return (
    <div className="overflow-hidden">
      {title && (
        <Badge className="mb-4 md:mb-6 p-3" style={{ backgroundColor: color?.hex }}>
          <h1>{title}</h1>
        </Badge>
      )}
    </div>
  );
}
