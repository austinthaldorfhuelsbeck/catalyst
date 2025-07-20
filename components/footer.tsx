import Logo from '@/components/logo';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import PortableTextRenderer from '@/components/portable-text-renderer';
import { fetchSanitySettings, fetchSanityNavigation } from '@/sanity/lib/fetch';
import { NAVIGATION_QUERYResult } from '@/sanity.types';

type SanityLink = NonNullable<NAVIGATION_QUERYResult[0]['navItems']>[number];

export default async function Footer() {
  const settings = await fetchSanitySettings();
  const navigation = await fetchSanityNavigation();

  return (
    <footer>
      <div className="dark:bg-background pb-5 xl:pb-5 dark:text-gray-300 text-center">
        <Link href="/" className="inline-block text-center" aria-label="Home page">
          <Logo settings={settings} />
        </Link>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-7 text-muted-foreground">
          {navigation[0]?.navItems?.map((navItem: SanityLink) => {
            const hasSubMenu = navItem.subMenu && navItem.subMenu.length > 0;
            const title = navItem.page?.title || navItem.title;

            if (hasSubMenu) {
              return (
                <div key={navItem._key} className="flex flex-col gap-2">
                  {title}
                  <div className="flex flex-col gap-2">
                    {navItem.subMenu?.map((subItem) => (
                      <Link
                        key={subItem._key}
                        href={subItem.page?.slug?.current ? `/${subItem.page.slug.current}` : '#'}
                        className="block py-3 hover:underline"
                      >
                        {subItem.title}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            }

            return (
              <div key={navItem._key}>
                <Link
                  href={navItem.page?.slug?.current ? `/${navItem.page.slug.current}` : '#'}
                  className="block py-3 hover:underline"
                >
                  {title}
                </Link>
              </div>
            );
          })}
        </div>
        <div className="mt-8 flex flex-row gap-6 justify-center lg:mt-5 text-xs border-t pt-8">
          <div className="flex items-center gap-2 text-foreground/60">
            <span>&copy; {new Date().getFullYear()}</span>
            {settings?.copyright && (
              <span className="[&>p]:!m-0">
                <PortableTextRenderer value={settings.copyright} />
              </span>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
