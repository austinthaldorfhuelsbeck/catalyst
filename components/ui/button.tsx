import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer rounded-md text-sm font-medium font-header disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 ring-ring/10 dark:ring-ring/20 dark:outline-ring/40 outline-ring/50 focus-visible:ring-4 focus-visible:outline-1 aria-invalid:focus-visible:ring-0",
  {
    variants: {
      variant: {
        default:
          'border border-2 border-b-5 border-r-3 bg-primary text-primary-foreground hover:bg-secondary hover:text-secondary-foreground',
        destructive:
          'border border-2 border-b-5 border-r-3 bg-destructive text-destructive-foreground hover:bg-destructive-foreground hover:border-destructive hover:text-foreground',
        outline:
          'border border-2 border-b-5 border-r-3 bg-background hover:bg-accent hover:text-accent-foreground',
        secondary:
          'border border-2 border-b-5 border-r-3 bg-secondary/80 text-secondary-foreground hover:bg-primary hover:border-secondary',
        ghost:
          'border-2 border-b-5 border-r-3 border-transparent hover:border-border hover:bg-accent hover:text-accent-foreground',
        link: 'underline underline-offset-4 hover:text-secondary',
      },
      size: {
        default: 'h-10 px-5 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-md px-3 has-[>svg]:px-2.5',
        lg: 'h-12 rounded-md px-7 has-[>svg]:px-4',
        icon: 'size-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
