'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { HTMLMotionProps } from 'motion/react';
import { BlockContent } from '@/sanity.types';
import PortableTextRenderer from '@/components/portable-text-renderer';
import { Check } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const timelineVariants = cva('flex flex-col relative', {
  variants: {
    size: {
      sm: 'gap-4',
      md: 'gap-6',
      lg: 'gap-8',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

interface TimelineProps
  extends React.HTMLAttributes<HTMLOListElement>,
    VariantProps<typeof timelineVariants> {
  iconSize?: 'sm' | 'md' | 'lg';
}

const Timeline = React.forwardRef<HTMLOListElement, TimelineProps>(
  ({ className, iconSize, size, children, ...props }, ref) => {
    const items = React.Children.toArray(children);

    if (items.length === 0) {
      return <TimelineEmpty />;
    }

    return (
      <ol
        ref={ref}
        aria-label="Timeline"
        className={cn(
          timelineVariants({ size }),
          'relative min-h-[600px] w-full max-w-2xl mx-auto py-8',
          className,
        )}
        {...props}
      >
        {React.Children.map(children, (child, index) => {
          if (
            React.isValidElement(child) &&
            typeof child.type !== 'string' &&
            'displayName' in child.type &&
            child.type.displayName === 'TimelineItem'
          ) {
            return React.cloneElement(child, {
              iconSize,
              showConnector: index !== items.length - 1,
            } as React.ComponentProps<typeof TimelineItem>);
          }
          return child;
        })}
      </ol>
    );
  },
);
Timeline.displayName = 'Timeline';

interface TimelineItemProps extends Omit<HTMLMotionProps<'li'>, 'ref'> {
  index: number;
  tagline?: string;
  title?: string;
  body?: BlockContent;
  showConnector?: boolean;
  iconSize?: 'sm' | 'md' | 'lg';
}

const TimelineItem = React.forwardRef<HTMLLIElement, TimelineItemProps>(
  (
    {
      className,
      index,
      tagline,
      title,
      body,
      showConnector,
      iconSize,
      initial,
      animate,
      transition,
      ...props
    },
    ref,
  ) => {
    const commonClassName = cn('relative w-full mb-8 last:mb-0', className);
    const isReversed = index % 2 === 0;

    const content = (
      <div className="grid grid-cols-[1fr_auto_1fr] gap-4 items-start">
        {/* Date - rendered conditionally based on index */}
        <div className={`flex flex-col justify-start pt-1 ${!isReversed ? 'order-3' : 'order-1'}`}>
          <Badge className={`${!isReversed ? 'ml-4 mr-auto' : 'mr-4 ml-auto'}`}>{tagline}</Badge>
        </div>

        {/* Timeline dot and connector - always in the middle */}
        <div className="flex flex-col items-center order-2">
          <div className="relative z-10">
            <TimelineIcon icon={<Check />} color="primary" iconSize={iconSize} />
          </div>
          {showConnector && <div className="h-16 w-0.5 bg-border mt-2" />}
        </div>

        {/* Content - rendered conditionally based on index */}
        <TimelineContent
          className={`${!isReversed ? 'order-1 text-right pr-4' : 'order-3 text-left pl-2'}`}
        >
          <TimelineHeader className={`${!isReversed ? 'justify-end' : 'justify-start'}`}>
            <TimelineTitle>{title}</TimelineTitle>
          </TimelineHeader>
          {body && <PortableTextRenderer value={body} />}
        </TimelineContent>
      </div>
    );

    // Filter out Framer Motion specific props
    const {
      style,
      onDrag,
      onDragStart,
      onDragEnd,
      onAnimationStart,
      onAnimationComplete,
      transformTemplate,
      whileHover,
      whileTap,
      whileDrag,
      whileFocus,
      whileInView,
      ...filteredProps
    } = props;

    return (
      <li ref={ref} className={commonClassName} {...filteredProps}>
        {content}
      </li>
    );
  },
);
TimelineItem.displayName = 'TimelineItem';

const TimelineConnector = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    color?: 'primary' | 'secondary' | 'muted' | 'accent';
  }
>(({ className, color, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'w-0.5',
      {
        'bg-primary': color === 'primary',
        'bg-muted': color === 'muted',
        'bg-secondary': color === 'secondary',
        'bg-accent': color === 'accent',
        'bg-gradient-to-b from-primary to-muted': !color,
      },
      className,
    )}
    {...props}
  />
));
TimelineConnector.displayName = 'TimelineConnector';

const TimelineHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex items-center gap-4', className)} {...props} />
  ),
);
TimelineHeader.displayName = 'TimelineHeader';

const TimelineTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, children, ...props }, ref) => (
  <h3 ref={ref} className={cn('font-semibold leading-none tracking-tight', className)} {...props}>
    {children}
  </h3>
));
TimelineTitle.displayName = 'TimelineTitle';

const TimelineIcon = ({
  icon,
  color = 'primary',
  iconSize = 'md',
}: {
  icon?: React.ReactNode;
  color?: 'primary' | 'secondary' | 'muted' | 'accent' | 'destructive';
  iconSize?: 'sm' | 'md' | 'lg';
}) => {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
  };

  const iconSizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  };

  const colorClasses = {
    primary: 'bg-primary text-primary-foreground',
    secondary: 'bg-secondary text-secondary-foreground',
    muted: 'bg-muted text-muted-foreground',
    accent: 'bg-accent text-accent-foreground',
    destructive: 'bg-destructive text-destructive-foreground',
  };

  return (
    <div
      className={cn(
        'relative flex items-center justify-center rounded-full ring-8 ring-background shadow-sm',
        sizeClasses[iconSize],
        colorClasses[color],
      )}
    >
      {icon ? (
        <div className={cn('flex items-center justify-center', iconSizeClasses[iconSize])}>
          {icon}
        </div>
      ) : (
        <div className={cn('rounded-full', iconSizeClasses[iconSize])} />
      )}
    </div>
  );
};

const TimelineContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col gap-2 pl-2', className)} {...props} />
  ),
);
TimelineContent.displayName = 'TimelineContent';

const TimelineEmpty = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col items-center justify-center p-8 text-center', className)}
      {...props}
    >
      <p className="text-sm text-muted-foreground">{children || 'No timeline items to display'}</p>
    </div>
  ),
);
TimelineEmpty.displayName = 'TimelineEmpty';

export {
  Timeline,
  TimelineItem,
  TimelineConnector,
  TimelineHeader,
  TimelineTitle,
  TimelineIcon,
  TimelineContent,
  TimelineEmpty,
};
