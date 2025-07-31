import { cn } from '@/lib/utils';
import SectionContainer from '@/components/ui/section-container';
import { stegaClean } from 'next-sanity';

import { PAGE_QUERYResult } from '@/sanity.types';
import TagLine from '@/components/ui/tag-line';

type SectionHeaderProps = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>['blocks']>[number],
  { _type: 'section-header' }
>;

export default function SectionHeader({
  padding,
  colorVariant = 'background',
  sectionWidth = 'default',
  stackAlign = 'left',
  tagLine,
  title,
  description,
}: SectionHeaderProps) {
  const isNarrow = stegaClean(sectionWidth) === 'narrow';
  const align = stegaClean(stackAlign);
  const color = stegaClean(colorVariant);

  return (
    <SectionContainer color={color} padding={padding} isNarrow={isNarrow}>
      <div
        className={cn(
          align === 'center' ? 'max-w-[48rem] text-center mx-auto' : undefined,
          'font-sans',
        )}
      >
        <div className={cn(color === 'primary' ? 'text-background' : undefined)}>
          {tagLine && <TagLine title={tagLine} element="h2" className="mb-4" />}
          <h2 className="text-3xl md:text-5xl mb-4 lg:mb-8">{title}</h2>
        </div>
        <p>{description}</p>
      </div>
    </SectionContainer>
  );
}
