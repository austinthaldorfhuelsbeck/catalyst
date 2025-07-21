import { TAG_QUERYResult } from '@/sanity.types';
import { Badge } from '@/components/ui/badge';
import PortableTextRenderer from '@/components/portable-text-renderer';

type TagHeroProps = NonNullable<TAG_QUERYResult>;

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
