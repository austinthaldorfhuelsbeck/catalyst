import { NAVIGATION_QUERYResult } from '@/sanity.types';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '../ui/navigation-menu';
import { cn } from '@/lib/utils';

type SanityNavItem = NonNullable<NAVIGATION_QUERYResult[0]['navItems']>[number];

export default function DesktopNav({ navigation }: { navigation: NAVIGATION_QUERYResult }) {
  return (
    <NavigationMenu>
      <NavigationMenuList className="flex gap-3">
        {navigation[0]?.navItems?.map((navItem: SanityNavItem) => (
          <NavItem key={navItem._key} {...navItem} />
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function NavItem({ title, page, hideFromHeader, subMenu }: SanityNavItem) {
  if (hideFromHeader) {
    return null;
  }

  const hasSubMenu = subMenu && subMenu.length > 0;
  const titleToDisplay = page?.title || title;
  const navigationStyle = navigationMenuTriggerStyle();

  if (hasSubMenu) {
    return (
      <NavigationMenuItem>
        <NavigationMenuTrigger>{titleToDisplay}</NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className="w-[250px]">
            {subMenu?.map(({ _key, title, page, hideFromHeader }) => {
              if (hideFromHeader || !page?.slug?.current) {
                return null;
              }

              const subMenuTitleToDisplay = page?.title || title;

              return (
                <li key={_key}>
                  <NavigationMenuLink asChild>
                    <a href={`/${page.slug.current}`}>{subMenuTitleToDisplay}</a>
                  </NavigationMenuLink>
                </li>
              );
            })}
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  return (
    <NavigationMenuItem>
      <NavigationMenuLink asChild>
        <a className={cn(navigationStyle)} href={`/${page?.slug?.current || ''}`}>
          {titleToDisplay}
        </a>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
}
