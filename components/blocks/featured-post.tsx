import { PAGE_QUERYResult } from '@/sanity.types';
import SectionContainer from '@/components/ui/section-container';
import PreviewCard from '@/components/preview-card';

type FeaturedPostProps = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>['blocks']>[number],
  { _type: 'featured-post' }
>;

export default function FeaturedPost({ padding, post }: FeaturedPostProps) {
  if (!post) return null;

  return (
    <SectionContainer padding={padding}>
      <PreviewCard {...post} />
    </SectionContainer>
  );
}
