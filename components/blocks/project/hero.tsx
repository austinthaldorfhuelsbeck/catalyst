import Image from 'next/image';

import { PROJECT_QUERYResult } from '@/sanity.types';
import { urlFor } from '@/sanity/lib/image';

type ProjectHeroProps = NonNullable<PROJECT_QUERYResult>;

export default function ProjectHero({ title, image }: ProjectHeroProps) {
  return (
    <>
      {title && <h1 className="mb-4 md:mb-6 text-3xl lg:text-5xl">{title}</h1>}
      {image && image.asset?._id && (
        <div className="my-4 md:my-6 rounded-lg overflow-hidden">
          <Image
            src={urlFor(image).quality(100).url()}
            alt={image.alt || ''}
            placeholder={image?.asset?.metadata?.lqip ? 'blur' : undefined}
            blurDataURL={image.asset?.metadata?.lqip || undefined}
            width={image.asset?.metadata?.dimensions?.width || 1200}
            height={image?.asset?.metadata?.dimensions?.height || 630}
            quality={100}
          />
        </div>
      )}
      <hr className="my-4 md:my-6 border-primary/30" />
    </>
  );
}
