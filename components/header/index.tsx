import Link from 'next/link';
import Logo from '@/components/logo';
import MobileNav from '@/components/header/mobile-nav';
import DesktopNav from '@/components/header/desktop-nav';
import { ModeToggle } from '@/components/menu-toggle';
import { fetchSanitySettings, fetchSanityNavigation } from '@/sanity/lib/fetch';

export default async function Header() {
  const settings = await fetchSanitySettings();
  const navigation = await fetchSanityNavigation();
  return (
    <header className="sticky top-0 z-50 w-full bg-background/90 backdrop-blur-sm px-7 shadow flex items-center justify-between">
      <div className="container flex items-center justify-between h-14">
        <Link href="/" aria-label="Home page">
          <Logo settings={settings} />
        </Link>
        <div className="hidden lg:flex gap-7 items-center justify-between">
          <DesktopNav navigation={navigation} />
          <ModeToggle />
        </div>
        <div className="flex items-center lg:hidden">
          <ModeToggle />
          <MobileNav navigation={navigation} settings={settings} />
        </div>
      </div>
    </header>
  );
}
