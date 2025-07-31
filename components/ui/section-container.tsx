import { cn } from '@/lib/utils';
import { SectionPadding, ColorVariant } from '@/sanity.types';

interface SectionContainerProps {
  color?: ColorVariant | null;
  padding?: SectionPadding | null;
  isNarrow?: boolean;
  children: React.ReactNode;
  className?: string;
}

export default function SectionContainer({
  color = 'background',
  padding,
  isNarrow = false,
  children,
  className,
}: SectionContainerProps) {
  return (
    <div
      className={cn(
        `bg-${color} relative`,
        padding?.top ? 'pt-16 xl:pt-20' : undefined,
        padding?.bottom ? 'pb-16 xl:pb-20' : undefined,
        isNarrow ? 'max-w-[48rem] mx-auto' : undefined,
        className,
      )}
    >
      <div className="container">{children}</div>
    </div>
  );
}
