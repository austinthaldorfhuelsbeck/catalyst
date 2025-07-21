import { stegaClean } from 'next-sanity';

import { PAGE_QUERYResult } from '@/sanity.types';
import { fetchSanityTags } from '@/sanity/lib/fetch';
import SectionContainer from '@/components/ui/section-container';
import Tag from '../ui/tag';

type AllTagsProps = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>['blocks']>[number],
  { _type: 'all-tags' }
>;

export default async function AllTags({ padding, colorVariant }: AllTagsProps) {
  const color = stegaClean(colorVariant);
  const tags = await fetchSanityTags();

  return (
    <SectionContainer color={color} padding={padding}>
      <ul className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <li key={tag._id}>
            <Tag {...tag} />
          </li>
        ))}
      </ul>
    </SectionContainer>
  );
}
