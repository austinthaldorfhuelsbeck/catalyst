'use client';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button, buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import Logo from '@/components/logo';
import { useState } from 'react';
import { AlignRight } from 'lucide-react';
import { SETTINGS_QUERYResult, NAVIGATION_QUERYResult } from '@/sanity.types';

type SanityNavItem = NonNullable<NAVIGATION_QUERYResult[0]['navItems']>[number];

export default function MobileNav({
  navigation,
  settings,
}: {
  navigation: NAVIGATION_QUERYResult;
  settings: SETTINGS_QUERYResult;
}) {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          aria-label="Open Menu"
          variant="ghost"
          className="w-10 p-5 focus-visible:ring-1 focus-visible:ring-offset-1"
        >
          <AlignRight className="dark:text-white" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <div className="mx-auto">
            <Logo settings={settings} />
          </div>
          <div className="sr-only">
            <SheetTitle>Main Navigation</SheetTitle>
            <SheetDescription>Navigate the website</SheetDescription>
          </div>
        </SheetHeader>
        <div className="pt-10 pb-20">
          <div className="container">
            <div className="space-y-3">
              {navigation[0]?.navItems?.map((navItem: SanityNavItem) => {
                const hasSubMenu = navItem.subMenu && navItem.subMenu.length > 0;
                const title = navItem.page?.title || navItem.title;

                if (hasSubMenu) {
                  return (
                    <Accordion key={navItem._key} type="single" collapsible>
                      <AccordionItem value={navItem._key || ''}>
                        <AccordionTrigger>{title}</AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-2 pl-4">
                            {navItem.subMenu?.map((subItem) => (
                              <div key={subItem._key}>
                                <Link
                                  onClick={() => setOpen(false)}
                                  href={
                                    subItem.page?.slug?.current
                                      ? `/${subItem.page.slug.current}`
                                      : '#'
                                  }
                                  className="block py-2 hover:underline"
                                >
                                  {subItem.page?.title || subItem.title}
                                </Link>
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  );
                }

                return (
                  <div key={navItem._key}>
                    <Link
                      onClick={() => setOpen(false)}
                      href={navItem.page?.slug?.current ? `/${navItem.page.slug.current}` : '#'}
                      className="block py-3 hover:underline"
                    >
                      {title}
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
